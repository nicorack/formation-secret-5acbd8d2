
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- Create formations table
CREATE TABLE public.formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'Autre',
  level TEXT NOT NULL DEFAULT 'Débutant',
  duration TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  original_price INTEGER,
  image_url TEXT,
  instructor TEXT NOT NULL DEFAULT 'Admin',
  rating NUMERIC(2,1) DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  objectives TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create modules table
CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  formation_id UUID REFERENCES public.formations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  duration TEXT,
  type TEXT NOT NULL DEFAULT 'video',
  video_url TEXT,
  content TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  formation_id UUID REFERENCES public.formations(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  payment_method TEXT DEFAULT 'mvola',
  payment_reference TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Security definer function for role check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON public.formations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PROFILES policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- USER_ROLES policies
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- FORMATIONS policies (public read for active, admin write)
CREATE POLICY "Anyone can view active formations" ON public.formations FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all formations" ON public.formations FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert formations" ON public.formations FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update formations" ON public.formations FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete formations" ON public.formations FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- MODULES policies
CREATE POLICY "Anyone can view modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Admins can manage modules" ON public.modules FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- LESSONS policies
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Admins can manage lessons" ON public.lessons FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ORDERS policies
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for course videos/images
INSERT INTO storage.buckets (id, name, public) VALUES ('course-assets', 'course-assets', true);

CREATE POLICY "Anyone can view course assets" ON storage.objects FOR SELECT USING (bucket_id = 'course-assets');
CREATE POLICY "Admins can upload course assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'course-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update course assets" ON storage.objects FOR UPDATE USING (bucket_id = 'course-assets' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete course assets" ON storage.objects FOR DELETE USING (bucket_id = 'course-assets' AND public.has_role(auth.uid(), 'admin'));

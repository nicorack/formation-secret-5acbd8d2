
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  formation_id UUID NOT NULL REFERENCES public.formations(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress" ON public.lesson_progress
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

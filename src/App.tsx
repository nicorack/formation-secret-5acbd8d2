import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Formations from "./pages/Formations";
import FormationDetail from "./pages/FormationDetail";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import FormationManager from "./pages/admin/FormationManager";
import FormationEdit from "./pages/admin/FormationEdit";
import OrdersManager from "./pages/admin/OrdersManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formations/:id" element={<FormationDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/connexion" element={<Auth />} />
            <Route path="/inscription" element={<Auth />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/formations" element={<FormationManager />} />
            <Route path="/admin/formations/:id" element={<FormationEdit />} />
            <Route path="/admin/orders" element={<OrdersManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

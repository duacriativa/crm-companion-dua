import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import WhatsApp from "./pages/WhatsApp";
import Configuracoes from "./pages/Configuracoes";
import Clientes from "./pages/Clientes";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/pipelines" element={<Placeholder title="Funil" />} />
            <Route path="/pipelines/:slug" element={<Placeholder title="Funil" />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
            <Route path="/agenda" element={<Placeholder title="Agenda" />} />
            <Route path="/financeiro" element={<Placeholder title="Financeiro" />} />
            <Route path="/servicos" element={<Placeholder title="Serviços" />} />
            <Route path="/contratos" element={<Placeholder title="Contratos" />} />
            <Route path="/briefings" element={<Placeholder title="Briefings" />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

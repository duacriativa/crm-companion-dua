import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search, Bell, Headphones, Globe, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center gap-3 px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />

            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes, leads, conversas…"
                className="pl-9 bg-muted/50 border-border focus-visible:ring-primary"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/40 border border-border">
                <Trophy className="h-4 w-4 text-warning" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold">R$ 7.800</span>
                    <span className="text-muted-foreground">/ R$ 10.000</span>
                  </div>
                  <Progress value={78} className="h-1 w-32" />
                </div>
              </div>

              <Button variant="ghost" size="icon" aria-label="Idioma">
                <Globe className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Suporte">
                <Headphones className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Calendar,
  DollarSign,
  Briefcase,
  FileText,
  ClipboardList,
  MessageCircle,
  Settings,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clientes", url: "/clientes", icon: Users },
];

const pipelineFunis = [
  { title: "Landing Page - Dua", url: "/pipelines/landing-page-dua" },
  { title: "Tráfego Pago", url: "/pipelines/trafego-pago" },
];

const businessItems = [
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Serviços", url: "/servicos", icon: Briefcase },
  { title: "Contratos", url: "/contratos", icon: FileText },
  { title: "Briefings", url: "/briefings", icon: ClipboardList },
];

const channelItems = [
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const [funilOpen, setFunilOpen] = useState(pathname.startsWith("/pipelines"));

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  const renderItem = (item: { title: string; url: string; icon: any }) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        isActive={isActive(item.url)}
        tooltip={item.title}
        className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
      >
        <NavLink to={item.url}>
          <item.icon className="h-4 w-4 shrink-0" />
          <span>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <NavLink to="/" className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-sm font-bold text-primary-foreground">D</span>
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight">
              dua<span className="text-primary">CRM</span>
            </span>
          )}
        </NavLink>

        <Button
          className="mt-4 w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant"
          size={collapsed ? "icon" : "default"}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && <span className="ml-1">Nova Venda</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(renderItem)}

              {/* Funil (Pipelines) com submenu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isActive("/pipelines")}
                  tooltip="Funil"
                  onClick={() => setFunilOpen((o) => !o)}
                  className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                >
                  <GitBranch className="h-4 w-4 shrink-0" />
                  <span>Funil</span>
                  {!collapsed && (
                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${
                        funilOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  )}
                </SidebarMenuButton>
                {!collapsed && funilOpen && (
                  <SidebarMenuSub>
                    {pipelineFunis.map((f) => (
                      <SidebarMenuSubItem key={f.url}>
                        <SidebarMenuSubButton asChild isActive={pathname === f.url}>
                          <NavLink to={f.url}>{f.title}</NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <NavLink to="/pipelines" className="text-muted-foreground">
                          <Plus className="h-3.5 w-3.5" />
                          <span>Novo funil</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* WhatsApp logo abaixo de Pipelines */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/whatsapp")}
                  tooltip="WhatsApp"
                  className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
                >
                  <NavLink to="/whatsapp">
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>WhatsApp</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{businessItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{channelItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-1">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
            D
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Daniel</p>
              <p className="text-xs text-muted-foreground truncate">Plano PRO</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

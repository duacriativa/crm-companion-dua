import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Sparkles,
  CheckSquare,
  Calendar,
  DollarSign,
  Briefcase,
  FileText,
  ClipboardList,
  FileCode,
  MessageCircle,
  Settings,
  Plus,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Pipelines", url: "/pipelines", icon: GitBranch },
  { title: "Agentes IA", url: "/agentes", icon: Sparkles },
  { title: "Tarefas", url: "/tarefas", icon: CheckSquare },
  { title: "Agenda", url: "/agenda", icon: Calendar },
];

const businessItems = [
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Serviços", url: "/servicos", icon: Briefcase },
  { title: "Orçamentos", url: "/orcamentos", icon: FileText },
  { title: "Briefings", url: "/briefings", icon: ClipboardList },
  { title: "Páginas", url: "/paginas", icon: FileCode },
];

const channelItems = [
  { title: "WhatsApp", url: "/whatsapp", icon: MessageCircle },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

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
            <SidebarMenu>{mainItems.map(renderItem)}</SidebarMenu>
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

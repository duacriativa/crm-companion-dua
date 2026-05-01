import { useState } from "react";
import { Bell, Crown, AlertTriangle, Snowflake, TrendingDown, TrendingUp, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

type RfvAlert = {
  id: string;
  type: "champion-risk" | "cant-lose" | "loyal-hibernating" | "new-champion" | "lost";
  client: string;
  detail: string;
  time: string;
  read: boolean;
};

const TYPE_META = {
  "champion-risk": { icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10", label: "Campeão → Em risco" },
  "cant-lose": { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10", label: "Não pode perder" },
  "loyal-hibernating": { icon: Snowflake, color: "text-slate-400", bg: "bg-slate-500/10", label: "Leal → Hibernando" },
  "new-champion": { icon: Crown, color: "text-amber-500", bg: "bg-amber-500/10", label: "Novo Campeão" },
  "lost": { icon: TrendingDown, color: "text-rose-400", bg: "bg-rose-400/10", label: "Cliente perdido" },
} as const;

const INITIAL_ALERTS: RfvAlert[] = [
  { id: "1", type: "champion-risk", client: "Padaria Pão Quente", detail: "MRR R$ 4.800 — sem compras há 38 dias", time: "há 12 min", read: false },
  { id: "2", type: "new-champion", client: "Studio Bella", detail: "Atingiu R5 F5 V5 este mês 🎉", time: "há 1 h", read: false },
  { id: "3", type: "cant-lose", client: "Açaí da Praça", detail: "MRR R$ 6.200 — última compra há 92 dias", time: "há 3 h", read: false },
  { id: "4", type: "loyal-hibernating", client: "Boutique Zara", detail: "Cliente leal sem atividade há 120 dias", time: "ontem", read: true },
  { id: "5", type: "lost", client: "Mercado Central", detail: "Sem compras há 365 dias", time: "ontem", read: true },
];

export function NotificationsBell() {
  const [alerts, setAlerts] = useState<RfvAlert[]>(INITIAL_ALERTS);
  const unread = alerts.filter((a) => !a.read).length;

  const markAllRead = () => setAlerts(alerts.map((a) => ({ ...a, read: true })));
  const markRead = (id: string) => setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-pulse-glow">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0 surface-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Notificações</h3>
            {unread > 0 && (
              <Badge className="bg-primary/15 text-primary border-0 text-[10px] h-4 px-1.5">{unread} novas</Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={markAllRead}>
            <CheckCheck className="h-3 w-3" /> Marcar lidas
          </Button>
        </div>

        <div className="px-4 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingDown className="h-3 w-3 text-primary" />
            <span className="font-medium text-foreground">Alertas RFV</span>
            <span>· mudanças de segmento dos seus clientes</span>
          </div>
        </div>

        <ScrollArea className="max-h-[420px]">
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
              Sem notificações no momento
            </div>
          ) : (
            <div className="divide-y divide-border">
              {alerts.map((a) => {
                const meta = TYPE_META[a.type];
                const Icon = meta.icon;
                return (
                  <button
                    key={a.id}
                    onClick={() => markRead(a.id)}
                    className={`w-full text-left p-3 flex gap-3 hover:bg-muted/40 transition-colors ${!a.read ? "bg-primary/5" : ""}`}
                  >
                    <div className={`h-9 w-9 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-4 w-4 ${meta.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{a.client}</p>
                        {!a.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{meta.label}</p>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">{a.detail}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">{a.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="p-3 border-t border-border flex items-center justify-between gap-2">
          <Link to="/clientes" className="text-xs text-primary hover:underline font-medium">
            Ver matriz RFV →
          </Link>
          <Link to="/configuracoes" className="text-xs text-muted-foreground hover:text-foreground">
            Configurar alertas
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, FolderKanban, CheckSquare, MessageCircle, Zap, RefreshCw, Sparkles, RotateCw, TrendingDown, Crown, AlertTriangle, Snowflake } from "lucide-react";
import { toast } from "sonner";

type SubTab = "projetos" | "tarefas" | "notificacoes" | "whatsapp" | "recorrentes" | "atalhos" | "rfv";

const subTabs: { id: SubTab; label: string; icon: any; badge?: string }[] = [
  { id: "projetos", label: "Projetos", icon: FolderKanban },
  { id: "tarefas", label: "Tarefas", icon: CheckSquare },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "rfv", label: "Alertas RFV", icon: TrendingDown, badge: "Novo" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, badge: "Novo" },
  { id: "recorrentes", label: "Recorrentes", icon: RefreshCw },
  { id: "atalhos", label: "Atalhos", icon: Zap },
];

interface EventToggle {
  title: string;
  inApp: boolean;
  push: boolean;
  reminder?: boolean;
}

function EventRow({ event, onChange }: { event: EventToggle; onChange: (e: EventToggle) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium">{event.title}</p>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <Switch checked={event.inApp} onCheckedChange={(v) => onChange({ ...event, inApp: v })} />
          <span className="text-xs text-muted-foreground w-10">In-app</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={event.push} onCheckedChange={(v) => onChange({ ...event, push: v })} />
          <span className="text-xs text-muted-foreground w-8">Push</span>
        </div>
      </div>
    </div>
  );
}

export function Automacoes() {
  const [active, setActive] = useState<SubTab>("notificacoes");

  const [events, setEvents] = useState<Record<string, EventToggle>>({
    e1: { title: "Quando eu for atribuído a uma tarefa", inApp: true, push: true },
    e2: { title: "Quando uma tarefa minha for concluída", inApp: true, push: false },
    e3: { title: "Quando alguém comentar em uma tarefa minha", inApp: true, push: true },
    e4: { title: "Quando o status do projeto mudar", inApp: true, push: false },
    e5: { title: "Lembrete de prazo próximo", inApp: true, push: false, reminder: true },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Automações de Tarefas</h2>
              <p className="text-xs text-muted-foreground">Personalize movimentos, notificações, WhatsApp e atalhos</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCw className="h-3.5 w-3.5" />
            Restaurar padrões
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">
          <div className="border-r border-border p-3 space-y-1">
            {subTabs.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive
                      ? "bg-primary/15 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{t.label}</span>
                  {t.badge && (
                    <Badge className="bg-primary/20 text-primary border-0 text-[10px] h-4 px-1.5">
                      {t.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {active === "notificacoes" && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    Notificações de tarefas
                  </p>
                  <p className="text-xs text-muted-foreground">Escolha quais eventos disparam notificações in-app e push</p>
                </div>
                <div className="space-y-1">
                  {Object.entries(events).map(([k, ev]) => (
                    <div key={k}>
                      <EventRow event={ev} onChange={(e) => setEvents({ ...events, [k]: e })} />
                      {ev.reminder && (
                        <div className="pb-3 pl-1">
                          <Select defaultValue="1">
                            <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 dia antes</SelectItem>
                              <SelectItem value="2">2 dias antes</SelectItem>
                              <SelectItem value="7">1 semana antes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "rfv" && <RfvAutomations />}

            {active !== "notificacoes" && active !== "rfv" && (
              <div className="py-12 text-center text-muted-foreground text-sm">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-40" />
                Configurações de <span className="font-medium text-foreground">{subTabs.find((s) => s.id === active)?.label}</span> em breve
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

interface RfvRule {
  key: string;
  icon: any;
  color: string;
  title: string;
  desc: string;
  action: string;
}

const RFV_RULES: RfvRule[] = [
  { key: "championRisk", icon: AlertTriangle, color: "text-rose-500", title: "Campeão → Em risco", desc: "Cliente top sem compras há 30+ dias", action: "Disparar mensagem de reativação no WhatsApp" },
  { key: "cantLose", icon: AlertTriangle, color: "text-yellow-500", title: "Caiu para 'Não pode perder'", desc: "Alto valor ausente há 60+ dias", action: "Criar tarefa urgente para o responsável" },
  { key: "loyalHibernating", icon: Snowflake, color: "text-slate-400", title: "Leal → Hibernando", desc: "Cliente fiel sem atividade há 90+ dias", action: "Enviar oferta de winback" },
  { key: "newChampion", icon: Crown, color: "text-amber-500", title: "Novo Campeão 🎉", desc: "Atingiu R5 F5 V5", action: "Enviar agradecimento + benefício VIP" },
  { key: "becameLost", icon: TrendingDown, color: "text-rose-400", title: "Cliente perdido", desc: "Sem compras há 360+ dias", action: "Última campanha de winback" },
];

function RfvAutomations() {
  const [enabled, setEnabled] = useState(true);
  const [frequency, setFrequency] = useState("realtime");
  const [rules, setRules] = useState<Record<string, { active: boolean; channel: string }>>(
    Object.fromEntries(RFV_RULES.map((r) => [r.key, { active: true, channel: "notification" }]))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
        <div>
          <p className="text-sm font-semibold flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-primary" />
            Automações RFV
            <Badge className="bg-primary/15 text-primary border-0 text-[10px] h-4 px-1.5">Novo</Badge>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Dispare ações automaticamente quando um cliente muda de segmento na matriz RFV.
          </p>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className={`space-y-4 transition-opacity ${enabled ? "" : "opacity-50 pointer-events-none"}`}>
        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
          <div>
            <p className="text-sm font-medium">Frequência de verificação</p>
            <p className="text-xs text-muted-foreground">Com que frequência reavaliar segmentos</p>
          </div>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-44 h-9 text-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Em tempo real</SelectItem>
              <SelectItem value="daily">Diariamente</SelectItem>
              <SelectItem value="weekly">Semanalmente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {RFV_RULES.map((r) => {
            const Icon = r.icon;
            const state = rules[r.key];
            return (
              <div key={r.key} className="rounded-lg border border-border bg-muted/10 p-3 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${r.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={state.active}
                    onCheckedChange={(v) => setRules({ ...rules, [r.key]: { ...state, active: v } })}
                  />
                </div>
                {state.active && (
                  <div className="pl-7 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground shrink-0">Ação:</span>
                    <Select
                      value={state.channel}
                      onValueChange={(v) => setRules({ ...rules, [r.key]: { ...state, channel: v } })}
                    >
                      <SelectTrigger className="h-8 text-xs flex-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notification">🔔 Apenas notificar</SelectItem>
                        <SelectItem value="task">✅ Criar tarefa</SelectItem>
                        <SelectItem value="whatsapp">💬 Enviar WhatsApp</SelectItem>
                        <SelectItem value="email">📧 Enviar e-mail</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-xs text-muted-foreground/70 hidden md:block truncate max-w-[180px]">
                      Sugestão: {r.action}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-10"
          onClick={() => toast.success("Automações RFV salvas!")}
        >
          Salvar automações
        </Button>
      </div>
    </div>
  );
}

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

            {active !== "notificacoes" && (
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

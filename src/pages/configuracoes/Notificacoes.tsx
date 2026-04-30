import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Sparkles, FolderKanban, CheckSquare, MessageCircle, RotateCw, Zap, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type SubTab = "projetos" | "tarefas" | "notificacoes" | "whatsapp" | "recorrentes" | "atalhos";

const subTabs: { id: SubTab; label: string; icon: any; badge?: string }[] = [
  { id: "projetos", label: "Projetos", icon: FolderKanban },
  { id: "tarefas", label: "Tarefas", icon: CheckSquare },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, badge: "Novo" },
  { id: "recorrentes", label: "Recorrentes", icon: RefreshCw },
  { id: "atalhos", label: "Atalhos", icon: Zap },
];

interface EventToggle {
  title: string;
  description: string;
  inApp: boolean;
  push: boolean;
  reminder?: boolean;
}

function EventRow({ event, onChange }: { event: EventToggle; onChange: (e: EventToggle) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm font-medium">{event.title}</p>
        <p className="text-xs text-muted-foreground">{event.description}</p>
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

export function Notificacoes() {
  const [active, setActive] = useState<SubTab>("notificacoes");
  const [pushEnabled] = useState(false);
  const [resumoDiario, setResumoDiario] = useState(false);

  const [events, setEvents] = useState<Record<string, EventToggle>>({
    e1: { title: "Quando eu for atribuído a uma tarefa", description: "", inApp: true, push: true },
    e2: { title: "Quando uma tarefa minha for concluída", description: "", inApp: true, push: false },
    e3: { title: "Quando alguém comentar em uma tarefa minha", description: "", inApp: true, push: true },
    e4: { title: "Quando o status do projeto mudar", description: "", inApp: true, push: false },
    e5: { title: "Lembrete de prazo próximo", description: "Aviso antes do prazo da tarefa", inApp: true, push: false, reminder: true },
  });

  const [contentEvents, setContentEvents] = useState({
    atribuido: true,
    statusChange: true,
    feedback: true,
    tarefaAtribuida: true,
    comentariosTarefa: true,
  });

  const [generalNotifs, setGeneralNotifs] = useState({
    novosLeads: true,
    propostasAbertas: true,
    prazos: true,
    pagamentos: true,
    insights: true,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
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
          {/* Sub-nav */}
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

          {/* Content */}
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

      {/* Resumo Diário */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Bell className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Resumo Diário</h2>
            <p className="text-xs text-muted-foreground">Receba um resumo com tarefas pendentes e faturamento do dia</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {!pushEnabled && (
            <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-warning/15 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium">Notificações push desativadas</p>
                  <p className="text-xs text-muted-foreground">Ative para receber notificações push</p>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                Ativar
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Ativar resumo diário</p>
              <p className="text-xs text-muted-foreground">Receba um resumo com tarefas para hoje e quanto faturou</p>
            </div>
            <Switch checked={resumoDiario} onCheckedChange={setResumoDiario} />
          </div>

          <div>
            <p className="text-sm font-semibold mb-1">Tipos de notificação</p>
            <p className="text-xs text-muted-foreground mb-3">Escolha quais eventos disparam notificações para você.</p>
            <div className="space-y-2">
              {[
                { key: "atribuido", title: "Conteúdo atribuído a mim", desc: "Quando alguém te define como responsável." },
                { key: "statusChange", title: "Mudança de status em meus conteúdos", desc: "Avanço de etapa, aprovação, agendamento." },
                { key: "feedback", title: "Feedback/comentário em meus conteúdos", desc: "Cliente solicitou revisão ou comentou." },
                { key: "tarefaAtribuida", title: "Tarefa atribuída a mim", desc: "Quando você é responsável por uma nova tarefa." },
                { key: "comentariosTarefa", title: "Comentários em minhas tarefas", desc: "Alguém comentou em uma tarefa sua." },
              ].map((e) => (
                <div key={e.key} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.desc}</p>
                  </div>
                  <Switch
                    checked={contentEvents[e.key as keyof typeof contentEvents]}
                    onCheckedChange={(v) => setContentEvents({ ...contentEvents, [e.key]: v })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-primary/5 p-4 space-y-1.5">
            <p className="text-sm font-semibold">O que você receberá:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>📋 Quantidade de tarefas pendentes para o dia</li>
              <li>💰 Quanto faturou no dia anterior</li>
              <li>📊 Resumo rápido de leads e orçamentos</li>
            </ul>
          </div>

          <Button
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-11"
            onClick={() => toast.success("Configurações salvas!")}
          >
            Salvar Configurações
          </Button>
        </div>
      </Card>

      {/* Notificações gerais */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Bell className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Notificações</h2>
            <p className="text-xs text-muted-foreground">Gerencie como você recebe atualizações</p>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {[
            { key: "novosLeads", title: "Novos Leads", desc: "Seja notificado quando receber novo lead" },
            { key: "propostasAbertas", title: "Propostas Abertas", desc: "Quando cliente visualiza sua proposta" },
            { key: "prazos", title: "Prazos Próximos", desc: "Alerta 2 dias antes do deadline" },
            { key: "pagamentos", title: "Pagamentos Recebidos", desc: "Confirmação de pagamentos" },
            { key: "insights", title: "Insights da IA", desc: "Dicas e sugestões semanais" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch
                checked={generalNotifs[n.key as keyof typeof generalNotifs]}
                onCheckedChange={(v) => setGeneralNotifs({ ...generalNotifs, [n.key]: v })}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

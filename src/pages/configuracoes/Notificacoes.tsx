import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingDown, TrendingUp, Crown, AlertTriangle, Snowflake } from "lucide-react";
import { toast } from "sonner";

export function Notificacoes() {
  const [pushEnabled] = useState(false);
  const [resumoDiario, setResumoDiario] = useState(false);

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

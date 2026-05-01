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

  const [rfvAlerts, setRfvAlerts] = useState({
    enabled: true,
    championToAtRisk: true,
    loyalToHibernating: true,
    cantLoseDetected: true,
    newChampion: true,
    becameLost: true,
    weeklyDigest: false,
  });
  const [rfvFrequency, setRfvFrequency] = useState("realtime");

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

      {/* Alertas RFV — mudança de segmento de cliente */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <TrendingDown className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Alertas RFV de clientes
                <Badge className="bg-primary/15 text-primary border-0 text-[10px] h-4 px-1.5">Novo</Badge>
              </h2>
              <p className="text-xs text-muted-foreground">Seja avisado quando um cliente muda de segmento na matriz RFV</p>
            </div>
          </div>
          <Switch
            checked={rfvAlerts.enabled}
            onCheckedChange={(v) => setRfvAlerts({ ...rfvAlerts, enabled: v })}
          />
        </div>

        <div className={`p-6 space-y-5 transition-opacity ${rfvAlerts.enabled ? "" : "opacity-50 pointer-events-none"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Frequência dos alertas</p>
              <p className="text-xs text-muted-foreground">Com que frequência verificar mudanças de segmento</p>
            </div>
            <Select value={rfvFrequency} onValueChange={setRfvFrequency}>
              <SelectTrigger className="w-44 h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Em tempo real</SelectItem>
                <SelectItem value="daily">Diariamente</SelectItem>
                <SelectItem value="weekly">Semanalmente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-sm font-semibold mb-1">Mudanças críticas (recomendado)</p>
            <p className="text-xs text-muted-foreground mb-3">Eventos que pedem ação imediata da sua equipe.</p>
            <div className="space-y-2">
              {[
                { key: "championToAtRisk", icon: AlertTriangle, color: "text-rose-500", title: "Campeão → Em risco", desc: "Um dos seus melhores clientes parou de comprar com a frequência habitual." },
                { key: "cantLoseDetected", icon: AlertTriangle, color: "text-yellow-500", title: "Caiu para 'Não pode perder'", desc: "Cliente de alto valor sumiu — prioridade máxima de reativação." },
                { key: "loyalToHibernating", icon: Snowflake, color: "text-slate-500", title: "Leal → Hibernando", desc: "Cliente fiel ficou inativo por muito tempo." },
                { key: "becameLost", icon: TrendingDown, color: "text-rose-400", title: "Cliente foi para 'Perdidos'", desc: "Última oportunidade de campanha de winback." },
                { key: "newChampion", icon: Crown, color: "text-amber-500", title: "Novo Campeão 🎉", desc: "Cliente atingiu R, F e V altos — hora de recompensar." },
              ].map((e) => {
                const Icon = e.icon;
                return (
                  <div key={e.key} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                    <div className="flex items-start gap-3 flex-1 pr-4">
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${e.color}`} />
                      <div>
                        <p className="text-sm font-medium">{e.title}</p>
                        <p className="text-xs text-muted-foreground">{e.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={rfvAlerts[e.key as keyof typeof rfvAlerts] as boolean}
                      onCheckedChange={(v) => setRfvAlerts({ ...rfvAlerts, [e.key]: v })}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-primary/5">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="text-sm font-medium">Resumo semanal RFV</p>
                <p className="text-xs text-muted-foreground">Receba toda segunda um panorama da saúde do seu portfólio.</p>
              </div>
            </div>
            <Switch
              checked={rfvAlerts.weeklyDigest}
              onCheckedChange={(v) => setRfvAlerts({ ...rfvAlerts, weeklyDigest: v })}
            />
          </div>

          <Button
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-11"
            onClick={() => toast.success("Alertas RFV salvos!")}
          >
            Salvar alertas RFV
          </Button>
        </div>
      </Card>
    </div>
  );
}

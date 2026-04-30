import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, RefreshCw, CalendarDays, Clock, Sparkles, History, ArrowLeftRight, XCircle, ChevronRight } from "lucide-react";

const rows = [
  { icon: CheckCircle2, label: "Status", value: "Ativo", right: <Badge className="bg-success/15 text-success border-success/30">Ativo</Badge>, color: "text-success" },
  { icon: Sparkles, label: "Plano", value: "Starter — Mensal", right: <Badge className="bg-primary/15 text-primary border-primary/30">Mensal</Badge>, color: "text-primary" },
  { icon: CreditCard, label: "Cartão de Crédito", value: "Nenhum cartão cadastrado", right: <Button size="sm" variant="outline">Cadastrar</Button>, color: "text-muted-foreground" },
  { icon: RefreshCw, label: "Renovação Automática", value: "Ativa", right: <span className="text-xs text-muted-foreground">Próxima cobrança: 29 de mai. de 2026</span>, color: "text-success" },
  { icon: CalendarDays, label: "Dias Restantes", value: "29 dias", right: null, color: "text-primary" },
  { icon: Clock, label: "Data de Expiração", value: "29 de maio de 2026", right: null, color: "text-muted-foreground" },
];

const actions = [
  { icon: History, label: "Histórico de Pagamentos" },
  { icon: ArrowLeftRight, label: "Alterar Plano" },
];

export function Assinatura() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Minha Assinatura</h2>
            <p className="text-xs text-muted-foreground">Gerencie sua assinatura e pagamentos</p>
          </div>
        </div>

        <div className="p-6 space-y-2">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`h-5 w-5 shrink-0 ${r.color}`} />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{r.label}</p>
                    <p className="text-sm font-semibold truncate">{r.value}</p>
                  </div>
                </div>
                {r.right}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-semibold">Ações</h3>
        </div>
        <div className="p-3 space-y-1">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{a.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
          <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-destructive/10 text-destructive text-sm transition-colors mt-2">
            <XCircle className="h-4 w-4" />
            Cancelar Assinatura
          </button>
        </div>
      </Card>
    </div>
  );
}

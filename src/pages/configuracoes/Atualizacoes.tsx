import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageCircle, CheckSquare, DollarSign, Plug, Package, Bug, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type TagKind = "novo" | "ia" | "tarefa" | "financeiro" | "integracao" | "produto" | "conteudo" | "correcao";

interface Update {
  date: string;
  isNew?: boolean;
  items: { icon: any; title: string; tags: TagKind[]; desc: string }[];
}

const tagStyles: Record<TagKind, string> = {
  novo: "bg-success/15 text-success border-success/30",
  ia: "bg-primary/15 text-primary border-primary/30",
  tarefa: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  financeiro: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  integracao: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  produto: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
  conteudo: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  correcao: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const updates: Update[] = [
  {
    date: "23/04/2026", isNew: true, items: [
      { icon: Sparkles, title: "Assistente IA interno (DGFlow AI)", tags: ["ia", "novo"], desc: "Novo atalho em Equipe: integração com Asaas, conteúdo, financeiro." },
      { icon: MessageCircle, title: "Botão flutuante de IA", tags: ["ia"], desc: "Suba ideias direto da equipe por voz e grave o atendimento na timeline." },
      { icon: Plug, title: "Aviso de domínio próprio em Meus Links", tags: ["integracao"], desc: "Quando seu domínio personalizado estiver ativo, mostramos os perfis (IG/TikTok/Linktree) já configurados." },
    ],
  },
  {
    date: "22/04/2026", isNew: true, items: [
      { icon: Sparkles, title: "Editor visual AI Design (Canva-like)", tags: ["ia", "beta", "novo" as TagKind], desc: "Novo editor com Konva para criar peças visuais à parte do briefing. Liberação em B2B." },
      { icon: CheckSquare, title: "Tarefas recorrentes avançadas", tags: ["tarefa"], desc: "Recorrência diária, semanal ou mensal com cron diário e revisão das próximas datas a serem geradas." },
    ],
  },
  {
    date: "21/04/2026", isNew: true, items: [
      { icon: CheckSquare, title: "Colunas Kanban por projeto", tags: ["tarefa"], desc: "Cada projeto pode ter colunas Kanban personalizadas no novo layout. Configurável em ações de edição." },
      { icon: DollarSign, title: "Venda Rápida → gera tarefa/projeto", tags: ["financeiro"], desc: "Switch Gerar Tarefa no projeto vende rápido com 1 clique automatizado." },
    ],
  },
  {
    date: "20/04/2026", isNew: true, items: [
      { icon: Sparkles, title: "Flow Forms — editor em tela cheia", tags: ["tarefa"], desc: "Editor de formulários em modo cheia com layout otimizado e preview ao vivo." },
      { icon: DollarSign, title: "Planos de Serviço (bundles)", tags: ["financeiro"], desc: "Agrupe múltiplos serviços com 1 clique no orçamento ou venda rápida." },
    ],
  },
  {
    date: "19/04/2026", items: [
      { icon: DollarSign, title: "Caixas de Caixa (Cash Registers)", tags: ["financeiro"], desc: "Suporte a múltiplas caixas com regras de fechamento automático por cliente, evento ou método de pagamento." },
      { icon: Package, title: "Gestão de produtos + estoque integrado", tags: ["produto"], desc: "Custos de serviço, dedução automática de estoque e rastreabilidade em toda a plataforma." },
    ],
  },
  {
    date: "18/04/2026", items: [
      { icon: DollarSign, title: "Comissões por membro de equipe", tags: ["financeiro"], desc: "Regras fixas ou percentuais comissivas baseadas em produto/serviço/marca. Painel na aba/ele mensal." },
      { icon: DollarSign, title: "Dashboard administrativo de faturamento", tags: ["financeiro"], desc: "Painel com nova edição de gráficos, métricas e status de MRR e renovações." },
    ],
  },
  {
    date: "17/04/2026", items: [
      { icon: Sparkles, title: "Tinder de aprovação no portal", tags: ["conteudo"], desc: "Fluxo rápido tipo 'Tinder' (swipe ap/comentar/up) no portal do cliente, otimizado para mobile." },
      { icon: MessageCircle, title: "Reviews de anexos com pin", tags: ["conteudo"], desc: "Cliente pode comentar com pin (px/y) sobre arte com fluxo de notificação até nós." },
    ],
  },
];

export function Atualizacoes() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow text-xl">
              ✨
            </div>
            <div>
              <h2 className="text-lg font-bold">Últimas Atualizações</h2>
              <p className="text-xs text-muted-foreground">Novidades dos últimos releases — Abril 2026</p>
            </div>
          </div>
          <div className="relative w-64 max-w-full hidden md:block">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar atualização..."
              className="pl-9 bg-muted/40"
            />
          </div>
        </div>

        <div className="p-6 space-y-8">
          {updates.map((u) => (
            <div key={u.date}>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-bold tracking-tight">{u.date}</p>
                {u.isNew && (
                  <Badge className="bg-success/15 text-success border-success/30 text-[10px] h-5">NOVO</Badge>
                )}
              </div>
              <div className="space-y-2">
                {u.items.map((it, i) => {
                  const Icon = it.icon;
                  return (
                    <div key={i} className="flex gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{it.title}</p>
                          {it.tags.map((t) => (
                            <Badge key={t} className={`${tagStyles[t] ?? "bg-muted text-muted-foreground"} text-[10px] h-4 px-1.5 border`}>
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{it.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

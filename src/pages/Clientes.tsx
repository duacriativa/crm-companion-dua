import { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Crown,
  Heart,
  AlertTriangle,
  Snowflake,
  Skull,
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* =========================================================================
   MATRIZ RFV — Recência, Frequência, Valor (MRR)
   Escala 1–5 em cada eixo (125 combinações possíveis)
   ========================================================================= */

type SegmentKey =
  | "champions"
  | "loyal"
  | "potential"
  | "new"
  | "promising"
  | "needAttention"
  | "aboutToSleep"
  | "atRisk"
  | "cantLose"
  | "hibernating"
  | "lost";

type Segment = {
  key: SegmentKey;
  label: string;
  description: string;
  icon: typeof Crown;
  color: string; // tailwind text color
  bg: string; // tailwind bg
  border: string; // tailwind border
};

const SEGMENTS: Record<SegmentKey, Segment> = {
  champions: {
    key: "champions",
    label: "1. Campeões",
    description: "Compram recente, com frequência e alto valor. Recompense.",
    icon: Crown,
    color: "text-white",
    bg: "bg-sky-600",
    border: "border-sky-700",
  },
  loyal: {
    key: "loyal",
    label: "2. Clientes leais",
    description: "Frequentes e bom valor. Engaje com fidelidade.",
    icon: Heart,
    color: "text-sky-900",
    bg: "bg-sky-200",
    border: "border-sky-300",
  },
  potential: {
    key: "potential",
    label: "3. Potenciais leais",
    description: "Compraram recente, valor médio. Faça upsell.",
    icon: TrendingUp,
    color: "text-sky-900",
    bg: "bg-sky-100",
    border: "border-sky-200",
  },
  new: {
    key: "new",
    label: "4. Clientes recentes",
    description: "Compra recente, baixa frequência. Onboarding.",
    icon: Sparkles,
    color: "text-amber-900",
    bg: "bg-amber-300",
    border: "border-amber-400",
  },
  promising: {
    key: "promising",
    label: "5. Promissores",
    description: "Recente mas gastou pouco. Eduque sobre valor.",
    icon: ArrowUpRight,
    color: "text-white",
    bg: "bg-sky-500",
    border: "border-sky-600",
  },
  needAttention: {
    key: "needAttention",
    label: "6. Precisam de atenção",
    description: "Recência, frequência e valor médios. Reative.",
    icon: Bell,
    color: "text-white",
    bg: "bg-emerald-500",
    border: "border-emerald-600",
  },
  aboutToSleep: {
    key: "aboutToSleep",
    label: "7. Prestes a dormir",
    description: "Caindo de engajamento. Campanha de reativação.",
    icon: Snowflake,
    color: "text-sky-900",
    bg: "bg-sky-300",
    border: "border-sky-400",
  },
  atRisk: {
    key: "atRisk",
    label: "8. Em risco",
    description: "Bons clientes que sumiram. Personalize a abordagem.",
    icon: AlertTriangle,
    color: "text-white",
    bg: "bg-cyan-500",
    border: "border-cyan-600",
  },
  cantLose: {
    key: "cantLose",
    label: "9. Não pode perdê-los",
    description: "Alto valor, sumiram. PRIORIDADE máxima.",
    icon: AlertTriangle,
    color: "text-yellow-900",
    bg: "bg-yellow-300",
    border: "border-yellow-400",
  },
  hibernating: {
    key: "hibernating",
    label: "10. Hibernando",
    description: "Inativos há muito tempo, valor médio.",
    icon: Snowflake,
    color: "text-white",
    bg: "bg-slate-800",
    border: "border-slate-900",
  },
  lost: {
    key: "lost",
    label: "11. Perdidos",
    description: "Praticamente perdidos. Última tentativa ou arquive.",
    icon: Skull,
    color: "text-white",
    bg: "bg-rose-400",
    border: "border-rose-500",
  },
};

/** Classifica um cliente em um segmento RFV a partir de R, F, V (1–5). */
function classifyRFV(r: number, f: number, v: number): SegmentKey {
  if (r >= 4 && f >= 4 && v >= 4) return "champions";
  if (r >= 3 && f >= 4) return "loyal";
  if (r >= 4 && f <= 2 && v <= 2) return "new";
  if (r >= 4 && f <= 3) return "potential";
  if (r >= 3 && f <= 2 && v <= 2) return "promising";
  if (r <= 2 && f >= 4 && v >= 4) return "cantLose";
  if (r <= 2 && f >= 3 && v >= 3) return "atRisk";
  if (r === 2 && f <= 2) return "aboutToSleep";
  if (r <= 2 && f <= 2 && v <= 2) return "lost";
  if (r <= 2) return "hibernating";
  return "needAttention";
}

/* ----------------------------- Mock de dados ----------------------------- */

type Cliente = {
  id: number;
  name: string;
  segmento: string;
  email: string;
  // RFV
  recency: number; // 1–5 (5 = comprou/interagiu há pouco)
  frequency: number; // 1–5 (5 = muito frequente)
  mrr: number; // valor mensal recorrente em R$
  vScore: number; // 1–5 derivado do MRR
  daysInBase: number;
  daysSinceContact: number;
  previousSegment?: SegmentKey;
};

// Buckets de MRR -> V score
function mrrToV(mrr: number): number {
  if (mrr >= 5000) return 5;
  if (mrr >= 2500) return 4;
  if (mrr >= 1200) return 3;
  if (mrr >= 500) return 2;
  return 1;
}

const CLIENTES_MOCK: Omit<Cliente, "vScore">[] = [
  { id: 1, name: "Loja Aurora", segmento: "E-commerce", email: "contato@aurora.com", recency: 5, frequency: 5, mrr: 6800, daysInBase: 412, daysSinceContact: 2 },
  { id: 2, name: "Studio Vértice", segmento: "Arquitetura", email: "ola@vertice.co", recency: 5, frequency: 4, mrr: 3200, daysInBase: 280, daysSinceContact: 4, previousSegment: "loyal" },
  { id: 3, name: "Café da Esquina", segmento: "Food", email: "marketing@cafe.com", recency: 4, frequency: 5, mrr: 1800, daysInBase: 198, daysSinceContact: 8 },
  { id: 4, name: "TechNova SaaS", segmento: "SaaS", email: "growth@technova.io", recency: 2, frequency: 5, mrr: 7400, daysInBase: 520, daysSinceContact: 47, previousSegment: "champions" },
  { id: 5, name: "Bella Moda", segmento: "Moda", email: "ana@bellamoda.com", recency: 5, frequency: 1, mrr: 600, daysInBase: 14, daysSinceContact: 1 },
  { id: 6, name: "Construtora Pilar", segmento: "Construção", email: "marketing@pilar.com.br", recency: 1, frequency: 4, mrr: 4200, daysInBase: 610, daysSinceContact: 92, previousSegment: "loyal" },
  { id: 7, name: "Clínica Vita", segmento: "Saúde", email: "contato@vita.med.br", recency: 3, frequency: 3, mrr: 1400, daysInBase: 240, daysSinceContact: 18 },
  { id: 8, name: "EduMais Cursos", segmento: "Educação", email: "hi@edumais.com", recency: 4, frequency: 2, mrr: 950, daysInBase: 65, daysSinceContact: 6 },
  { id: 9, name: "Fit&Co Academia", segmento: "Fitness", email: "marketing@fitco.com", recency: 2, frequency: 2, mrr: 420, daysInBase: 320, daysSinceContact: 55, previousSegment: "needAttention" },
  { id: 10, name: "AutoPeças Brasil", segmento: "Automotivo", email: "vendas@autopecas.com.br", recency: 1, frequency: 1, mrr: 280, daysInBase: 720, daysSinceContact: 210 },
  { id: 11, name: "Pet Lovers", segmento: "Pet", email: "ola@petlovers.com", recency: 3, frequency: 2, mrr: 700, daysInBase: 110, daysSinceContact: 22 },
  { id: 12, name: "Imobiliária Horizonte", segmento: "Imobiliária", email: "marketing@horizonte.com", recency: 5, frequency: 3, mrr: 2600, daysInBase: 380, daysSinceContact: 3 },
];

const CLIENTES: Cliente[] = CLIENTES_MOCK.map((c) => ({ ...c, vScore: mrrToV(c.mrr) }));

/* ----------------------------- Helpers UI ------------------------------- */

function ScoreDot({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-semibold text-muted-foreground w-3">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              n <= value ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SegmentBadge({ seg }: { seg: Segment }) {
  const Icon = seg.icon;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        seg.bg,
        seg.border,
        seg.color,
      )}
    >
      <Icon className="h-3 w-3" />
      {seg.label}
    </div>
  );
}

/* =============================== Página ================================== */

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid" | "matrix">("list");
  const [segmentFilter, setSegmentFilter] = useState<SegmentKey | "all">("all");
  const [openCreate, setOpenCreate] = useState(false);

  const enriched = useMemo(
    () =>
      CLIENTES.map((c) => {
        const segKey = classifyRFV(c.recency, c.frequency, c.vScore);
        return { ...c, segKey, segment: SEGMENTS[segKey] };
      }),
    [],
  );

  const filtered = useMemo(() => {
    return enriched.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesSeg = segmentFilter === "all" || c.segKey === segmentFilter;
      return matchesSearch && matchesSeg;
    });
  }, [enriched, search, segmentFilter]);

  // KPIs
  const totalMRR = enriched.reduce((s, c) => s + c.mrr, 0);
  const champions = enriched.filter((c) => c.segKey === "champions").length;
  const atRisk = enriched.filter(
    (c) => c.segKey === "atRisk" || c.segKey === "cantLose",
  ).length;
  const lost = enriched.filter((c) => c.segKey === "lost" || c.segKey === "hibernating").length;

  // Movimentações de segmento (alertas)
  const movements = enriched
    .filter((c) => c.previousSegment && c.previousSegment !== c.segKey)
    .map((c) => ({
      cliente: c,
      from: SEGMENTS[c.previousSegment!],
      to: c.segment,
      down: ["atRisk", "cantLose", "lost", "hibernating", "aboutToSleep"].includes(c.segKey),
    }));

  // Distribuição por segmento
  const distribution = (Object.keys(SEGMENTS) as SegmentKey[])
    .map((k) => ({
      key: k,
      seg: SEGMENTS[k],
      count: enriched.filter((c) => c.segKey === k).length,
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <Users className="h-6 w-6 text-primary" />
              Clientes
            </h1>
            <p className="text-sm text-muted-foreground">
              Matriz <strong>RFV</strong> · Recência · Frequência · Valor (MRR) — visão estratégica do seu portfólio.
            </p>
          </div>

          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Cadastrar cliente
              </Button>
            </DialogTrigger>
            <CadastrarClienteDialog onClose={() => setOpenCreate(false)} />
          </Dialog>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <KpiCard
            label="MRR total"
            value={`R$ ${totalMRR.toLocaleString("pt-BR")}`}
            hint="Receita recorrente mensal"
            tone="primary"
          />
          <KpiCard
            label="Champions"
            value={String(champions)}
            hint="R, F e V altos"
            tone="success"
            icon={Crown}
          />
          <KpiCard
            label="At Risk / Can't Lose"
            value={String(atRisk)}
            hint="Bons clientes sumindo"
            tone="danger"
            icon={AlertTriangle}
          />
          <KpiCard
            label="Hibernando / Perdidos"
            value={String(lost)}
            hint="Reativar ou arquivar"
            tone="muted"
            icon={Snowflake}
          />
        </div>

        {/* Alertas de movimentação */}
        {movements.length > 0 && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-amber-600" />
                Mudanças de segmento ({movements.length})
              </CardTitle>
              <CardDescription>
                Clientes que migraram de segmento desde a última análise.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {movements.map((m) => (
                <div
                  key={m.cliente.id}
                  className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-3">
                    {m.down ? (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    )}
                    <span className="font-medium">{m.cliente.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SegmentBadge seg={m.from} />
                    <span className="text-muted-foreground">→</span>
                    <SegmentBadge seg={m.to} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Distribuição por segmento (chips clicáveis) */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Distribuição por segmento</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    Cada cliente recebe um score <strong>R-F-V</strong> de 1 a 5 e é
                    classificado em um dos 11 segmentos. Clique para filtrar.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSegmentFilter("all")}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  segmentFilter === "all"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background hover:bg-muted",
                )}
              >
                Todos · {enriched.length}
              </button>
              {distribution.map((d) => {
                const active = segmentFilter === d.key;
                const Icon = d.seg.icon;
                return (
                  <button
                    key={d.key}
                    onClick={() => setSegmentFilter(d.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition",
                      active
                        ? cn(d.seg.bg, d.seg.border, d.seg.color, "ring-2 ring-offset-1 ring-offset-background")
                        : cn(d.seg.bg, d.seg.border, d.seg.color, "opacity-70 hover:opacity-100"),
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {d.seg.label} · {d.count}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou e-mail…"
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-1 rounded-md border bg-background p-0.5">
            <ViewBtn active={view === "list"} onClick={() => setView("list")} icon={ListIcon} label="Lista" />
            <ViewBtn active={view === "grid"} onClick={() => setView("grid")} icon={LayoutGrid} label="Grid" />
            <ViewBtn active={view === "matrix"} onClick={() => setView("matrix")} icon={TrendingUp} label="Matriz R×F" />
          </div>
        </div>

        {/* Conteúdo */}
        {view === "list" && <ListaView clientes={filtered} />}
        {view === "grid" && <GridView clientes={filtered} />}
        {view === "matrix" && <MatrixView clientes={filtered} />}

        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
            Nenhum cliente encontrado com os filtros atuais.
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------- Subcomponents -------------------------- */

function KpiCard({
  label,
  value,
  hint,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "primary" | "success" | "danger" | "muted";
  icon?: typeof Crown;
}) {
  const tones = {
    primary: "border-primary/30 bg-primary/5",
    success: "border-emerald-500/30 bg-emerald-500/5",
    danger: "border-red-500/30 bg-red-500/5",
    muted: "border-border bg-muted/30",
  };
  return (
    <Card className={cn("border", tones[tone])}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </div>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

function ViewBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof ListIcon;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium transition",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

type EnrichedCliente = Cliente & { segKey: SegmentKey; segment: Segment };

function ListaView({ clientes }: { clientes: EnrichedCliente[] }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left">Cliente</th>
            <th className="px-4 py-3 text-left">Segmento RFV</th>
            <th className="px-4 py-3 text-left">Score</th>
            <th className="px-4 py-3 text-right">MRR</th>
            <th className="px-4 py-3 text-right">Na base</th>
            <th className="px-4 py-3 text-right">Sem contato</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {clientes.map((c) => (
            <tr key={c.id} className="hover:bg-muted/30">
              <td className="px-4 py-3">
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.segmento} · {c.email}</div>
              </td>
              <td className="px-4 py-3"><SegmentBadge seg={c.segment} /></td>
              <td className="px-4 py-3">
                <div className="space-y-1">
                  <ScoreDot label="R" value={c.recency} />
                  <ScoreDot label="F" value={c.frequency} />
                  <ScoreDot label="V" value={c.vScore} />
                </div>
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm">
                R$ {c.mrr.toLocaleString("pt-BR")}
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground">{c.daysInBase}d</td>
              <td className="px-4 py-3 text-right text-muted-foreground">{c.daysSinceContact}d</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GridView({ clientes }: { clientes: EnrichedCliente[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {clientes.map((c) => (
        <Card key={c.id} className={cn("border", c.segment.border)}>
          <CardContent className="space-y-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-medium">{c.name}</div>
                <div className="truncate text-xs text-muted-foreground">{c.segmento}</div>
              </div>
              <SegmentBadge seg={c.segment} />
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-md border bg-muted/30 p-2">
              <RfvCell label="R" value={c.recency} />
              <RfvCell label="F" value={c.frequency} />
              <RfvCell label="V" value={c.vScore} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">MRR</span>
              <span className="font-mono font-semibold">R$ {c.mrr.toLocaleString("pt-BR")}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{c.daysInBase}d na base</span>
              <span>{c.daysSinceContact}d sem contato</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RfvCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}

/**
 * Layout fixo da Matriz RFM (estilo treemap).
 * Grid 12 colunas (Recência →) × 12 linhas (Frequência + Valor ↑).
 * Cada célula define onde cada segmento ocupa.
 */
const MATRIX_BLOCKS: {
  key: SegmentKey;
  // grid: colStart, colSpan, rowStart, rowSpan (1-indexed)
  col: [number, number];
  row: [number, number];
}[] = [
  // Topo (alta freq+valor)
  { key: "cantLose",     col: [1, 3],  row: [1, 3] },   // canto sup-esq
  { key: "loyal",        col: [4, 6],  row: [1, 4] },   // centro-topo grande
  { key: "champions",    col: [10, 3], row: [1, 2] },   // canto sup-dir
  // Meio
  { key: "atRisk",       col: [1, 3],  row: [4, 4] },   // grande à esquerda
  { key: "needAttention",col: [6, 2],  row: [5, 2] },   // verde no centro
  { key: "potential",    col: [8, 5],  row: [3, 5] },   // grande à direita
  // Base
  { key: "lost",         col: [1, 3],  row: [8, 5] },   // rosa grande inferior-esq
  { key: "hibernating",  col: [4, 2],  row: [8, 2] },   // azul escuro
  { key: "aboutToSleep", col: [6, 2],  row: [8, 4] },   // claro estreito
  { key: "promising",    col: [8, 2],  row: [10, 3] },  // azul médio
  { key: "new",          col: [10, 3], row: [10, 3] },  // amarelo canto inf-dir
];

function MatrixView({ clientes }: { clientes: EnrichedCliente[] }) {
  const counts = clientes.reduce<Record<string, EnrichedCliente[]>>((acc, c) => {
    (acc[c.segKey] ||= []).push(c);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Matriz RFM</CardTitle>
        <CardDescription>
          Cada bloco representa um segmento. O tamanho indica a importância estratégica;
          a posição combina <strong>Recência</strong> (eixo horizontal) com{" "}
          <strong>Frequência + Valor monetário</strong> (eixo vertical).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          {/* Eixo Y */}
          <div className="flex w-6 items-center justify-center">
            <div className="flex -rotate-90 whitespace-nowrap text-xs font-medium text-muted-foreground">
              Frequência + valor monetário (médio) ↑
            </div>
          </div>

          <div className="flex-1">
            <div
              className="grid aspect-square w-full gap-1.5"
              style={{
                gridTemplateColumns: "repeat(12, minmax(0,1fr))",
                gridTemplateRows: "repeat(12, minmax(0,1fr))",
              }}
            >
              {MATRIX_BLOCKS.map((b) => {
                const seg = SEGMENTS[b.key];
                const list = counts[b.key] || [];
                const Icon = seg.icon;
                return (
                  <Tooltip key={b.key}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-md border p-2 shadow-sm transition hover:scale-[1.02] hover:shadow-md",
                          seg.bg,
                          seg.border,
                          seg.color,
                        )}
                        style={{
                          gridColumn: `${b.col[0]} / span ${b.col[1]}`,
                          gridRow: `${b.row[0]} / span ${b.row[1]}`,
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-center gap-1 text-[11px] font-semibold leading-tight">
                            <Icon className="h-3 w-3 shrink-0" />
                            <span className="line-clamp-2">{seg.label}</span>
                          </div>
                          {list.length > 0 && (
                            <span className="rounded-full bg-background/30 px-1.5 py-0.5 text-[10px] font-bold backdrop-blur-sm">
                              {list.length}
                            </span>
                          )}
                        </div>
                        {/* dots representando clientes */}
                        {list.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-0.5">
                            {list.slice(0, 18).map((c) => (
                              <span
                                key={c.id}
                                className="h-1.5 w-1.5 rounded-full bg-background/70"
                                title={c.name}
                              />
                            ))}
                            {list.length > 18 && (
                              <span className="text-[9px] opacity-80">
                                +{list.length - 18}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-1 text-xs">
                        <div className="font-semibold">{seg.label}</div>
                        <div className="text-muted-foreground">{seg.description}</div>
                        <div className="pt-1 font-medium">
                          {list.length} {list.length === 1 ? "cliente" : "clientes"}
                          {list.length > 0 && (
                            <> · MRR R$ {list.reduce((s, c) => s + c.mrr, 0).toLocaleString("pt-BR")}</>
                          )}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
            {/* Eixo X */}
            <div className="mt-2 flex items-center justify-end text-xs font-medium text-muted-foreground">
              Recência →
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------- Cadastrar Cliente Dialog ---------------------- */

function CadastrarClienteDialog({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    segmento: "",
    mrr: "",
    notes: "",
  });

  function submit() {
    if (!form.name) {
      toast.error("Informe o nome do cliente");
      return;
    }
    toast.success(`Cliente ${form.name} cadastrado!`, {
      description: "Será classificado na matriz RFV após o primeiro ciclo.",
    });
    onClose();
  }

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Novo cliente</DialogTitle>
        <DialogDescription>
          Cadastre o cliente. A classificação RFV é calculada automaticamente conforme as interações.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-3">
        <div>
          <Label>Nome *</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Loja Aurora" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>E-mail</Label>
            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="contato@..." />
          </div>
          <div>
            <Label>MRR estimado (R$)</Label>
            <Input type="number" value={form.mrr} onChange={(e) => setForm({ ...form, mrr: e.target.value })} placeholder="0" />
          </div>
        </div>
        <div>
          <Label>Segmento</Label>
          <Select value={form.segmento} onValueChange={(v) => setForm({ ...form, segmento: v })}>
            <SelectTrigger><SelectValue placeholder="Selecione…" /></SelectTrigger>
            <SelectContent>
              {["E-commerce","SaaS","Saúde","Educação","Food","Moda","Pet","Imobiliária","Outro"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Observações</Label>
          <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={submit}>Cadastrar</Button>
      </DialogFooter>
    </DialogContent>
  );
}

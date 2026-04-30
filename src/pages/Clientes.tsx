import { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Bell,
  Clock,
  AlertTriangle,
  TrendingUp,
  Filter,
  Link as LinkIcon,
  LayoutGrid,
  List as ListIcon,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ----------------------------- Inatividade ------------------------------ */

type InactivityKey =
  | "ativo"
  | "d1"
  | "d3"
  | "d7"
  | "d15"
  | "d30"
  | "d45"
  | "d60"
  | "d90"
  | "d180"
  | "d360";

const inactivitySteps: {
  key: InactivityKey;
  label: string;
  min: number; // dias mínimos sem responder
  tone: "success" | "info" | "warning" | "danger" | "critical";
}[] = [
  { key: "ativo", label: "Ativo (< 1d)", min: 0, tone: "success" },
  { key: "d1", label: "1 dia", min: 1, tone: "info" },
  { key: "d3", label: "3 dias", min: 3, tone: "info" },
  { key: "d7", label: "7 dias", min: 7, tone: "warning" },
  { key: "d15", label: "15 dias", min: 15, tone: "warning" },
  { key: "d30", label: "30 dias", min: 30, tone: "danger" },
  { key: "d45", label: "45 dias", min: 45, tone: "danger" },
  { key: "d60", label: "60 dias", min: 60, tone: "danger" },
  { key: "d90", label: "90 dias", min: 90, tone: "critical" },
  { key: "d180", label: "180 dias", min: 180, tone: "critical" },
  { key: "d360", label: "360 dias", min: 360, tone: "critical" },
];

function classifyInactivity(daysSinceReply: number): InactivityKey {
  let current: InactivityKey = "ativo";
  for (const s of inactivitySteps) {
    if (daysSinceReply >= s.min) current = s.key;
  }
  return current;
}

const toneClasses: Record<string, string> = {
  success: "bg-success/15 text-success border-success/30",
  info: "bg-primary/15 text-primary border-primary/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-destructive/15 text-destructive border-destructive/40",
  critical:
    "bg-destructive/25 text-destructive border-destructive/60 ring-1 ring-destructive/30",
};

/* ------------------------------ Mock data ------------------------------- */

type Cliente = {
  id: string;
  nome: string;
  empresa?: string;
  email: string;
  telefone: string;
  segmento?: string;
  tags: string[];
  pipeline?: string;
  valorMensal?: number;
  /** ISO date — quando entrou na base */
  entradaBase: string;
  /** ISO date — última resposta do cliente */
  ultimaResposta: string;
};

const today = new Date();
const daysAgo = (n: number) =>
  new Date(today.getTime() - n * 24 * 60 * 60 * 1000).toISOString();

const mockClientes: Cliente[] = [
  {
    id: "1",
    nome: "Sara Aires",
    empresa: "Studio Sara",
    email: "sara@studio.com",
    telefone: "(85) 99945-4945",
    segmento: "Branding",
    tags: ["trafego-pago", "interesse:combo"],
    pipeline: "Tráfego Pago",
    valorMensal: 2500,
    entradaBase: daysAgo(420),
    ultimaResposta: daysAgo(0),
  },
  {
    id: "2",
    nome: "Ariela Martins",
    email: "ariela@gmail.com",
    telefone: "(85) 99715-2819",
    segmento: "E-commerce",
    tags: ["trafego-pago"],
    pipeline: "Landing Page",
    valorMensal: 1800,
    entradaBase: daysAgo(95),
    ultimaResposta: daysAgo(4),
  },
  {
    id: "3",
    nome: "Pedro Victor Ribeiro",
    empresa: "PVR Marketing",
    email: "pedro@pvr.com",
    telefone: "(11) 92151-5051",
    segmento: "Agência",
    tags: ["interesse:combo"],
    valorMensal: 3200,
    entradaBase: daysAgo(220),
    ultimaResposta: daysAgo(12),
  },
  {
    id: "4",
    nome: "Patricia Faria",
    email: "patricia@faria.com",
    telefone: "(27) 99750-6641",
    segmento: "Imobiliário",
    tags: ["trafego"],
    valorMensal: 1500,
    entradaBase: daysAgo(60),
    ultimaResposta: daysAgo(22),
  },
  {
    id: "5",
    nome: "João Mendes",
    empresa: "Mendes Adv.",
    email: "joao@mendes.adv.br",
    telefone: "(11) 98888-1010",
    segmento: "Jurídico",
    tags: ["recorrente"],
    valorMensal: 4500,
    entradaBase: daysAgo(540),
    ultimaResposta: daysAgo(38),
  },
  {
    id: "6",
    nome: "Carla Souza",
    email: "carla@souza.com",
    telefone: "(31) 99777-2020",
    segmento: "Beleza",
    tags: ["churn-risk"],
    valorMensal: 980,
    entradaBase: daysAgo(180),
    ultimaResposta: daysAgo(72),
  },
  {
    id: "7",
    nome: "Rogério Lima",
    empresa: "Lima Construções",
    email: "rogerio@lima.com",
    telefone: "(81) 99555-7070",
    segmento: "Construção",
    tags: ["vip"],
    valorMensal: 6800,
    entradaBase: daysAgo(800),
    ultimaResposta: daysAgo(120),
  },
  {
    id: "8",
    nome: "Marcos Antunes",
    email: "marcos@antunes.io",
    telefone: "(21) 99333-4040",
    segmento: "Tech",
    tags: ["dormente"],
    valorMensal: 2100,
    entradaBase: daysAgo(900),
    ultimaResposta: daysAgo(210),
  },
  {
    id: "9",
    nome: "Helena Castro",
    email: "helena@castro.com",
    telefone: "(85) 99111-3030",
    segmento: "Saúde",
    tags: ["dormente"],
    entradaBase: daysAgo(1200),
    ultimaResposta: daysAgo(380),
  },
];

/* --------------------------------- Helpers ------------------------------ */

function diffDays(iso: string) {
  return Math.floor(
    (today.getTime() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
}

function tempoNaBase(dias: number) {
  if (dias < 30) return `${dias}d`;
  if (dias < 365) return `${Math.floor(dias / 30)}m`;
  const anos = Math.floor(dias / 365);
  const meses = Math.floor((dias % 365) / 30);
  return meses ? `${anos}a ${meses}m` : `${anos}a`;
}

function initials(nome: string) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ------------------------------- Component ------------------------------ */

export default function Clientes() {
  const [clientes] = useState<Cliente[]>(mockClientes);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<InactivityKey | "all">("all");
  const [view, setView] = useState<"grid" | "list">("list");
  const [openDialog, setOpenDialog] = useState(false);

  const enriched = useMemo(
    () =>
      clientes.map((c) => {
        const diasInativo = diffDays(c.ultimaResposta);
        const diasNaBase = diffDays(c.entradaBase);
        const stageKey = classifyInactivity(diasInativo);
        const stage = inactivitySteps.find((s) => s.key === stageKey)!;
        return { ...c, diasInativo, diasNaBase, stage };
      }),
    [clientes],
  );

  const filtered = useMemo(
    () =>
      enriched.filter((c) => {
        const matchSearch =
          !search ||
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.telefone.includes(search);
        const matchStage =
          stageFilter === "all" || c.stage.key === stageFilter;
        return matchSearch && matchStage;
      }),
    [enriched, search, stageFilter],
  );

  const stats = useMemo(() => {
    const total = enriched.length;
    const novos30 = enriched.filter((c) => c.diasNaBase <= 30).length;
    const emRisco = enriched.filter(
      (c) => c.diasInativo >= 30 && c.diasInativo < 90,
    ).length;
    const criticos = enriched.filter((c) => c.diasInativo >= 90).length;
    const valorMensal = enriched.reduce(
      (acc, c) => acc + (c.valorMensal || 0),
      0,
    );
    return { total, novos30, emRisco, criticos, valorMensal };
  }, [enriched]);

  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    enriched.forEach((c) => {
      counts[c.stage.key] = (counts[c.stage.key] || 0) + 1;
    });
    return counts;
  }, [enriched]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Clientes
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe o tempo na base e a saúde de cada relacionamento
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <LinkIcon className="h-4 w-4 mr-2" />
            Link de Cadastro
          </Button>
          <div className="flex rounded-md border border-border overflow-hidden">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setView("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
          <CadastrarClienteDialog
            open={openDialog}
            onOpenChange={setOpenDialog}
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Total de Clientes"
          value={stats.total.toString()}
          icon={<Users className="h-4 w-4" />}
        />
        <KpiCard
          title="Novos (30d)"
          value={stats.novos30.toString()}
          subtitle="entraram este mês"
          icon={<TrendingUp className="h-4 w-4 text-success" />}
        />
        <KpiCard
          title="Em risco"
          value={stats.emRisco.toString()}
          subtitle="30 a 90 dias sem responder"
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
          tone="warning"
        />
        <KpiCard
          title="Críticos"
          value={stats.criticos.toString()}
          subtitle="90+ dias sem responder"
          icon={<Bell className="h-4 w-4 text-destructive" />}
          tone="danger"
        />
      </div>

      {/* Filtros por inatividade */}
      <Card className="surface-card border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Saúde por inatividade
              </CardTitle>
              <CardDescription>
                Filtre por quanto tempo o cliente está sem responder
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              <Bell className="h-3.5 w-3.5 mr-1.5" />
              Configurar notificações
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <StageChip
              active={stageFilter === "all"}
              onClick={() => setStageFilter("all")}
              label="Todos"
              count={enriched.length}
            />
            {inactivitySteps.map((s) => (
              <StageChip
                key={s.key}
                active={stageFilter === s.key}
                onClick={() => setStageFilter(s.key)}
                label={s.label}
                count={stageCounts[s.key] || 0}
                tone={s.tone}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search + filtros */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou telefone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <Card className="surface-card border-0">
          <CardContent className="py-16 text-center text-muted-foreground">
            Nenhum cliente encontrado com esses filtros.
          </CardContent>
        </Card>
      ) : view === "list" ? (
        <Card className="surface-card border-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Contato</th>
                  <th className="px-4 py-3 font-medium">Tempo na base</th>
                  <th className="px-4 py-3 font-medium">Sem responder</th>
                  <th className="px-4 py-3 font-medium">Pipeline</th>
                  <th className="px-4 py-3 font-medium text-right">Valor/mês</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                          {initials(c.nome)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{c.nome}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {c.empresa || c.segmento}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p>{c.telefone}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className="bg-muted/40 border-border"
                      >
                        {tempoNaBase(c.diasNaBase)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={cn(toneClasses[c.stage.tone])}
                      >
                        {c.diasInativo === 0
                          ? "Hoje"
                          : `${c.diasInativo}d • ${c.stage.label}`}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.pipeline || "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {c.valorMensal
                        ? c.valorMensal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card
              key={c.id}
              className="surface-card border-0 hover:ring-1 hover:ring-primary/40 transition-all"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground shrink-0">
                      {initials(c.nome)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{c.nome}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {c.empresa || c.segmento}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("shrink-0", toneClasses[c.stage.tone])}
                  >
                    {c.stage.label}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-muted/40 p-2.5">
                    <p className="text-muted-foreground">Tempo na base</p>
                    <p className="font-semibold text-sm mt-0.5">
                      {tempoNaBase(c.diasNaBase)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/40 p-2.5">
                    <p className="text-muted-foreground">Sem responder</p>
                    <p
                      className={cn(
                        "font-semibold text-sm mt-0.5",
                        c.stage.tone === "critical" && "text-destructive",
                        c.stage.tone === "danger" && "text-destructive",
                        c.stage.tone === "warning" && "text-warning",
                      )}
                    >
                      {c.diasInativo === 0 ? "Hoje" : `${c.diasInativo}d`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {c.tags.slice(0, 3).map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-[10px] bg-muted/30"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Subcomponentes ---------------------------- */

function KpiCard({
  title,
  value,
  subtitle,
  icon,
  tone,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  tone?: "warning" | "danger";
}) {
  return (
    <Card className="surface-card border-0">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          {icon}
        </div>
        <p
          className={cn(
            "text-2xl font-bold mt-2",
            tone === "warning" && "text-warning",
            tone === "danger" && "text-destructive",
          )}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

function StageChip({
  label,
  count,
  active,
  onClick,
  tone,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  tone?: "success" | "info" | "warning" | "danger" | "critical";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-elegant"
          : tone
            ? cn("hover:scale-105", toneClasses[tone])
            : "bg-muted/40 border-border text-foreground hover:bg-muted",
      )}
    >
      {label}
      <span
        className={cn(
          "ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]",
          active ? "bg-primary-foreground/20" : "bg-background/40",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function CadastrarClienteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
          <DialogDescription>
            Adicione um novo cliente à sua base. Você poderá acompanhar o tempo
            de relacionamento e inatividade.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Pipeline (opcional)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um pipeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lp">Landing Page - Dua</SelectItem>
                <SelectItem value="trafego">Tráfego Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Nome Cliente/Empresa</Label>
              <Input placeholder="Ex: João Silva ou Agência XYZ" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="cliente@email.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input placeholder="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label>CPF/CNPJ</Label>
              <Input placeholder="00.000.000/0000-00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>CEP</Label>
            <Input placeholder="00000-000" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2 col-span-2">
              <Label>Endereço</Label>
              <Input placeholder="Rua, Avenida…" />
            </div>
            <div className="space-y-2">
              <Label>Número</Label>
              <Input placeholder="Nº" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Bairro</Label>
              <Input placeholder="Bairro" />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input placeholder="Cidade" />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Input placeholder="UF" maxLength={2} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Projeto / Interesse</Label>
            <Input placeholder="Ex: Logo, Site, Social Media" />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input placeholder="branding, urgente" />
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea placeholder="Notas sobre o cliente" rows={3} />
          </div>

          <div className="rounded-lg bg-primary/10 border border-primary/30 p-3 text-xs text-foreground/80">
            <p className="font-medium flex items-center gap-1.5 mb-1">
              <Bell className="h-3.5 w-3.5 text-primary" />
              Notificações de inatividade
            </p>
            Você será notificado se este cliente ficar sem responder por 1, 3,
            7, 15, 30, 45, 60, 90, 180 ou 360 dias.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={() => {
              toast.success("Cliente cadastrado com sucesso!");
              onOpenChange(false);
            }}
          >
            Cadastrar Cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

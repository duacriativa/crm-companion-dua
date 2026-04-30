import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical, Trash2, RotateCcw, Save, ClipboardList, Pencil, RotateCcw as RotateIcon, Eye, CheckCircle2, Rocket, Image, Video, Layers, FileText, Sparkles, Mail, Camera, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";

interface Stage {
  id: string;
  name: string;
  icon: any;
  color: string;
  status: string;
  fn: string;
}

const initialStages: Stage[] = [
  { id: "1", name: "Planejamento", icon: ClipboardList, color: "bg-slate-500", status: "Rascunho", fn: "" },
  { id: "2", name: "Produção", icon: Pencil, color: "bg-blue-500", status: "Rascunho", fn: "" },
  { id: "3", name: "Revisão", icon: RotateIcon, color: "bg-orange-500", status: "Revisão (auto ao pedir revisão)", fn: "Revisão" },
  { id: "4", name: "Aprovação cliente", icon: Eye, color: "bg-amber-500", status: "Aguardando aprovação cliente", fn: "" },
  { id: "5", name: "Aprovado", icon: CheckCircle2, color: "bg-emerald-500", status: "Aprovado (auto ao aprovar)", fn: "Aprovado" },
  { id: "6", name: "Publicação", icon: Rocket, color: "bg-cyan-500", status: "Publicado", fn: "" },
];

const defaultTypes = [
  { name: "Feed (post)", icon: Image, color: "from-pink-500 to-rose-500" },
  { name: "Reels", icon: Video, color: "from-fuchsia-500 to-purple-500" },
  { name: "Stories", icon: Layers, color: "from-amber-500 to-orange-500" },
  { name: "Carrossel", icon: Layers, color: "from-blue-500 to-indigo-500" },
  { name: "Artigo / Blog", icon: FileText, color: "from-emerald-500 to-green-500" },
  { name: "Branding", icon: Sparkles, color: "from-violet-500 to-purple-600" },
  { name: "Apresentação", icon: LayoutTemplate, color: "from-sky-500 to-cyan-500" },
  { name: "Foto", icon: Camera, color: "from-cyan-500 to-blue-500" },
  { name: "Landing page", icon: LayoutTemplate, color: "from-teal-500 to-emerald-500" },
  { name: "E-mail marketing", icon: Mail, color: "from-violet-500 to-fuchsia-500" },
];

export function Conteudos() {
  const [stages, setStages] = useState(initialStages);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Fluxo de produção */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Fluxo de Produção de Conteúdos</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Defina as etapas pelas quais cada conteúdo passa.{" "}
              <span className="text-foreground font-medium">É obrigatório</span> marcar uma etapa como{" "}
              <span className="text-success font-medium">Aprovado</span> e outra como{" "}
              <span className="text-orange-400 font-medium">Revisão</span> — elas são acionadas automaticamente pelo portal do cliente.
            </p>
          </div>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Novo fluxo
          </Button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <Input defaultValue="Fluxo de Produção" className="max-w-md font-medium" />
            <Badge className="bg-muted text-muted-foreground border-border">Padrão</Badge>
          </div>

          <div className="rounded-xl border border-success/30 bg-success/5 p-3 flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            <span className="text-muted-foreground">
              Etapas de <span className="text-success font-medium">Aprovado</span> e{" "}
              <span className="text-orange-400 font-medium">Revisão</span> definidas — o portal do cliente moverá os cards automaticamente.
            </span>
          </div>

          {/* Pré-visualização */}
          <div className="rounded-xl border border-border bg-muted/20 p-5">
            <p className="text-xs text-muted-foreground mb-4">Pré-visualização</p>
            <div className="flex items-start justify-between gap-2 overflow-x-auto pb-2">
              {stages.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.id} className="flex flex-col items-center gap-2 min-w-[80px] flex-1">
                    <div className={`h-10 w-10 rounded-lg ${s.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-[11px] text-center text-muted-foreground line-clamp-2">{s.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editor de etapas */}
          <div className="space-y-2">
            {stages.map((s) => (
              <div key={s.id} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 transition-colors">
                <button className="cursor-grab text-muted-foreground hover:text-foreground p-1">
                  <GripVertical className="h-4 w-4" />
                </button>
                <Input value={s.name} onChange={() => {}} className="flex-1 h-9 bg-background" />
                <div className={`h-9 w-9 rounded-md ${s.color} flex items-center justify-center shrink-0`}>
                  <s.icon className="h-4 w-4 text-white" />
                </div>
                <Input value={s.status} onChange={() => {}} className="h-9 max-w-[220px] bg-background text-xs" />
                <Input
                  value={s.fn || "— sem função —"}
                  onChange={() => {}}
                  className="h-9 max-w-[160px] bg-background text-xs"
                />
                <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-3.5 w-3.5" />
                  Adicionar etapa
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restaurar padrão
                </Button>
              </div>
              <Button
                size="sm"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2"
                onClick={() => toast.success("Fluxo salvo!")}
              >
                <Save className="h-3.5 w-3.5" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tipos de conteúdo */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Tipos de conteúdo</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Defina tipos próprios para outros profissionais (podcast, e-mail, peça gráfica…) com ícone, fluxo e campos do entregável.
            </p>
          </div>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            Novo tipo
          </Button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Padrão do sistema
            </p>
            <div className="flex flex-wrap gap-2">
              {defaultTypes.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.name}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-border bg-muted/30"
                  >
                    <div className={`h-6 w-6 rounded bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-sm">{t.name}</span>
                    <Badge className="bg-muted text-muted-foreground border-0 text-[9px] h-4 px-1.5">padrão</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Personalizados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {defaultTypes.slice(0, 6).map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">0 campo(s) · social</p>
                    </div>
                    <button className="p-1.5 text-muted-foreground hover:text-foreground">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

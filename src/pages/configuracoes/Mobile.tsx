import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, GitBranch, CheckSquare, Calendar, Kanban, DollarSign, Briefcase, FileText, ClipboardList, Settings, Smartphone, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const shortcuts = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "pipelines", label: "Pipelines", icon: GitBranch },
  { id: "tarefas", label: "Tarefas", icon: CheckSquare },
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "kanban", label: "Kanban de Projetos", icon: Kanban },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "servicos", label: "Serviços", icon: Briefcase },
  { id: "contratos", label: "Contratos", icon: FileText },
  { id: "briefings", label: "Briefings", icon: ClipboardList },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

export function Mobile() {
  const [selected, setSelected] = useState<string[]>(["dashboard", "pipelines", "financeiro", "contratos"]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 4) {
      setSelected([...selected, id]);
    } else {
      toast.error("Máximo de 4 atalhos");
    }
  };

  return (
    <div className="animate-fade-in">
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Smartphone className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Menu Mobile Flutuante</h2>
            <p className="text-xs text-muted-foreground">Escolha até 4 atalhos para aparecer no menu inferior do mobile</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm font-medium">
            Atalhos selecionados <span className="text-muted-foreground">({selected.length}/4)</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {shortcuts.map((s) => {
              const Icon = s.icon;
              const isOn = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={`p-5 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    isOn
                      ? "border-primary bg-primary/10 text-primary shadow-elegant"
                      : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4 flex gap-3 items-start">
            <Lightbulb className="h-4 w-4 text-warning mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Aviso:</span> Selecione as páginas que você mais acessa para ter acesso rápido no mobile. O menu aparecerá fixo na parte inferior da tela.
            </p>
          </div>

          <Button
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-11"
            onClick={() => toast.success("Menu mobile salvo!")}
          >
            Salvar
          </Button>
        </div>
      </Card>
    </div>
  );
}

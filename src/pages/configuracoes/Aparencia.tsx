import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palette, Users, ClipboardList, FileText, Globe, Link2, CalendarClock, Image as ImageIcon, Upload, ChevronRight } from "lucide-react";

const cards = [
  { icon: Palette, title: "Aparência do Sistema", desc: "Tema, cores e tipografia da plataforma", color: "from-violet-500 to-purple-600" },
  { icon: Users, title: "Portal do Cliente", desc: "Logo, cores, login e mensagens do portal", color: "from-pink-500 to-rose-500" },
  { icon: ClipboardList, title: "Briefings", desc: "Aparência da página pública de briefing (herda do Portal do Cliente)", color: "from-blue-500 to-cyan-500" },
  { icon: FileText, title: "Contratos / Checkout", desc: "Cores, banner e textos da página de aprovação", color: "from-emerald-500 to-teal-500" },
  { icon: Globe, title: "Página Pública (Portfólio)", desc: "Estilo, blocos e SEO do portfólio", color: "from-amber-500 to-orange-500" },
  { icon: Link2, title: "Link da Bio", desc: "Tema, SEO e branding da bio", color: "from-fuchsia-500 to-pink-500" },
  { icon: CalendarClock, title: "Página de Agendamento", desc: "Marca, horários e mensagens da página de agendamento", color: "from-indigo-500 to-blue-500" },
];

export function Aparencia() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.title}
              className="group surface-card p-5 flex items-center gap-4 text-left hover:border-primary/40 hover:-translate-y-0.5 transition-all"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg shrink-0`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{c.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          );
        })}
      </div>

      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <ImageIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Favicon Global</h2>
            <p className="text-xs text-muted-foreground">
              Ícone exibido na aba do navegador em páginas públicas. Recomendado: imagem quadrada 64x64px.
            </p>
          </div>
        </div>
        <div className="p-6 space-y-2">
          <p className="text-xs font-medium">URL ou Upload</p>
          <div className="flex gap-2">
            <Input placeholder="https://... ou faça upload" className="bg-muted/40" />
            <Button variant="outline" className="gap-2 shrink-0">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

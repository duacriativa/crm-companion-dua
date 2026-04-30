import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Wallet, CreditCard, Facebook, Webhook, Clock, MessageCircle, HardDrive, Palette, Zap, Share2, Sparkles } from "lucide-react";

type Status = "connected" | "available" | "soon";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: Status;
  icon: React.ReactNode;
  iconBg: string;
  emoji?: string;
}

const integrations: Integration[] = [
  { id: "google-calendar", name: "Google Calendar", description: "Sincronize sua agenda", status: "available", icon: <Calendar className="h-6 w-6 text-white" />, iconBg: "from-blue-500 to-blue-600" },
  { id: "asaas", name: "Asaas", description: "Boletos, PIX e cobranças", status: "connected", emoji: "🦋", icon: null, iconBg: "from-blue-400 to-cyan-400" },
  { id: "abacatepay", name: "AbacatePay", description: "PIX automático", status: "available", emoji: "🥑", icon: null, iconBg: "from-green-500 to-emerald-600" },
  { id: "mercado-pago", name: "Mercado Pago", description: "Gateway de pagamento", status: "available", icon: <Wallet className="h-6 w-6 text-white" />, iconBg: "from-sky-400 to-blue-500" },
  { id: "meta-pixel", name: "Meta Pixel", description: "Tracking de conversões", status: "available", icon: <Facebook className="h-6 w-6 text-white" />, iconBg: "from-blue-600 to-blue-700" },
  { id: "webhooks", name: "Webhooks", description: "Receba eventos do CRM", status: "connected", icon: <Webhook className="h-6 w-6 text-white" />, iconBg: "from-purple-500 to-pink-500" },
  { id: "agendamento", name: "Agendamento", description: "Página pública de booking", status: "connected", icon: <Clock className="h-6 w-6 text-white" />, iconBg: "from-orange-500 to-red-500" },
  { id: "whatsapp", name: "WhatsApp", description: "Atendimento e disparo", status: "available", icon: <MessageCircle className="h-6 w-6 text-white" />, iconBg: "from-green-500 to-green-600" },
  { id: "stripe", name: "Stripe", description: "Pagamentos internacionais", status: "soon", icon: <CreditCard className="h-6 w-6 text-white" />, iconBg: "from-violet-500 to-indigo-600" },
  { id: "google-drive", name: "Google Drive", description: "Anexe arquivos da nuvem", status: "soon", icon: <HardDrive className="h-6 w-6 text-white" />, iconBg: "from-yellow-500 to-orange-500" },
  { id: "figma", name: "Figma", description: "Importe designs", status: "soon", icon: <Palette className="h-6 w-6 text-white" />, iconBg: "from-pink-500 to-rose-500" },
  { id: "slack", name: "Slack", description: "Notificações no canal", status: "soon", icon: <Share2 className="h-6 w-6 text-white" />, iconBg: "from-purple-600 to-fuchsia-600" },
  { id: "zapier", name: "Zapier", description: "Conecte +5000 apps", status: "soon", icon: <Zap className="h-6 w-6 text-white" />, iconBg: "from-orange-500 to-amber-500" },
  { id: "behance", name: "Behance", description: "Publique no portfólio", status: "soon", icon: <Share2 className="h-6 w-6 text-white" />, iconBg: "from-blue-500 to-indigo-500" },
];

interface Props {
  onSelect: (id: string) => void;
}

export function Integracoes({ onSelect }: Props) {
  const [filter, setFilter] = useState<"todas" | "conectadas" | "disponiveis" | "em-breve">("todas");

  const filtered = integrations.filter((i) => {
    if (filter === "todas") return true;
    if (filter === "conectadas") return i.status === "connected";
    if (filter === "disponiveis") return i.status === "available";
    return i.status === "soon";
  });

  const counts = {
    todas: integrations.length,
    conectadas: integrations.filter((i) => i.status === "connected").length,
    disponiveis: integrations.filter((i) => i.status === "available").length,
    "em-breve": integrations.filter((i) => i.status === "soon").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {(["todas", "conectadas", "disponiveis", "em-breve"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary shadow-elegant"
                : "bg-muted/40 text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground/30"
            }`}
          >
            {f === "todas" ? "Todas" : f === "conectadas" ? "Conectadas" : f === "disponiveis" ? "Disponíveis" : "Em breve"}
            <span className="ml-1.5 opacity-60">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {filtered.map((integration) => {
          const isSoon = integration.status === "soon";
          const isConnected = integration.status === "connected";

          return (
            <button
              key={integration.id}
              onClick={() => !isSoon && onSelect(integration.id)}
              disabled={isSoon}
              className={`group relative aspect-square rounded-2xl border p-4 flex flex-col items-center justify-center gap-3 transition-all text-center ${
                isConnected
                  ? "border-success/40 bg-gradient-to-br from-success/10 to-transparent hover:border-success/70"
                  : isSoon
                  ? "border-border bg-muted/20 opacity-60 cursor-not-allowed"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-elegant hover:-translate-y-0.5 cursor-pointer"
              }`}
            >
              {isConnected && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-success flex items-center justify-center">
                  <Check className="h-3 w-3 text-success-foreground" strokeWidth={3} />
                </div>
              )}
              {isSoon && (
                <Badge className="absolute top-2 right-2 bg-muted text-muted-foreground border-border text-[10px] px-1.5 py-0 h-5">
                  Em breve
                </Badge>
              )}

              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${integration.iconBg} flex items-center justify-center shadow-lg ${isSoon ? "grayscale" : ""}`}>
                {integration.emoji ? (
                  <span className="text-2xl">{integration.emoji}</span>
                ) : (
                  integration.icon
                )}
              </div>
              <div className="space-y-0.5 min-w-0 w-full">
                <p className="text-sm font-semibold truncate">{integration.name}</p>
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                  {integration.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Suggest */}
      <Card className="surface-card p-6 text-center">
        <Sparkles className="h-6 w-6 text-primary mx-auto mb-2" />
        <p className="font-semibold">Não encontrou a integração que precisa?</p>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Envie sua sugestão e nossa equipe avaliará para futuras versões
        </p>
        <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
          Sugerir Integração
        </Button>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Settings,
  Users,
  Zap,
  Bell,
  BellOff,
  Paperclip,
  Smile,
  Mic,
  Send,
  Sparkles,
  PanelRightClose,
} from "lucide-react";

const filters = ["Todas", "Não lidas", "Favoritas", "Grupos"];

const conversations = [
  { id: 1, name: "lua 🌙", phone: "+55 (85) 98884-4312", time: "17:33", unread: 0, online: true, group: false },
  { id: 2, name: "Tchu.bi + Dua 💜", phone: "Grupo", time: "17:33", unread: 0, online: false, group: true, active: true },
  { id: 3, name: "AYA - mkt dua", phone: "Grupo", time: "17:25", unread: 2, online: true, group: true },
  { id: 4, name: "Team Tráfego - Dua", phone: "Grupo", time: "17:16", unread: 2, online: true, group: true },
  { id: 5, name: "Doce Caju - ADS", phone: "Grupo", time: "17:00", unread: 0, online: true, group: true },
  { id: 6, name: "Dua - ISA + ALEXIA", phone: "Grupo", time: "16:41", unread: 2, online: false, group: true },
  { id: 7, name: "ADS PERFORMANCE", phone: "Grupo", time: "15:35", unread: 2, online: false, group: true },
  { id: 8, name: "Alexia + Ciane + Lua", phone: "Grupo", time: "15:35", unread: 2, online: false, group: true },
];

const messages = [
  { from: "them", author: "Lucas Sabino", text: "Valor da camisa gio está errado", time: "17:30" },
  { from: "them", author: "Lucas Sabino", text: "Valor da blusa gio está errado", time: "17:31" },
  { from: "them", author: "Lucas Sabino", text: "@152897245458643", time: "17:31" },
  { from: "me", text: "Mais algum ajuste?", time: "17:31" },
  { from: "me", text: "Já peço para corrigir tudo aqui, é que temos que deixar pronto logo, pq amanhã é feriado.", time: "17:32" },
  { from: "them", author: "Lucas Sabino", text: "Valor correto 85,00 camisa gio", time: "17:32" },
  { from: "me", text: "o do atacado reduzido também.", time: "17:28" },
];

export default function WhatsApp() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [muted, setMuted] = useState(false);

  return (
    <div className="h-[calc(100vh-4rem)] flex animate-fade-in">
      {/* Conversations list */}
      <aside className="w-80 lg:w-96 border-r border-border flex flex-col bg-card/30">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">WhatsApp</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Automações
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Users className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversa…" className="pl-9 bg-muted/50" />
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFilter === f
                    ? "bg-success/15 text-success border border-success/30"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                }`}
              >
                {f}{" "}
                {f === "Não lidas" && <span className="ml-1 opacity-70">20</span>}
                {f === "Grupos" && <span className="ml-1 opacity-70">21</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`w-full flex items-center gap-3 p-3 hover:bg-muted/40 transition-colors text-left border-l-2 ${
                c.active ? "bg-muted/50 border-l-primary" : "border-l-transparent"
              }`}
            >
              <div className="relative shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {c.name[0]}
                </div>
                {c.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.phone}</p>
              </div>
              {c.unread > 0 && (
                <span className="h-5 min-w-5 px-1.5 rounded-full bg-success text-success-foreground text-xs font-semibold flex items-center justify-center">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <section className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center gap-3 px-4">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
            T
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Tchu.bi + Dua 💜</p>
            <p className="text-xs text-muted-foreground">Grupo • 6 participantes</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PanelRightClose className="h-4 w-4" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.05),_transparent_50%)]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                  m.from === "me"
                    ? "bg-success/15 border border-success/30 rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm"
                }`}
              >
                {m.from === "them" && m.author && (
                  <p className="text-xs font-semibold text-primary mb-0.5">{m.author}</p>
                )}
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p className="text-[10px] text-muted-foreground text-right mt-1">{m.time} ✓</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-card/30">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 text-primary">
              <Sparkles className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Digite uma mensagem…"
              className="flex-1 bg-muted/50 border-border focus-visible:ring-primary"
            />
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-9 w-9 shrink-0 bg-gradient-primary text-primary-foreground hover:opacity-90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Members panel */}
      <aside className="w-72 border-l border-border bg-card/30 hidden xl:flex flex-col">
        <div className="p-6 text-center border-b border-border">
          <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto shadow-glow">
            T
          </div>
          <p className="font-semibold mt-3">Tchu.bi + Dua 💜</p>
          <p className="text-xs text-muted-foreground">6 participantes</p>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Membros do grupo
          </p>
          <div className="space-y-2">
            {[
              { name: "@cianeviana", color: "bg-blue-500/20 text-blue-300" },
              { name: "Ariela Cruz", color: "bg-pink-500/20 text-pink-300" },
              { name: "Camila Vieira", color: "bg-amber-500/20 text-amber-300" },
              { name: "INGRID MAXIMO", color: "bg-emerald-500/20 text-emerald-300" },
              { name: "Isadora Coelho", color: "bg-purple-500/20 text-purple-300" },
              { name: "Lucas Sabino", color: "bg-rose-500/20 text-rose-300" },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 cursor-pointer">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold ${m.color}`}>
                  {m.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-sm">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-border">
          <Badge className="w-full justify-center bg-primary/10 text-primary border-primary/20">
            ✨ Resumo IA disponível
          </Badge>
        </div>
      </aside>
    </div>
  );
}

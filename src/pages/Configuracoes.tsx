import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Copy,
  Check,
  Info,
  AlertTriangle,
  ExternalLink,
  UserPlus,
  PlayCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const tabs = [
  "Perfil", "Aparência", "Atualizações", "Assinatura", "Mobile",
  "Notificações", "Automações", "Integrações", "Conteúdos",
];

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("Integrações");
  const [showKey, setShowKey] = useState(false);
  const [environment, setEnvironment] = useState<"sandbox" | "producao">("producao");
  const [active, setActive] = useState(true);
  const [nfActive, setNfActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const webhookUrl = "https://rdwhwzrgsixouaehlszc.supabase.co/functions/v1/asaas-webhook";

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    toast.success("URL copiada!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Personalize sua experiência no Dua CRM</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-muted/40 border border-border overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === t
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Voltar para integrações
      </button>

      <Card className="surface-card overflow-hidden">
        {/* Header */}
        <div className="p-6 flex items-center gap-4 border-b border-border">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-2xl">
            🦋
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">Asaas</h2>
              <Badge className="bg-success/15 text-success border-success/30">
                <Check className="h-3 w-3 mr-1" /> Conectado
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Emita boletos e receba PIX direto no seu financeiro
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Tutorial section */}
          <div>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-primary" />
              Tutorial de Configuração
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20 border border-border flex items-center justify-center relative overflow-hidden cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-glow opacity-50" />
                <div className="relative h-16 w-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="h-8 w-8 text-primary" />
                </div>
                <p className="absolute bottom-4 left-4 text-sm font-semibold">
                  Tutorial Integração ASAAS + Dua CRM
                </p>
              </div>
              <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div className="text-sm leading-relaxed">
                  <span className="font-semibold">Importante:</span> O Asaas agora exige a geração do token ao criar o webhook. Ao configurar, clique em <span className="font-semibold">"Gerar"</span> o token e <span className="font-semibold">copie no campo abaixo</span> (Token do Webhook).
                </div>
              </div>
            </div>
          </div>

          {/* CTA new account */}
          <Card className="border border-border bg-muted/30 p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Ainda não tem conta no Asaas?</p>
              <p className="text-xs text-muted-foreground">Crie sua conta gratuitamente e comece a receber</p>
            </div>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2">
              <UserPlus className="h-4 w-4" />
              Criar Conta
            </Button>
          </Card>

          {/* Info */}
          <div className="rounded-xl border border-border bg-muted/20 p-4 flex items-start gap-3 text-sm">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground leading-relaxed">
              Para obter sua API Key, acesse o painel do Asaas em{" "}
              <a href="https://asaas.com" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                asaas.com <ExternalLink className="h-3 w-3" />
              </a>
              {" "}→ Configurações → Integrações → Chave de API
            </p>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">API Key</Label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                defaultValue="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                className="pr-10 bg-muted/50 font-mono text-xs"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Environment */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
            <div>
              <p className="text-sm font-medium">Ambiente</p>
              <p className="text-xs text-muted-foreground">
                {environment === "producao" ? "Produção - cobranças reais" : "Sandbox - modo de teste"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${environment === "sandbox" ? "text-foreground" : "text-muted-foreground"}`}>
                Sandbox
              </span>
              <Switch
                checked={environment === "producao"}
                onCheckedChange={(c) => setEnvironment(c ? "producao" : "sandbox")}
              />
              <span className={`text-xs font-medium ${environment === "producao" ? "text-primary" : "text-muted-foreground"}`}>
                Produção
              </span>
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
            <div>
              <p className="text-sm font-medium">Integração Ativa</p>
              <p className="text-xs text-muted-foreground">Habilita/desabilita a geração de cobranças</p>
            </div>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>

          {/* Webhook URL */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">URL do Webhook (configure no Asaas)</Label>
            <div className="flex gap-2">
              <Input value={webhookUrl} readOnly className="bg-muted/50 font-mono text-xs" />
              <Button variant="outline" size="icon" onClick={copyWebhook} className="shrink-0">
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Webhook token */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Token do Webhook (gerado pelo Asaas)</Label>
            <Input
              defaultValue="whsec_aqRQDvDsDJBSRsevXDMJX_UTOuoSJmbugGh0T5dbP9g"
              className="bg-muted/50 font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Ao criar o webhook no Asaas, ele gera um token de autenticação. Cole-o aqui para validar as notificações.
            </p>
          </div>

          {/* Setup guide */}
          <Card className="border border-border bg-muted/20 p-5">
            <div className="flex gap-3">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Como configurar no Asaas:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground leading-relaxed">
                  <li>Vá em <span className="text-foreground font-medium">Integrações → Webhooks → Novo webhook</span></li>
                  <li>Nome: <span className="text-foreground font-medium">Dua CRM</span></li>
                  <li>Cole a URL acima</li>
                  <li>Versão da API: <span className="text-foreground font-medium">V3</span></li>
                  <li>Fila de sincronização: <span className="text-foreground font-medium">Ativada</span></li>
                  <li>Tipo de envio: <span className="text-foreground font-medium">Não sequencial</span></li>
                  <li>
                    Ative <span className="text-foreground font-medium">todos os eventos</span> de:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                      <li>Cobranças (pagamento confirmado, vencido, etc.)</li>
                      <li>Assinaturas (criada, renovada, cancelada)</li>
                      <li>PIX automático (transferência recebida)</li>
                    </ul>
                  </li>
                  <li>Clique em <span className="text-foreground font-medium">Salvar</span></li>
                  <li><span className="text-foreground font-medium">Copie o token gerado</span> e cole no campo acima</li>
                  <li>Marque o webhook como <span className="text-foreground font-medium">Ativo</span></li>
                </ol>
              </div>
            </div>
          </Card>

          {/* NF */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Emissão de Nota Fiscal</p>
                <p className="text-xs text-muted-foreground">Emitir NF automaticamente ao criar cobranças</p>
              </div>
            </div>
            <Switch checked={nfActive} onCheckedChange={setNfActive} />
          </div>

          <Button
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-12 text-base font-semibold"
            onClick={() => toast.success("Configuração atualizada!")}
          >
            Atualizar Configuração
          </Button>
        </div>
      </Card>
    </div>
  );
}

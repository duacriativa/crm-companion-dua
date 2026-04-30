import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building2, Globe, Shield, Mail, DollarSign, Eye, EyeOff, Lightbulb, RotateCw } from "lucide-react";
import { toast } from "sonner";

export function Perfil() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Perfil */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Perfil</h2>
            <p className="text-xs text-muted-foreground">Informações pessoais e profissionais</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Foto */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Foto de Perfil</Label>
              <span className="text-xs text-muted-foreground">400x400px recomendado</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-elegant">
                D
              </div>
              <div className="space-y-1">
                <Button variant="outline" size="sm">Alterar Foto</Button>
                <p className="text-xs text-muted-foreground">PNG, JPG até 5MB. Você poderá ajustar o recorte e a cor de fundo.</p>
              </div>
            </div>
          </div>

          {/* Idioma */}
          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Idioma</p>
                <p className="text-xs text-muted-foreground">Selecione o idioma da plataforma</p>
              </div>
            </div>
            <Select defaultValue="pt-BR">
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">🇧🇷 Português</SelectItem>
                <SelectItem value="en-US">🇺🇸 English</SelectItem>
                <SelectItem value="es-ES">🇪🇸 Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div className="rounded-xl border border-border bg-muted/20 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email da conta</p>
              <p className="text-sm font-medium truncate">dw.wendell@gmail.com</p>
            </div>
          </div>

          {/* Dados pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Nome Completo *</Label>
              <Input defaultValue="Daniel Guedes" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs flex items-center gap-1.5">
                <Building2 className="h-3 w-3" /> Nome da Empresa
              </Label>
              <Input defaultValue="Dua Criativa" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Telefone *</Label>
              <Input defaultValue="+55 (85) 98459-5286" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">CPF/CNPJ *</Label>
              <Input placeholder="000.000.000-00" />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Endereço *</Label>
                <Input defaultValue="Avenida Santos Dumont" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Número *</Label>
                <Input placeholder="123" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Bairro</Label>
                <Input defaultValue="Papicu" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Cidade *</Label>
                <Input defaultValue="Fortaleza" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Estado *</Label>
                <Input defaultValue="CE" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">CEP *</Label>
                <Input defaultValue="60175-047" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">País *</Label>
              <Input defaultValue="BR" />
            </div>
          </div>

          {/* Moeda */}
          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Moeda</p>
                <p className="text-xs text-muted-foreground">Moeda padrão para exibição de valores</p>
              </div>
            </div>
            <Select defaultValue="BRL">
              <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">R$ BRL — Real Brasileiro</SelectItem>
                <SelectItem value="USD">$ USD — Dólar Americano</SelectItem>
                <SelectItem value="EUR">€ EUR — Euro</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-primary flex items-center gap-1.5">
              <Lightbulb className="h-3 w-3" /> Moeda detectada automaticamente pelo país
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant h-11"
              onClick={() => toast.success("Perfil atualizado!")}
            >
              Salvar
            </Button>
            <Button variant="outline" className="h-11 gap-2">
              <RotateCw className="h-4 w-4" />
              Reiniciar Tour
            </Button>
          </div>
        </div>
      </Card>

      {/* Segurança */}
      <Card className="surface-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Segurança</h2>
            <p className="text-xs text-muted-foreground">Proteção da sua conta</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm font-medium">Alterar Senha</p>
            <p className="text-xs text-muted-foreground mt-0.5">Digite sua senha atual e a nova senha.</p>
          </div>

          {[
            { ph: "Senha atual", show: showCurrent, set: setShowCurrent },
            { ph: "Nova senha", show: showNew, set: setShowNew },
            { ph: "Confirmar nova senha", show: showConfirm, set: setShowConfirm },
          ].map((f) => (
            <div key={f.ph} className="relative">
              <Input type={f.show ? "text" : "password"} placeholder={f.ph} className="pr-10" />
              <button
                onClick={() => f.set(!f.show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {f.show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() => toast.success("Senha atualizada!")}
            className="border-primary/40 text-primary hover:bg-primary/10"
          >
            Atualizar Senha
          </Button>
        </div>
      </Card>
    </div>
  );
}

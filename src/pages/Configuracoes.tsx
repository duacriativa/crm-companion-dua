import { useState } from "react";
import { Integracoes } from "./configuracoes/Integracoes";
import { AsaasConfig } from "./configuracoes/AsaasConfig";
import { Perfil } from "./configuracoes/Perfil";
import { Aparencia } from "./configuracoes/Aparencia";
import { Atualizacoes } from "./configuracoes/Atualizacoes";
import { Assinatura } from "./configuracoes/Assinatura";
import { Mobile } from "./configuracoes/Mobile";
import { Notificacoes } from "./configuracoes/Notificacoes";
import { Automacoes } from "./configuracoes/Automacoes";
import { Conteudos } from "./configuracoes/Conteudos";
import { toast } from "sonner";

const tabs = [
  "Perfil", "Aparência", "Atualizações", "Assinatura", "Mobile",
  "Notificações", "Automações", "Integrações", "Conteúdos",
];

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("Integrações");
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleSelectIntegration = (id: string) => {
    if (id === "asaas") {
      setSelectedIntegration("asaas");
    } else {
      toast.info("Em breve: configuração desta integração");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Personalize sua experiência no Dua CRM</p>
      </header>

      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-muted/40 border border-border overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setActiveTab(t);
              setSelectedIntegration(null);
            }}
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

      {activeTab === "Perfil" && <Perfil />}
      {activeTab === "Aparência" && <Aparencia />}
      {activeTab === "Atualizações" && <Atualizacoes />}
      {activeTab === "Assinatura" && <Assinatura />}
      {activeTab === "Mobile" && <Mobile />}
      {activeTab === "Notificações" && <Notificacoes />}
      {activeTab === "Automações" && <Automacoes />}
      {activeTab === "Conteúdos" && <Conteudos />}
      {activeTab === "Integrações" && (
        selectedIntegration === "asaas" ? (
          <AsaasConfig onBack={() => setSelectedIntegration(null)} />
        ) : (
          <Integracoes onSelect={handleSelectIntegration} />
        )
      )}
    </div>
  );
}

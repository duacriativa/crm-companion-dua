import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{title}</h1>
      <Card className="surface-card p-12 text-center">
        <div className="h-16 w-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center shadow-glow mb-4">
          <Construction className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Em breve</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Esta seção está em desenvolvimento. Continue iterando para construirmos juntos.
        </p>
      </Card>
    </div>
  );
}

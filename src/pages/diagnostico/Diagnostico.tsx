import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DiagnosticModal } from '@/components/diagnostic/DiagnosticModal';

export default function Diagnostico() {
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const handleStartDiagnostic = () => {
    setShowDiagnostic(true);
  };

  const handleCloseDiagnostic = () => {
    if (window.confirm('Tem certeza que deseja sair do diagnóstico? Todo o progresso será perdido.')) {
      setShowDiagnostic(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-12 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Bem-vindo ao Diagnóstico Financeiro
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Aqui você poderá realizar uma análise completa da saúde financeira da sua empresa. 
            Nosso diagnóstico abrange diversos aspectos como liquidez, endividamento, rentabilidade 
            e eficiência operacional, fornecendo insights valiosos para a tomada de decisões.
          </p>

          <div className="pt-6">
            <Button size="lg" className="gap-2" onClick={handleStartDiagnostic}>
              Iniciar Diagnóstico
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDiagnostic && <DiagnosticModal onClose={handleCloseDiagnostic} />}
    </div>
  );
}
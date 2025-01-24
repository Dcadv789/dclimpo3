import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Download } from 'lucide-react';

export default function Diagnostico() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Diagnóstico Financeiro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações da Empresa</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Razão Social</Label>
                <Input placeholder="Digite a razão social" />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input placeholder="00.000.000/0000-00" />
              </div>
              <div className="space-y-2">
                <Label>Setor de Atuação</Label>
                <Input placeholder="Ex: Tecnologia, Varejo, etc" />
              </div>
              <div className="space-y-2">
                <Label>Tempo de Mercado</Label>
                <Input placeholder="Ex: 5 anos" />
              </div>
            </div>
          </div>

          {/* Upload de Documentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documentos Necessários</h3>
            <div className="grid gap-4">
              <div className="p-6 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <Upload className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium mb-1">Balanço Patrimonial</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Arraste o arquivo ou clique para selecionar
                    </p>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <Upload className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium mb-1">DRE</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Arraste o arquivo ou clique para selecionar
                    </p>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Observações Adicionais</h3>
            <Textarea 
              placeholder="Digite aqui quaisquer informações adicionais relevantes para o diagnóstico..."
              className="min-h-[100px]"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">
              Salvar Rascunho
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Iniciar Diagnóstico
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
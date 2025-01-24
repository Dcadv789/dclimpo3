import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, Calculator, BarChart3, Save } from 'lucide-react';

export default function BackOffice() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BackOffice Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="indices">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="indices">
                <Calculator className="h-4 w-4 mr-2" />
                Índices Financeiros
              </TabsTrigger>
              <TabsTrigger value="analise">
                <BarChart3 className="h-4 w-4 mr-2" />
                Análise Vertical/Horizontal
              </TabsTrigger>
              <TabsTrigger value="projecoes">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Projeções
              </TabsTrigger>
            </TabsList>

            <TabsContent value="indices" className="space-y-6">
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Índices de Liquidez</h3>
                  <div className="space-y-2">
                    <Label>Liquidez Corrente</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Liquidez Seca</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Liquidez Imediata</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Índices de Endividamento</h3>
                  <div className="space-y-2">
                    <Label>Endividamento Geral</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Composição do Endividamento</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Imobilização do PL</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Índices de Rentabilidade</h3>
                  <div className="space-y-2">
                    <Label>Margem Líquida</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>ROE</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>ROA</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Índices de Atividade</h3>
                  <div className="space-y-2">
                    <Label>PMR</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>PMP</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Giro do Ativo</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analise" className="space-y-6">
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Análise Vertical</h3>
                  <div className="space-y-2">
                    <Label>Ativo Circulante (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ativo Não Circulante (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Passivo Circulante (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Passivo Não Circulante (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Patrimônio Líquido (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Análise Horizontal</h3>
                  <div className="space-y-2">
                    <Label>Variação Ativo Total (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Variação Receita Líquida (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Variação Lucro Líquido (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Variação PL (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Variação Capital de Giro (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projecoes" className="space-y-6">
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Projeções de Crescimento</h3>
                  <div className="space-y-2">
                    <Label>Crescimento Receita (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Crescimento Custos (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Crescimento Despesas (%)</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Projeções de Investimento</h3>
                  <div className="space-y-2">
                    <Label>CAPEX Projetado</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Capital de Giro Necessário</Label>
                    <Input type="number" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label>Necessidade de Financiamento</Label>
                    <Input type="number" step="0.01" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">
              Limpar Dados
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salvar Análise
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
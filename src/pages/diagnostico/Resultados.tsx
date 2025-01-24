import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer, Send } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Resultados() {
  return (
    <div className="space-y-6">
      {/* Resumo do Diagnóstico */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Resultados do Diagnóstico Financeiro</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Enviar por E-mail
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Saúde Financeira</h3>
                  <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-green-100 text-green-700 mb-2">
                    <span className="text-2xl font-bold">A+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Excelente situação financeira</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Risco</h3>
                  <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-yellow-100 text-yellow-700 mb-2">
                    <span className="text-2xl font-bold">B</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Risco moderado</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Crescimento</h3>
                  <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-blue-100 text-blue-700 mb-2">
                    <span className="text-2xl font-bold">A</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Alto potencial de crescimento</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Indicadores */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Indicador</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead>Situação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Liquidez Corrente</TableCell>
                  <TableCell>2.5</TableCell>
                  <TableCell>&gt; 1.0</TableCell>
                  <TableCell className="text-green-600">Ótimo</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Endividamento Geral</TableCell>
                  <TableCell>45%</TableCell>
                  <TableCell>&lt; 60%</TableCell>
                  <TableCell className="text-green-600">Bom</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Margem Líquida</TableCell>
                  <TableCell>12%</TableCell>
                  <TableCell>&gt; 10%</TableCell>
                  <TableCell className="text-green-600">Ótimo</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ROE</TableCell>
                  <TableCell>18%</TableCell>
                  <TableCell>&gt; 15%</TableCell>
                  <TableCell className="text-green-600">Ótimo</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ciclo Operacional</TableCell>
                  <TableCell>75 dias</TableCell>
                  <TableCell>&lt; 90 dias</TableCell>
                  <TableCell className="text-green-600">Bom</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Recomendações */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recomendações</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Pontos Fortes</h4>
                <ul className="list-disc list-inside text-green-700 dark:text-green-400 text-sm space-y-1">
                  <li>Excelente liquidez e capacidade de pagamento</li>
                  <li>Boa rentabilidade e retorno sobre investimento</li>
                  <li>Gestão eficiente do capital de giro</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Pontos de Atenção</h4>
                <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-400 text-sm space-y-1">
                  <li>Considerar diversificação das fontes de receita</li>
                  <li>Monitorar o prazo médio de recebimento</li>
                  <li>Avaliar oportunidades de redução de custos operacionais</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Oportunidades de Melhoria</h4>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 text-sm space-y-1">
                  <li>Investir em expansão da capacidade produtiva</li>
                  <li>Explorar novos mercados e segmentos</li>
                  <li>Implementar programa de redução de despesas administrativas</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
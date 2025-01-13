import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileBox, Calendar, Filter, Plus, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimeFilter = 'today' | 'week' | 'month' | 'all';
type NoteStatus = 'draft' | 'saved';

interface Note {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  listId: string;
  createdAt: string;
  updatedAt: string;
}

export default function NotesDashboard() {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  
  // Get notes from localStorage
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Calculate statistics
  const totalNotes = notes.length;
  const draftNotes = notes.filter(note => note.status === 'draft').length;
  const savedNotes = notes.filter(note => note.status === 'saved').length;
  const saveRate = totalNotes > 0 ? Math.round((savedNotes / totalNotes) * 100) : 0;

  // Get recent notes
  const getRecentNotes = () => {
    const sortedNotes = [...notes].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    return sortedNotes.slice(0, 3);
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Notas
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              Todas as notas criadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Notas Salvas
            </CardTitle>
            <FileBox className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedNotes}</div>
            <p className="text-xs text-green-600">
              {saveRate}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rascunhos
            </CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftNotes}</div>
            <p className="text-xs text-yellow-600">
              {100 - saveRate}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média por Lista
            </CardTitle>
            <Filter className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalNotes > 0 ? Math.round(totalNotes / 3) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Notas por lista
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notas Recentes</CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mês</SelectItem>
                  <SelectItem value="all">Todo o Período</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => navigate('/tasks/history')}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Nota
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getRecentNotes().map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => navigate('/tasks/history')}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{note.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      note.status === 'saved' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {note.status === 'saved' ? 'Salva' : 'Rascunho'}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {note.content}
                </p>
                <div className="flex items-center justify-end mt-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Ver mais <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {notes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Nenhuma nota criada</p>
                <p className="text-sm mb-4">Comece criando sua primeira nota</p>
                <Button onClick={() => navigate('/tasks/history')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Nova Nota
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
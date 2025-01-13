import { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronRight, ListFilter, Save, FileText } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FilterType = 'all' | 'draft' | 'saved';
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

export default function Notes() {
  const { taskLists, selectedList, selectList, addTaskList } = useTasks();
  const { addNotification } = useNotifications();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false);
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);
  const [showDeleteNoteDialog, setShowDeleteNoteDialog] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim()) {
      addTaskList(newListName);
      setNewListName('');
      setShowNewListDialog(false);
      
      addNotification(
        'task',
        'created',
        'Nova lista criada',
        `A lista "${newListName}" foi criada com sucesso.`
      );
    }
  };

  const handleAddNote = (status: NoteStatus = 'draft') => {
    if (selectedList && (noteTitle.trim() || noteContent.trim())) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: noteTitle.trim() || 'Sem título',
        content: noteContent,
        status,
        listId: selectedList.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes(prev => [newNote, ...prev]);
      setNoteTitle('');
      setNoteContent('');
      setShowNewNoteDialog(false);
      
      addNotification(
        'note',
        status === 'draft' ? 'created' : 'saved',
        status === 'draft' ? 'Rascunho criado' : 'Nota salva',
        `A nota "${noteTitle || 'Sem título'}" foi ${status === 'draft' ? 'salva como rascunho' : 'salva'}.`
      );
    }
  };

  const handleEditNote = (status: NoteStatus = 'draft') => {
    if (selectedNote && selectedList) {
      setNotes(prev => prev.map(note => 
        note.id === selectedNote.id
          ? {
              ...note,
              title: noteTitle.trim() || 'Sem título',
              content: noteContent,
              status,
              updatedAt: new Date().toISOString()
            }
          : note
      ));
      setShowEditNoteDialog(false);
      setSelectedNote(null);
      
      addNotification(
        'note',
        'saved',
        'Nota atualizada',
        `A nota "${noteTitle || 'Sem título'}" foi atualizada com sucesso.`
      );
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      setNotes(prev => prev.filter(note => note.id !== selectedNote.id));
      setShowDeleteNoteDialog(false);
      setSelectedNote(null);
      
      addNotification(
        'note',
        'created',
        'Nota excluída',
        `A nota "${selectedNote.title}" foi excluída com sucesso.`
      );
    }
  };

  const filteredNotes = notes.filter(note => {
    if (!selectedList || selectedList.id === 'all') {
      return filter === 'all' ? true : note.status === filter;
    }
    return note.listId === selectedList.id && (filter === 'all' ? true : note.status === filter);
  }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="flex gap-6">
      {/* Lists Sidebar */}
      <div className="w-80 bg-white dark:bg-[#1C1C1C] rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Bloco de Notas</h2>
          <Button size="sm" onClick={() => setShowNewListDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Lista
          </Button>
        </div>

        <div className="space-y-2">
          <div
            className={cn(
              "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
              !selectedList || selectedList.id === 'all'
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
            onClick={() => selectList({ id: 'all', name: 'Todas as Listas', tasks: [] })}
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              <span>Todas as Listas</span>
            </div>
          </div>

          {taskLists.map(list => (
            <div
              key={list.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                selectedList?.id === list.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
              onClick={() => selectList(list)}
            >
              <div className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                <span>{list.name}</span>
                <span className="text-sm text-gray-400">
                  ({notes.filter(note => note.listId === list.id).length})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Content */}
      <div className="flex-1 bg-white dark:bg-[#1C1C1C] rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {selectedList ? selectedList.id === 'all' ? 'Todas as Notas' : `Notas - ${selectedList.name}` : 'Selecione uma lista'}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              <ListFilter className="h-4 w-4 mr-2" />
              Todas
            </Button>
            <Button
              variant={filter === 'draft' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('draft')}
            >
              Rascunhos
            </Button>
            <Button
              variant={filter === 'saved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('saved')}
            >
              Salvas
            </Button>
            {selectedList && selectedList.id !== 'all' && (
              <Button onClick={() => setShowNewNoteDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Nota
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(note.updatedAt).toLocaleString('pt-BR')} - 
                    {note.status === 'draft' ? ' Rascunho' : ' Salva'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedNote(note);
                      setNoteTitle(note.title);
                      setNoteContent(note.content);
                      setShowEditNoteDialog(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      setSelectedNote(note);
                      setShowDeleteNoteDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          ))}

          {filteredNotes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhuma nota encontrada</p>
              <p className="text-sm">
                {selectedList && selectedList.id !== 'all'
                  ? 'Clique em "Nova Nota" para começar'
                  : 'Selecione uma lista e crie uma nova nota'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New List Dialog */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Lista</DialogTitle>
          </DialogHeader>
          <Input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Nome da lista..."
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewListDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddList}>
              Criar Lista
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New/Edit Note Dialog */}
      <Dialog open={showNewNoteDialog || showEditNoteDialog} onOpenChange={(open) => {
        if (!open) {
          setShowNewNoteDialog(false);
          setShowEditNoteDialog(false);
          setNoteTitle('');
          setNoteContent('');
          setSelectedNote(null);
        }
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {showEditNoteDialog ? 'Editar Nota' : 'Nova Nota'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Título da nota..."
            />
            <Textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Conteúdo da nota..."
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => {
              setShowNewNoteDialog(false);
              setShowEditNoteDialog(false);
              setNoteTitle('');
              setNoteContent('');
              setSelectedNote(null);
            }}>
              Cancelar
            </Button>
            <Button variant="outline" onClick={() => {
              if (showEditNoteDialog) {
                handleEditNote('draft');
              } else {
                handleAddNote('draft');
              }
            }}>
              Salvar como Rascunho
            </Button>
            <Button onClick={() => {
              if (showEditNoteDialog) {
                handleEditNote('saved');
              } else {
                handleAddNote('saved');
              }
            }}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Nota
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Note Dialog */}
      <AlertDialog open={showDeleteNoteDialog} onOpenChange={setShowDeleteNoteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta nota? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
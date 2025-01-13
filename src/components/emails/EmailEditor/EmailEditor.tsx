// ... imports existentes ...
import { useNotifications } from '@/contexts/NotificationContext';

export function EmailEditor({ onSave, onSend, initialData }: EmailEditorProps) {
  // ... outros hooks ...
  const { addNotification } = useNotifications();

  const handleEmailSubmit = (data: EmailData) => {
    setEmailData(data);
    setShowPreview(true);
    
    // Adiciona notificação
    addNotification(
      'email',
      'created',
      'E-mail criado',
      'O e-mail foi criado e está pronto para visualização.'
    );
  };

  const handleSave = async () => {
    if (!emailData) return;

    try {
      // ... lógica existente ...
      
      // Adiciona notificação
      addNotification(
        'email',
        'saved',
        'E-mail salvo',
        'O e-mail foi salvo com sucesso no histórico.'
      );
      
      // ... resto do código ...
    } catch (error) {
      // Adiciona notificação de erro
      addNotification(
        'email',
        'saved',
        'Erro ao salvar',
        'Ocorreu um erro ao tentar salvar o e-mail.'
      );
    }
  };

  const handleSaveAndSend = async () => {
    if (!emailData) return;

    setIsSending(true);
    try {
      // ... lógica existente ...
      
      // Adiciona notificação
      addNotification(
        'email',
        'sent',
        'E-mail enviado',
        'O e-mail foi salvo e enviado com sucesso.'
      );
      
      // ... resto do código ...
    } catch (error) {
      // Adiciona notificação de erro
      addNotification(
        'email',
        'sent',
        'Erro ao enviar',
        'Ocorreu um erro ao tentar enviar o e-mail.'
      );
    } finally {
      setIsSending(false);
    }
  };

  // ... resto do código ...
}
import { Bell, Check, Trash2, CheckCheck, Mail, ListTodo, FileText } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'task':
      return <ListTodo className="h-4 w-4" />;
    case 'note':
      return <FileText className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'created':
      return 'text-blue-500';
    case 'completed':
      return 'text-green-500';
    case 'saved':
      return 'text-yellow-500';
    case 'sent':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h4 className="font-medium">Notificações</h4>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-blue-600 whitespace-nowrap"
                onClick={markAllAsRead}
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-red-600"
              onClick={clearNotifications}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "px-4 py-3 cursor-pointer",
                  !notification.read && "bg-muted/50"
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex gap-3">
                  <div className={cn(
                    "mt-1",
                    getActionColor(notification.action)
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="mt-1">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
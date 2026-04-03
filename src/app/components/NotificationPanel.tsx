// Notification Panel Component

import { useState } from 'react';
import { Bell, Check, X, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { mockNotifications } from '../data/mock-data';
import { format } from 'date-fns';
import { Link } from 'react-router';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  unreadCount?: number;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#28A745]" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#FFC107]" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-[#DC3545]" />;
      default:
        return <Info className="w-5 h-5 text-[#01411C]" />;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 border-l-4 border-[#01411C]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#01411C] to-[#0B5D1E] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <Badge className="bg-[#DC3545] text-white">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="w-full text-white hover:bg-white/10"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      notification.read
                        ? 'bg-gray-50 border-gray-200'
                        : 'bg-[#DFF5E1] border-[#01411C]/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-[#01411C] text-sm">
                            {notification.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mt-1 -mr-1"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {format(notification.createdAt, 'MMM d, h:mm a')}
                          </span>
                          <div className="flex items-center space-x-2">
                            {notification.ticketId && (
                              <Link to={`/ticket/${notification.ticketId}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-xs text-[#01411C] hover:bg-white"
                                  onClick={onClose}
                                >
                                  View
                                </Button>
                              </Link>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-[#01411C] hover:bg-white"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Mark read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
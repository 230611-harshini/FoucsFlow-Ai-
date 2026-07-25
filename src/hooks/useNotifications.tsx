import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'system' | 'achievement';
  is_read: boolean;
  task_id: string | null;
  created_at: string;
}

// Local storage helpers
const getNotifications = (userId: string): Notification[] => {
  const stored = localStorage.getItem(`focusflow_notifications_${userId}`);
  return stored ? JSON.parse(stored) : [];
};

const saveNotifications = (userId: string, notifications: Notification[]) => {
  localStorage.setItem(`focusflow_notifications_${userId}`, JSON.stringify(notifications));
};

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user) return;

    const storedNotifications = getNotifications(user.id)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 50);
    
    setNotifications(storedNotifications);
    setUnreadCount(storedNotifications.filter(n => !n.is_read).length);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const markAsRead = async (id: string) => {
    if (!user) return;

    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    );
    setNotifications(updatedNotifications);
    saveNotifications(user.id, updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!user) return;

    const updatedNotifications = notifications.map(n => ({ ...n, is_read: true }));
    setNotifications(updatedNotifications);
    saveNotifications(user.id, updatedNotifications);
    setUnreadCount(0);
  };

  const deleteNotification = async (id: string) => {
    if (!user) return;

    const notification = notifications.find(n => n.id === id);
    const updatedNotifications = notifications.filter(n => n.id !== id);
    
    setNotifications(updatedNotifications);
    saveNotifications(user.id, updatedNotifications);
    
    if (notification && !notification.is_read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const addNotification = async (title: string, message: string, type: 'reminder' | 'system' | 'achievement', taskId?: string) => {
    if (!user) return;

    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      is_read: false,
      task_id: taskId || null,
      created_at: new Date().toISOString(),
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    saveNotifications(user.id, updatedNotifications);
    setUnreadCount(prev => prev + 1);
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    refetch: fetchNotifications,
  };
};

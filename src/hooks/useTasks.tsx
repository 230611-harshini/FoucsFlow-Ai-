import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: 'high' | 'medium' | 'low';
  due_date: string | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface TaskReminder {
  id: string;
  task_id: string;
  reminder_time: string;
  reminder_type: 'email' | 'in_app' | 'both';
  is_sent: boolean;
}

// Local storage helpers
const getTasks = (userId: string): Task[] => {
  const stored = localStorage.getItem(`focusflow_tasks_${userId}`);
  return stored ? JSON.parse(stored) : [];
};

const saveTasks = (userId: string, tasks: Task[]) => {
  localStorage.setItem(`focusflow_tasks_${userId}`, JSON.stringify(tasks));
};

export const useTasks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!user) return;

    const storedTasks = getTasks(user.id);
    setTasks(storedTasks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (
    title: string,
    priority: 'high' | 'medium' | 'low',
    dueDate?: Date,
    description?: string,
    reminder?: { time: Date; type: 'email' | 'in_app' | 'both' }
  ) => {
    if (!user) return null;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      title,
      priority,
      description: description || null,
      due_date: dueDate?.toISOString() || null,
      is_completed: false,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add reminder if provided
    if (reminder) {
      addReminder(newTask.id, reminder.time, reminder.type);
    }

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(user.id, updatedTasks);
    toast({ title: 'Task added', description: `"${title}" has been added to your list.` });
    return newTask;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!user) return false;

    const updatedTasks = tasks.map(t => 
      t.id === id ? { ...t, ...updates, updated_at: new Date().toISOString() } : t
    );
    setTasks(updatedTasks);
    saveTasks(user.id, updatedTasks);
    return true;
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updates = {
      is_completed: !task.is_completed,
      completed_at: !task.is_completed ? new Date().toISOString() : null,
    };

    await updateTask(id, updates);
  };

  const deleteTask = async (id: string) => {
    if (!user) return false;

    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    saveTasks(user.id, updatedTasks);
    toast({ title: 'Task deleted', description: 'The task has been removed.' });
    return true;
  };

  const addReminder = async (taskId: string, reminderTime: Date, reminderType: 'email' | 'in_app' | 'both') => {
    if (!user) return null;

    const reminder: TaskReminder = {
      id: Math.random().toString(36).substr(2, 9),
      task_id: taskId,
      reminder_time: reminderTime.toISOString(),
      reminder_type: reminderType,
      is_sent: false,
    };

    const stored = localStorage.getItem(`focusflow_reminders_${user.id}`);
    const reminders: TaskReminder[] = stored ? JSON.parse(stored) : [];
    reminders.push(reminder);
    localStorage.setItem(`focusflow_reminders_${user.id}`, JSON.stringify(reminders));
    return reminder;

    return reminder;
  };

  const getTaskReminders = async (taskId: string) => {
    if (!user) return [];

    const stored = localStorage.getItem(`focusflow_reminders_${user.id}`);
    const reminders: TaskReminder[] = stored ? JSON.parse(stored) : [];
    return reminders.filter(r => r.task_id === taskId).sort((a, b) => 
      new Date(a.reminder_time).getTime() - new Date(b.reminder_time).getTime()
    );
  };

  const deleteReminder = async (reminderId: string) => {
    if (!user) return false;

    const stored = localStorage.getItem(`focusflow_reminders_${user.id}`);
    const reminders: TaskReminder[] = stored ? JSON.parse(stored) : [];
    const filtered = reminders.filter(r => r.id !== reminderId);
    localStorage.setItem(`focusflow_reminders_${user.id}`, JSON.stringify(filtered));
    return true;
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    toggleComplete,
    deleteTask,
    addReminder,
    getTaskReminders,
    deleteReminder,
    refetch: fetchTasks,
  };
};

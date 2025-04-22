'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Auth Context
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'online' | 'break' | 'shadow' | 'offline';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUserStatus: (status: 'online' | 'break' | 'shadow' | 'offline') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Task Context
type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Completed';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
  notes?: string;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Notification Context
type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Combined Providers
export function Providers({ children }: { children: ReactNode }) {
  // Auth Provider Implementation
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app, this would call an API
    if (email === 'demo@example.com' && password === 'password') {
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'demo@example.com',
        role: 'Manager',
        status: 'online'
      });
      return true;
    }
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    // Mock register - in a real app, this would call an API
    setUser({
      id: '1',
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: 'online'
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserStatus = (status: 'online' | 'break' | 'shadow' | 'offline') => {
    if (user) {
      setUser({ ...user, status });
    }
  };

  // Task Provider Implementation
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Website Redesign',
      description: 'Redesign the company website with new branding',
      category: 'Design',
      priority: 'High',
      status: 'Active',
      dueDate: '2025-05-01',
      assignedTo: '1',
      createdAt: '2025-04-15',
      subtasks: [
        { id: '1-1', title: 'Create wireframes', completed: true },
        { id: '1-2', title: 'Design mockups', completed: false },
        { id: '1-3', title: 'Implement frontend', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Database Migration',
      description: 'Migrate from MySQL to PostgreSQL',
      category: 'Development',
      priority: 'Medium',
      status: 'Active',
      dueDate: '2025-05-10',
      assignedTo: '1',
      createdAt: '2025-04-18'
    },
    {
      id: '3',
      title: 'Prototype Testing',
      description: 'Test the new product prototype with users',
      category: 'Research',
      priority: 'Low',
      status: 'Completed',
      dueDate: '2025-04-20',
      assignedTo: '2',
      createdAt: '2025-04-10'
    }
  ]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'Completed' } : task));
  };

  // Notification Provider Implementation
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Task Deadline Approaching',
      message: 'Task "Website Redesign" is due in 2 days',
      read: false,
      createdAt: '2025-04-20'
    },
    {
      id: '2',
      title: 'New Task Assigned',
      message: 'You have been assigned to "Database Migration"',
      read: false,
      createdAt: '2025-04-21'
    },
    {
      id: '3',
      title: 'Task Completed',
      message: '"Prototype Testing" was marked as complete',
      read: false,
      createdAt: '2025-04-22'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  // Client-side only
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUserStatus }}>
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, completeTask }}>
          <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
            {children}
          </NotificationContext.Provider>
        </TaskContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

// Custom hooks to use the contexts
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

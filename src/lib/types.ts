// This file contains custom type definitions for the application

// User type definition
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'online' | 'break' | 'shadow' | 'offline';
};

// Task type definition
export type Task = {
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

// Notification type definition
export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

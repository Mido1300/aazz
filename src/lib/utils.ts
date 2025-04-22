// This file contains utility functions for the application

// Format date to a readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Check if a task is overdue
export const isTaskOverdue = (dueDate: string, status: string): boolean => {
  const today = new Date();
  const taskDueDate = new Date(dueDate);
  return status !== 'Completed' && taskDueDate < today;
};

// Get color class based on priority
export const getPriorityColorClass = (priority: string): string => {
  switch (priority) {
    case 'High': return 'text-red-500';
    case 'Medium': return 'text-yellow-500';
    case 'Low': return 'text-green-500';
    default: return 'text-gray-500';
  }
};

// Get status indicator class
export const getStatusClass = (status: 'online' | 'break' | 'shadow' | 'offline'): string => {
  switch (status) {
    case 'online': return 'status-online';
    case 'break': return 'status-break';
    case 'shadow': return 'status-shadow';
    case 'offline': return 'status-offline';
    default: return 'status-offline';
  }
};

// Generate random ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

'use client';

import { useState } from 'react';
import { useTasks } from '@/components/providers/Providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

type TaskItemProps = {
  task: Task;
  onSelect?: (id: string, selected: boolean) => void;
  isSelected?: boolean;
  selectionMode?: boolean;
};

export default function TaskItem({ task, onSelect, isSelected, selectionMode = false }: TaskItemProps) {
  const { updateTask, completeTask, deleteTask } = useTasks();
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    completeTask(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelect) {
      onSelect(task.id, e.target.checked);
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return task.status !== 'Completed' && dueDate < today;
  };

  return (
    <div 
      className={`task-item p-4 ${task.status === 'Completed' ? 'completed' : ''} cursor-pointer`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex items-center">
        {selectionMode && (
          <div className="mr-3">
            <input 
              type="checkbox" 
              checked={isSelected} 
              onChange={handleSelect}
              onClick={(e) => e.stopPropagation()}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              {isOverdue() && (
                <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                  Overdue
                </span>
              )}
              <span className={`text-xs font-medium ${getPriorityColor()}`}>
                {task.priority}
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {task.category}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-1" />
                Due: {formatDate(task.dueDate)}
              </span>
            </div>
            
            <div className="flex space-x-2">
              {task.status !== 'Completed' && (
                <button 
                  onClick={handleToggleComplete}
                  className="p-1 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800"
                  title="Mark as Complete"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              )}
              
              <button 
                onClick={handleDelete}
                className="p-1 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                title="Delete Task"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t dark:border-gray-700">
          {task.description && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
            </div>
          )}
          
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Subtasks</h4>
              <ul className="space-y-1">
                {task.subtasks.map(subtask => (
                  <li key={subtask.id} className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      checked={subtask.completed} 
                      onChange={() => {
                        const updatedSubtasks = task.subtasks?.map(st => 
                          st.id === subtask.id ? { ...st, completed: !st.completed } : st
                        );
                        updateTask(task.id, { subtasks: updatedSubtasks });
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
                    />
                    <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
                      {subtask.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {task.notes && (
            <div>
              <h4 className="text-sm font-medium mb-1">Notes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{task.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

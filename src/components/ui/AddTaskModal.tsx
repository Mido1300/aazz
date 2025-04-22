'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTasks } from '@/components/providers/Providers';

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const { addTask } = useTasks();
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    dueDate: '',
    assignedTo: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('task-', '')]: value
    }));
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now().toString(), title: '', completed: false }]);
  };

  const handleSubtaskChange = (id: string, value: string) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, title: value } : subtask
    ));
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.category || !formData.priority || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Filter out empty subtasks
    const filteredSubtasks = subtasks.filter(subtask => subtask.title.trim() !== '');
    
    // Add task
    addTask({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority as 'High' | 'Medium' | 'Low',
      status: 'Active',
      dueDate: formData.dueDate,
      assignedTo: formData.assignedTo || '1', // Default to current user if not specified
      subtasks: filteredSubtasks.length > 0 ? filteredSubtasks : undefined,
      notes: formData.notes || undefined
    });
    
    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: '',
      dueDate: '',
      assignedTo: '',
      notes: ''
    });
    setSubtasks([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 open">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold text-primary">Add New Task</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-title">
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  id="task-title" 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base" 
                  placeholder="Task title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-description">
                  Description
                </label>
                <textarea 
                  id="task-description" 
                  rows={3} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base" 
                  placeholder="Task description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-category">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="task-category" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-priority">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select 
                    id="task-priority" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-dueDate">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    id="task-dueDate" 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-assignedTo">
                    Assign To
                  </label>
                  <select 
                    id="task-assignedTo" 
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  >
                    <option value="">Select User</option>
                    <option value="1">John Doe (You)</option>
                    <option value="2">Alice Smith</option>
                    <option value="3">Bob Johnson</option>
                    <option value="4">Carol Williams</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sub Tasks
                </label>
                <div id="subtasks-container" className="space-y-2 mb-2">
                  {subtasks.map((subtask, index) => (
                    <div key={subtask.id} className="flex items-center">
                      <input 
                        type="text" 
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base" 
                        placeholder={`Subtask ${index + 1}`}
                        value={subtask.title}
                        onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
                      />
                      <button 
                        type="button"
                        className="ml-2 p-2 text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button"
                  id="add-subtask" 
                  className="text-primary hover:text-primary-dark text-sm flex items-center mt-1"
                  onClick={handleAddSubtask}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Subtask
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="task-notes">
                  Additional Notes
                </label>
                <textarea 
                  id="task-notes" 
                  rows={2} 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 text-base" 
                  placeholder="Additional notes or details"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

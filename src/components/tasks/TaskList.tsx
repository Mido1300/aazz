'use client';

import { useState, useEffect } from 'react';
import { useTasks } from '@/components/providers/Providers';
import TaskItem from './TaskItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortAmountDown, faSortAmountUp, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

export default function TaskList() {
  const { tasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tasks];

    // Search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter(task => task.category === categoryFilter);
    }

    // Priority filter
    if (priorityFilter) {
      result = result.filter(task => task.priority === priorityFilter);
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(task => task.status === statusFilter);
    }

    // Date filter
    if (dateFilter) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      
      result = result.filter(task => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        
        switch (dateFilter) {
          case 'today':
            return dueDate.getTime() === today.getTime();
          case 'week':
            return dueDate >= weekStart && dueDate <= today;
          case 'month':
            return dueDate >= monthStart && dueDate <= today;
          default:
            return true;
        }
      });
    }

    // Sorting
    result.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'dueDate':
          valueA = new Date(a.dueDate).getTime();
          valueB = new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityValues = { 'High': 3, 'Medium': 2, 'Low': 1 };
          valueA = priorityValues[a.priority as keyof typeof priorityValues] || 0;
          valueB = priorityValues[b.priority as keyof typeof priorityValues] || 0;
          break;
        case 'title':
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case 'created':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
        default:
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setFilteredTasks(result);
  }, [tasks, searchTerm, categoryFilter, priorityFilter, statusFilter, dateFilter, sortBy, sortDirection]);

  const handleTaskSelection = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedTasks([...selectedTasks, id]);
    } else {
      setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const cancelSelection = () => {
    setSelectionMode(false);
    setSelectedTasks([]);
  };

  return (
    <div id="list-view" className="mb-8">
      {/* Task Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faSort} className="text-gray-400" />
              </span>
              <input 
                id="search-input" 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-base" 
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <select 
              id="category-filter" 
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Research">Research</option>
            </select>

            <select 
              id="priority-filter" 
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select 
              id="status-filter" 
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>

            <select 
              id="date-filter" 
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button id="undo-btn" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Undo">
              <FontAwesomeIcon icon={faUndo} />
            </button>
            <button id="redo-btn" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Redo">
              <FontAwesomeIcon icon={faRedo} />
            </button>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-end mb-4">
        <label className="mr-2 text-sm font-medium">Sort By:</label>
        <select 
          id="sort-select" 
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
          <option value="created">Created Date</option>
        </select>
        <button 
          id="sort-direction" 
          className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleSortDirection}
        >
          <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortAmountUp : faSortAmountDown} />
        </button>
      </div>

      {/* Task Selection Actions */}
      {selectionMode && selectedTasks.length > 0 && (
        <div id="task-selection-actions" className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 slide-up">
          <div className="flex items-center justify-between">
            <div>
              <span id="selected-count" className="font-semibold">{selectedTasks.length}</span> tasks selected
            </div>
            <div className="flex items-center gap-2">
              <button id="mark-complete-selected" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faCheck} className="mr-1" /> Mark Complete
              </button>
              <button id="delete-selected" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Delete
              </button>
              <button 
                id="cancel-selection" 
                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-3 py-1 rounded-lg transition-colors"
                onClick={cancelSelection}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary">Tasks</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>
        <div id="tasks-container" className="divide-y dark:divide-gray-700">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onSelect={handleTaskSelection}
                isSelected={selectedTasks.includes(task.id)}
                selectionMode={selectionMode}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No tasks found. Add a new task to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

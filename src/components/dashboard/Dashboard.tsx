'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/Providers';
import Header from '@/components/dashboard/Header';
import TaskList from '@/components/tasks/TaskList';
import TaskAnalytics from '@/components/dashboard/TaskAnalytics';
import ProfileModal from '@/components/ui/ProfileModal';
import AddTaskModal from '@/components/ui/AddTaskModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileImport, 
  faFileExport, 
  faUsers, 
  faList, 
  faChartBar, 
  faPlus,
  faCheck,
  faClock,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  if (!user) return null;

  return (
    <div id="dashboard-section">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="col-span-1 md:col-span-5 bg-white dark:bg-gray-800 rounded-lg shadow p-6 fade-in">
            <h2 className="text-xl font-bold mb-4 text-primary">Total Tasks</h2>
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faList} className="text-blue-500 dark:text-blue-300" />
              </div>
              <div>
                <div id="total-tasks-count" className="text-3xl font-bold text-blue-500 dark:text-blue-300">12</div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6 fade-in">
            <h2 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">Completed Tasks</h2>
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 dark:text-green-300" />
              </div>
              <div>
                <div id="completed-tasks-count" className="text-2xl font-bold text-green-500 dark:text-green-300">5</div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6 fade-in">
            <h2 className="text-lg font-semibold mb-4 text-yellow-600 dark:text-yellow-400">Pending Tasks</h2>
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
                <FontAwesomeIcon icon={faClock} className="text-yellow-500 dark:text-yellow-300" />
              </div>
              <div>
                <div id="pending-tasks-count" className="text-2xl font-bold text-yellow-500 dark:text-yellow-300">7</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <button className="bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow hover:shadow-md flex items-center transition-all duration-300">
              <FontAwesomeIcon icon={faFileImport} className="mr-2 text-primary" />
              <span>Import</span>
            </button>
            <button className="bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow hover:shadow-md flex items-center transition-all duration-300">
              <FontAwesomeIcon icon={faFileExport} className="mr-2 text-primary" />
              <span>Export</span>
            </button>
            <button className="bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow hover:shadow-md flex items-center transition-all duration-300">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-primary" />
              <span>Users</span>
            </button>
            <button 
              onClick={() => setShowAddTaskModal(true)}
              className="bg-primary text-white py-2 px-4 rounded-lg shadow hover:shadow-md flex items-center transition-all duration-300"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Task</span>
            </button>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => setViewMode('list')}
              className={`py-2 px-3 rounded-l-lg shadow ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
            >
              <FontAwesomeIcon icon={faList} />
            </button>
            <button 
              onClick={() => setViewMode('graph')}
              className={`py-2 px-3 rounded-r-lg shadow border-l ${viewMode === 'graph' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
            >
              <FontAwesomeIcon icon={faChartBar} />
            </button>
          </div>
        </div>

        {/* Task Views */}
        {viewMode === 'list' ? <TaskList /> : <TaskAnalytics />}

        {/* Insights Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 fade-in">
          <h2 className="text-xl font-bold mb-6 text-primary">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Productivity Score</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300 mr-2" id="productivity-score">78%</div>
                <div className="text-green-500">
                  <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                  <span>5%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Based on your task completion rate</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
              <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Time Management</h3>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-300 mr-2">6.5</div>
                <div className="text-gray-500">/10</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Average hours per task</p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
              <h3 className="text-lg font-semibold mb-2 text-amber-700 dark:text-amber-300">Upcoming Deadlines</h3>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-300">3</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Tasks due in the next 48 hours</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <AddTaskModal isOpen={showAddTaskModal} onClose={() => setShowAddTaskModal(false)} />
    </div>
  );
}

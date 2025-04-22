'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useTasks } from '@/components/providers/Providers';
import { useEffect, useState } from 'react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function TaskAnalytics() {
  const { tasks } = useTasks();
  const [statusData, setStatusData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
  const [priorityData, setPriorityData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] });
  const [timelineData, setTimelineData] = useState({ labels: [], datasets: [{ label: '', data: [], backgroundColor: '' }] });

  useEffect(() => {
    // Status Chart Data
    const activeCount = tasks.filter(task => task.status === 'Active').length;
    const completedCount = tasks.filter(task => task.status === 'Completed').length;
    
    setStatusData({
      labels: ['Active', 'Completed'],
      datasets: [
        {
          data: [activeCount, completedCount],
          backgroundColor: ['#3b82f6', '#22c55e'],
          borderWidth: 0,
        },
      ],
    });

    // Priority Chart Data
    const highCount = tasks.filter(task => task.priority === 'High').length;
    const mediumCount = tasks.filter(task => task.priority === 'Medium').length;
    const lowCount = tasks.filter(task => task.priority === 'Low').length;
    
    setPriorityData({
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          data: [highCount, mediumCount, lowCount],
          backgroundColor: ['#ef4444', '#facc15', '#22c55e'],
          borderWidth: 0,
        },
      ],
    });

    // Category Chart Data
    const categories = [...new Set(tasks.map(task => task.category))];
    const categoryCounts = categories.map(category => 
      tasks.filter(task => task.category === category).length
    );
    
    const categoryColors = [
      '#3b82f6', '#22c55e', '#ef4444', '#facc15', '#8b5cf6', 
      '#ec4899', '#14b8a6', '#f97316', '#6366f1'
    ];
    
    setCategoryData({
      labels: categories,
      datasets: [
        {
          data: categoryCounts,
          backgroundColor: categoryColors.slice(0, categories.length),
          borderWidth: 0,
        },
      ],
    });

    // Timeline Chart Data
    // Get last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });
    
    const dateLabels = last7Days.map(date => 
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );
    
    const completedByDay = last7Days.map(date => {
      const dateString = date.toISOString().split('T')[0];
      return tasks.filter(task => 
        task.status === 'Completed' && 
        new Date(task.createdAt).toISOString().split('T')[0] === dateString
      ).length;
    });
    
    setTimelineData({
      labels: dateLabels,
      datasets: [
        {
          label: 'Tasks Completed',
          data: completedByDay,
          backgroundColor: '#5D5CDE',
        },
      ],
    });
  }, [tasks]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div id="graph-view" className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6 text-primary">Task Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Task Status</h3>
            <div className="h-64">
              <Pie data={statusData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
            <div className="h-64">
              <Pie data={priorityData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Task Completion Timeline</h3>
            <div className="h-64">
              <Bar 
                data={timelineData} 
                options={{
                  ...chartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
            <div className="h-64">
              <Pie data={categoryData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

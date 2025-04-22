'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClock, faMoon, faSun, faBell, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useAuth, useNotifications } from '@/components/providers/Providers';
import { useTheme } from 'next-themes';

export default function Header() {
  const { user, updateUserStatus, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { theme, setTheme } = useTheme();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [timeCounter, setTimeCounter] = useState('00:00:00');
  const [mounted, setMounted] = useState(false);

  // Time counter logic
  useEffect(() => {
    let startTime = Date.now();
    let timerInterval: NodeJS.Timeout;

    const updateTimer = () => {
      const elapsedTime = Date.now() - startTime;
      const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
      setTimeCounter(`${hours}:${minutes}:${seconds}`);
    };

    timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // For theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleStatusChange = (status: 'online' | 'break' | 'shadow' | 'offline') => {
    updateUserStatus(status);
    setShowStatusOptions(false);
  };

  const getStatusClass = () => {
    if (!user) return 'status-offline';
    
    switch (user.status) {
      case 'online': return 'status-online';
      case 'break': return 'status-break';
      case 'shadow': return 'status-shadow';
      case 'offline': return 'status-offline';
      default: return 'status-offline';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-primary text-white rounded-full p-2 mr-2">
            <FontAwesomeIcon icon={faTasks} />
          </div>
          <h1 className="text-xl font-bold text-primary">To-Do APP</h1>
        </div>
        
        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Time Counter */}
          <div id="time-counter" className="hidden md:flex items-center px-3 py-1 rounded-full border-2 border-green-500 text-sm">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <span id="time-display">{timeCounter}</span>
          </div>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faBell} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                <div className="p-3 border-b dark:border-gray-700">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className="notification-item p-3 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="font-semibold">{notification.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">No notifications</div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-2 border-t dark:border-gray-700">
                    <button 
                      onClick={markAllAsRead}
                      className="w-full text-center text-primary text-sm py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Profile */}
          {user && (
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center focus:outline-none"
              >
                <img 
                  className={`h-10 w-10 rounded-full object-cover status-indicator ${getStatusClass()}`} 
                  src="https://i.imgur.com/8Km9tLL.jpg" 
                  alt="User Profile" 
                />
              </button>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <div className="p-3 border-b dark:border-gray-700">
                    <div className="font-semibold user-name">{user.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 user-role">{user.role}</div>
                  </div>
                  
                  {/* Status Options */}
                  <div className="border-b dark:border-gray-700">
                    <button 
                      onClick={() => setShowStatusOptions(!showStatusOptions)}
                      className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <span className={`h-2 w-2 rounded-full mr-2 ${
                        user.status === 'online' ? 'bg-green-500' :
                        user.status === 'break' ? 'bg-yellow-500' :
                        user.status === 'shadow' ? 'bg-gray-500' :
                        'bg-red-500'
                      }`}></span>
                      <span id="current-status">
                        {user.status === 'online' ? 'Online' :
                         user.status === 'break' ? 'On Break' :
                         user.status === 'shadow' ? 'Shadow' :
                         'Offline'}
                      </span>
                      <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
                    </button>
                    
                    {showStatusOptions && (
                      <div className="px-2 py-1">
                        <button 
                          onClick={() => handleStatusChange('online')}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        >
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Online
                        </button>
                        <button 
                          onClick={() => handleStatusChange('break')}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        >
                          <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                          On Break
                        </button>
                        <button 
                          onClick={() => handleStatusChange('shadow')}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        >
                          <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                          Shadow
                        </button>
                        <button 
                          onClick={() => handleStatusChange('offline')}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        >
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          Offline
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="py-1">
                    <button className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      View Profile
                    </button>
                    <button 
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

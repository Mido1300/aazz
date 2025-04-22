'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/Providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function RegisterForm({ onShowLogin }: { onShowLogin: () => void }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    country: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('reg-', '')]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.email !== formData.emailConfirm) {
      setError('Emails do not match');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData);
      if (!success) {
        setError('Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 fade-in">
      <div className="flex justify-center mb-6">
        <div className="bg-primary text-white rounded-full p-3">
          <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Create Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-name">
              Full Name
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-name" 
              type="text" 
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-email">
              Email
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-email" 
              type="email" 
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-emailConfirm">
              Confirm Email
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-emailConfirm" 
              type="email" 
              placeholder="Confirm Email"
              value={formData.emailConfirm}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-password">
              Password
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-password" 
              type="password" 
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-passwordConfirm">
              Confirm Password
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-passwordConfirm" 
              type="password" 
              placeholder="Confirm Password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-phone">
              Phone Number
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-phone" 
              type="tel" 
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-country">
              Country
            </label>
            <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
              <option value="AE">United Arab Emirates</option>
              <option value="EG">Egypt</option>
              <option value="SA">Saudi Arabia</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="reg-role">
              Role
            </label>
            <select 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary" 
              id="reg-role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <button 
            className={`bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <button
            type="button"
            className="inline-block align-baseline font-bold text-sm text-primary hover:text-opacity-80"
            onClick={onShowLogin}
          >
            Already have an account?
          </button>
        </div>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </form>
    </div>
  );
}

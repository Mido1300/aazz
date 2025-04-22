'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function AuthSection() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div id="auth-section" className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showLogin ? (
          <LoginForm onShowRegister={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onShowLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}

'use client';

import { useAuth } from '@/components/providers/Providers';
import AuthSection from '@/components/auth/AuthSection';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      {isAuthenticated ? <Dashboard /> : <AuthSection />}
    </main>
  );
}

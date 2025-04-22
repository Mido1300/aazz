'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Providers } from '@/components/providers/Providers';

interface ProvidersWrapperProps {
  children: ReactNode;
}

export function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="todo-theme">
      <Providers>
        {children}
      </Providers>
    </ThemeProvider>
  );
}

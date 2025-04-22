'use client';

import { ProvidersWrapper } from '@/components/providers/ProvidersWrapper';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen transition-colors duration-300`}>
        <ProvidersWrapper>
          <div id="app" className="relative">
            {children}
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  );
}

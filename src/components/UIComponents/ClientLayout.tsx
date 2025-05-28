// src/components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/UIComponents/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="py-8 px-4">
        {children}
        </main>
    </>
  );
}

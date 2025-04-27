'use client';

import FormateurSidebar from '@/components/dashboard/FormateurSidebar';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FormateurHome() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'FORMATEUR')) {
      router.push('/');
    }
  }, [loading, user, router]);

  return (
    <div className="flex min-h-screen">
      <FormateurSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Bienvenue Formateur !</h1>
        <p className="text-gray-600">Gérez vos tutoriels, cours et suivez vos statistiques.</p>
      </main>
    </div>
  );
}

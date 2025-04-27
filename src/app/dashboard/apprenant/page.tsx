'use client';

import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import ApprenantSidebar from '@/components/dashboard/ApprenantSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function ApprenantDashboard() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'APPRENANT')) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading || !user) return <div>Chargement...</div>;

  return (
    <div className="flex min-h-screen">
      <ApprenantSidebar />
      <main className="flex-1 p-6">
        <DashboardHeader title="Tableau de bord Apprenant" />

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Bienvenue {user.prenom} 👋</h2>
          <p className="text-gray-600">Voici un aperçu de votre progression.</p>

          {/* Statistiques à intégrer plus tard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">Tutoriels suivis</h3>
              <p className="text-2xl text-blue-600 font-semibold">--</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">Cours complétés</h3>
              <p className="text-2xl text-green-600 font-semibold">--</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">Certificats obtenus</h3>
              <p className="text-2xl text-purple-600 font-semibold">--</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

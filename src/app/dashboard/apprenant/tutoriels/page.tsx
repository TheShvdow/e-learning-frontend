/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/api';
import ApprenantSidebar from '@/components/dashboard/ApprenantSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Link from 'next/link';

interface Tutorial {
    id: number;
    titreTuto: string;
    descriptionTuto: string;
    photo: string;
    formation: {
        nomFormation: string;
    };
}

export default function MesTutorielsPage() {
    const { user, loading } = useUser();
    const router = useRouter();
    const [tutoriels, setTutoriels] = useState<Tutorial[]>([]);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'APPRENANT')) {
            router.push('/');
        }
    }, [loading, user, router]);

    useEffect(() => {
        const fetchTutoriels = async () => {
            try {
                const res = await axios.get('/users/me/full');
                console.log(res.data);
                const enrolled = res.data.enrollments || [];
                const mapped = enrolled.map((e: any) => e.tutorial);
                setTutoriels(mapped);
            } catch (error) {
                console.error("Erreur lors du chargement des tutoriels", error);
            }
        };

        fetchTutoriels();
    }, []);

    if (loading || !user) return <div>Chargement...</div>;

    return (
        <div className="flex min-h-screen">
            <ApprenantSidebar />
            <main className="flex-1 p-6 bg-gray-50">
                <DashboardHeader title="Mes Tutoriels" />
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutoriels.length > 0 ? (
            tutoriels.map((tutorial) => (
              <Link key={tutorial.id} href={`/tutoriels/${tutorial.id}`}>
                <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                  <img src={tutorial.photo} alt={tutorial.titreTuto} className="rounded mb-3 w-full h-40 object-cover" />
                  <h3 className="text-lg font-semibold">{tutorial.titreTuto}</h3>
                  <p className="text-sm text-gray-600">{tutorial.formation.nomFormation}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucun tutoriel suivi pour le moment.</p>
          )}
        </div>

                
            </main>
        </div>
    );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

interface DemandeFormateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  motivationFormateur: string;
  experienceProfessionnelle: string;
  portfolioUrl?: string;
  cvUrl?: string;
}

export default function DemandeFormateurPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [demandes, setDemandes] = useState<DemandeFormateur[]>([]);
  const [loadingDemandes, setLoadingDemandes] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [loading, user, router]);

  const fetchDemandes = async () => {
    try {
      const res = await axios.get('/users/demandes-formateur');
      setDemandes(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des demandes', err);
    } finally {
      setLoadingDemandes(false);
    }
  };

  const validerDemande = async (id: string) => {
    if (!confirm("Confirmer la validation de cette demande ?")) return;
    try {
      await axios.post(`/users/valider-formateur/${id}`);
      fetchDemandes();
    } catch (err) {
      alert('Erreur lors de la validation.');
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <DashboardHeader title="Demandes de rôle Formateur" />
        {loadingDemandes ? (
          <p>Chargement...</p>
        ) : (
          <div className="space-y-4">
            {demandes.length === 0 ? (
              <p className="text-gray-500">Aucune demande pour le moment.</p>
            ) : (
              demandes.map((demande) => (
                <div key={demande.id} className="border p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-lg">
                    {demande.prenom} {demande.nom}
                  </h3>
                  <p><strong>Email :</strong> {demande.email}</p>
                  <p><strong>Motivation :</strong> {demande.motivationFormateur}</p>
                  <p><strong>Expérience :</strong> {demande.experienceProfessionnelle}</p>
                  {demande.cvUrl && (
                    <p>
                      <a href={demande.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Voir le CV
                      </a>
                    </p>
                  )}
                  {demande.portfolioUrl && (
                    <p>
                      <a href={demande.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Voir le Portfolio
                      </a>
                    </p>
                  )}
                  <button
                    onClick={() => validerDemande(demande.id)}
                    className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Valider comme formateur
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

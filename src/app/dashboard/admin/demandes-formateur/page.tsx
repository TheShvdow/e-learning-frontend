'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // ✅ Assure-toi que 'sonner' est installé

interface Demande {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  motivationFormateur?: string;
  experienceProfessionnelle?: string;
  cvUrl?: string;
  portfolioUrl?: string;
  etatDemande?: string;
}

export default function DemandesFormateurPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) router.push('/');
  }, [loading, user, router]);

  const fetchDemandes = async () => {
    try {
      const res = await axios.get(`/users/demandes-formateur/paginated`, {
        params: { page, search },
      });
  
      const { users = [], total = 1 } = res.data || {};
  
      setDemandes(users); // <- ici on utilise 'users'
      setTotalPages(Math.ceil(total)); // total est un nombre brut, à adapter si besoin
    } catch (err) {
      console.error('Erreur chargement des demandes', err);
    }
  };
  

  useEffect(() => {
    fetchDemandes();
  }, [page, search]);

  const handleValidation = async (id: string, etat: 'ACCEPTEE' | 'REFUSEE') => {
    try {
      await axios.post(`/users/demandes-formateur/${id}/valider`, { etat });
      toast.success(
        etat === 'ACCEPTEE'
          ? 'Demande acceptée avec succès !'
          : 'Demande refusée avec succès !'
      );
      fetchDemandes();
    } catch (err) {
      toast.error('Erreur lors du traitement de la demande.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Demandes Formateur</h1>

      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Motivation</th>
            <th className="border p-2">Expérience</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((d) => (
            <tr key={d.id}>
              <td className="border p-2">{d.nom} {d.prenom}</td>
              <td className="border p-2">{d.email}</td>
              <td className="border p-2">{d.motivationFormateur || '-'}</td>
              <td className="border p-2">{d.experienceProfessionnelle || '-'}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleValidation(d.id, 'ACCEPTEE')}
                  className="text-green-600 hover:underline"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleValidation(d.id, 'REFUSEE')}
                  className="text-red-600 hover:underline"
                >
                  Refuser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              page === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

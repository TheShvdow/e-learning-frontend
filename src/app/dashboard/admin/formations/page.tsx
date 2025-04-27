'use client';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/api';
import Link from 'next/link';

interface Formation {
  id: number;
  nomFormation: string;
  description: string;
}

export default function AdminDashboardFormations() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [selectedFormations, setSelectedFormations] = useState<number[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [loading, user, router]);

  const fetchFormations = async () => {
    try {
      const res = await axios.get('/formations');
      setFormations(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des formations', err);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFormations(formations.map((f) => f.id));
    } else {
      setSelectedFormations([]);
    }
  };

  const handleSelectFormation = (id: number) => {
    setSelectedFormations((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const isChecked = (id: number) => selectedFormations.includes(id);

  const handleDeleteSelected = async () => {
    if (!confirm('Voulez-vous vraiment supprimer les formations sélectionnées ?')) return;

    try {
      await Promise.all(
        selectedFormations.map((id) => axios.delete(`/formations/${id}`))
      );
      fetchFormations();
      setSelectedFormations([]);
    } catch (err) {
      console.error('Erreur lors de la suppression', err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <DashboardHeader title="Formations" />
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestion des Formations</h2>
            <Link href="/dashboard/admin/formations/create">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Ajouter une formation
              </button>
            </Link>
          </div>

          {formations.length === 0 ? (
            <p>Aucune formation trouvée.</p>
          ) : (
            <>
              {selectedFormations.length > 0 && (
                <div className="mb-4">
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Supprimer les ({selectedFormations.length}) sélectionnées
                  </button>
                </div>
              )}

              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={selectedFormations.length === formations.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="py-2 px-4 border-b">Titre</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formations.map((formation) => (
                    <tr key={formation.id}>
                      <td className="py-2 px-4 border-b">
                        <input
                          type="checkbox"
                          checked={isChecked(formation.id)}
                          onChange={() => handleSelectFormation(formation.id)}
                        />
                      </td>
                      <td className="py-2 px-4 border-b">{formation.nomFormation}</td>
                      <td className="py-2 px-4 border-b">{formation.description}</td>
                      <td className="py-2 px-4 border-b flex gap-4">
                      <Link href={`/dashboard/admin/formations/edit/${formation.id}`}>
                          <button className="text-blue-600 hover:underline">Modifier</button>
                        </Link>
                        <button
                          onClick={() => handleDeleteSelected()} // facultatif : bouton individuel
                          className="text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

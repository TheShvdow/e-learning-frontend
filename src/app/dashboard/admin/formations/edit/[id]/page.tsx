'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/lib/api';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BackButton from '@/components/UI/BackButton';

export default function AdminEditFormationPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [nomFormation, setNomFormation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const res = await axios.get(`/formations/${id}`);
        const { nomFormation, description, photo } = res.data;
        setNomFormation(nomFormation);
        setDescription(description);
        setPhoto(photo);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFormation();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.put(`/formations/${id}`, {
        nomFormation,
        description,
        photo,
      });
      router.push('/dashboard/admin/formations');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la mise à jour de la formation.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <BackButton />
        <DashboardHeader title="Modifier la formation" />
        <div className="max-w-2xl mt-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Nom de la formation</label>
              <input
                type="text"
                value={nomFormation}
                onChange={(e) => setNomFormation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={5}
                required
              ></textarea>
            </div>
            <div>
              <label className="block font-medium">Image (URL)</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Mettre à jour
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

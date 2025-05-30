'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import axios from '@/lib/api';
import BackButton from '@/components/UIComponents/BackButton';

export default function AdminCreateFormationPage() {
  const router = useRouter();
  const [nomFormation, setNomFormation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    if (!nomFormation || !description || !photo) {
      setError('Veuillez remplir tous les champs.');
      setLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('nomFormation', nomFormation);
      formData.append('description', description);
      formData.append('photo', photo);
  
      await axios.post('/formations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      router.push('/dashboard/admin/formations');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la création de la formation.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <BackButton />
        <DashboardHeader title="Créer une formation" />
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
              <label className="block font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Créer la formation
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CoursModal from '@/components/cours/CoursModal';


interface Cours {
  id: number;
  titreCours: string;
  content: string;
  photo?: string;
  videosUrl?: string;
}

export default function CoursPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [cours, setCours] = useState<Cours[]>([]);
  const [selectedCours, setSelectedCours] = useState<Cours | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'FORMATEUR')) {
      router.push('/');
    } else {
      fetchCours();
    }
  }, [loading, user]);

  const fetchCours = async () => {
    try {
      const res = await axios.get('/cours');
      setCours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce cours ?')) return;
    try {
      await axios.delete(`/cours/${id}`);
      fetchCours();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Cours</h1>
        <Button onClick={() => setShowCreateModal(true)}>➕ Nouveau cours</Button>
      </div>

      <div className="grid gap-4">
        {cours.map((c) => (
          <div key={c.id} className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold">{c.titreCours}</h2>
            <p className="text-sm text-gray-700">{c.content}</p>
            {c.videosUrl && (
              <video controls className="w-full mt-2 rounded">
                <source src={c.videosUrl} type="video/mp4" />
              </video>
            )}
            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedCours(c)}
              >
                Modifier
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(c.id)}>
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔧 Modal création */}
      {showCreateModal && (
        <CoursModal
          onClose={() => {
            setShowCreateModal(false);
            fetchCours();
          }}
        />
      )}

      {/* 🔧 Modal édition */}
      {selectedCours && (
        <CoursModal
          cours={selectedCours}
          onClose={() => {
            setSelectedCours(null);
            fetchCours();
          }}
        />
      )}
    </div>
  );
}

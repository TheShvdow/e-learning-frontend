/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/lib/api';
import BackButton from '@/components/UI/BackButton';

interface Cours {
  id: number;
  titreCours: string;
  content: string;
  photo: string;
}

export default function CoursDetailPage() {
  const { id, coursId } = useParams<{ id: string; coursId: string }>();
  const router = useRouter();

  const [cours, setCours] = useState<Cours | null>(null);
  const [coursList, setCoursList] = useState<Cours[]>([]);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const [coursRes, allCoursRes] = await Promise.all([
          axios.get(`/cours/${coursId}`),
          axios.get(`/tutorials/${id}`), // contient aussi les cours
        ]);

        setCours(coursRes.data);
        setCoursList(allCoursRes.data.cours || []);
      } catch (err) {
        router.push('/404');
      }
    };

    fetchCours();
  }, [id, coursId, router]);

  const handleComplete = async () => {
    try {
      await axios.post('/progress/complete', { coursId: Number(coursId) });
      alert("Cours marqué comme terminé !");
    } catch (err) {
      alert("Erreur lors de la validation du cours.");
    }
  };

  const goToCours = (coursId: number) => {
    router.push(`/tutorials/${id}/cours/${coursId}`);
  };

  if (!cours) return <div>Chargement...</div>;

  const currentIndex = coursList.findIndex(c => c.id === Number(coursId));
  const previousCours = coursList[currentIndex - 1];
  const nextCours = coursList[currentIndex + 1];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <BackButton />
      <h1 className="text-3xl font-bold mb-4">{cours.titreCours}</h1>
      <img src={cours.photo} alt={cours.titreCours} className="rounded mb-4" />
      <div className="text-gray-700 whitespace-pre-wrap mb-6">{cours.content}</div>

      <div className="flex gap-4 mb-6">
        {previousCours && (
          <button
            onClick={() => goToCours(previousCours.id)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            ⬅ Cours précédent
          </button>
        )}
        {nextCours && (
          <button
            onClick={() => goToCours(nextCours.id)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cours suivant ➡
          </button>
        )}
        <button
          onClick={handleComplete}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ✅ Marquer comme terminé
        </button>
      </div>

      <button
        onClick={() => router.push(`/tutorials/${id}`)}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Retour au tutoriel
      </button>
    </div>
  );
}

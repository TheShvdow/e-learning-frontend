/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';


interface Tutorial {
  id: number;
  titreTuto: string;
  descriptionTuto: string;
  photo: string;
  cours: {
    id: number;
    titreCours: string;
    photo: string;
  }[];
}

export default function TutorialDetailPage({ params }: { params: { id: string } }) {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();

  const tutorialId = parseInt(params.id);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const res = await axios.get(`/tutorials/${params.id}`);
        setTutorial(res.data);
      } catch {
        router.push('/not-found');
      }
    };

    const checkEnrollment = async () => {
      try {
        const res = await axios.get(`/progress/enrolled/${params.id}`)

        setEnrolled(res.data.enrolled);
      } catch {
        setEnrolled(false);
      }
    };

    fetchTutorial();
    checkEnrollment();
  }, [params.id, router]);

  const handleStart = async () => {
    try {
      await axios.post('/enrollments', { tutorialId });
      setEnrolled(true);
    } catch (err) {
      alert("Impossible de commencer ce tutoriel");
    }
  };

  if (!tutorial) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <BackButton/>
      <h1 className="text-3xl font-bold mb-4">{tutorial.titreTuto}</h1>
      <p className="mb-4 text-gray-600">{tutorial.descriptionTuto}</p>
      <img src={tutorial.photo} alt={tutorial.titreTuto} className="mb-6 rounded" />

      {!enrolled ? (
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
        >
          Commencer ce tutoriel
        </button>
      ) : (
        <p className="text-green-600 font-semibold mb-6">Vous êtes inscrit à ce tutoriel.</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Cours inclus :</h2>
      <ul className="space-y-4">
        {tutorial.cours.map((cours) => (
          <li key={cours.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-xl font-medium">{cours.titreCours}</h3>
            <img src={cours.photo} alt={cours.titreCours} className="mt-2 rounded w-full max-w-sm" />
          </li>
        ))}
      </ul>
    </div>
  );
}

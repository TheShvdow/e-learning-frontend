  /* eslint-disable @next/next/no-img-element */
  /* eslint-disable react-hooks/exhaustive-deps */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  'use client';

  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';
  import axios from '@/lib/api';
  import BackButton from '@/components/UI/BackButton';
  import Link from 'next/link';
  import CommentList from './CommentList';
  interface Cours {
    id: number;
    titreCours: string;
    photo: string;
  }

  interface Tutorial {
    id: number;
    titreTuto: string;
    descriptionTuto: string;
    photo: string;
    cours: Cours[];
    // commentaire : Commentaire[]
  }

  interface Progress {
    total: number;
    completed: number;
    percent: number;
  }

  export default function TutorialDetail({ id }: { id: number }) {
    const [tutorial, setTutorial] = useState<Tutorial | null>(null);
    const [enrolled, setEnrolled] = useState(false);
    const [progress, setProgress] = useState<Progress | null>(null);
    const router = useRouter();

    const fetchData = async () => {
      try {
        const [tutorialRes, enrolledRes] = await Promise.all([
          axios.get(`/tutorials/${id}`),
          axios.get(`/progress/enrolled/${id}`),
        ]);

        setTutorial(tutorialRes.data);
        setEnrolled(enrolledRes.data.enrolled);

        if (enrolledRes.data.enrolled) {
          const progressRes = await axios.get(`/progress/progress?tutorialId=${id}`);
          setProgress(progressRes.data);
        }
      } catch (err) {
        console.error(err);
        router.push('/404');
      }
    };

    useEffect(() => {
      fetchData();
    }, [id]);

    const handleEnroll = async () => {
      try {
        await axios.post('/progress/enroll', { tutorialId: id });

        // Pas besoin de setEnrolled ici car fetchData le fera
        await fetchData(); // 👈 bien attendre les nouvelles données
      } catch (err) {
        alert('Erreur lors de l’enrôlement.');
        console.error(err);
      }
    };


    if (!tutorial) return <div>Chargement...</div>;

    return (
      <div className="max-w-4xl mx-auto py-8">
        <BackButton />
        <h1 className="text-3xl font-bold mb-4">{tutorial.titreTuto}</h1>
        <p className="mb-4 text-gray-600">{tutorial.descriptionTuto}</p>
        <img src={tutorial.photo} alt={tutorial.titreTuto} className="mb-6 rounded w-full max-h-[400px] object-cover" />

        {!enrolled ? (
          <button onClick={handleEnroll} className="bg-blue-600 text-white px-4 py-2 rounded">
            Commencer le tutoriel
          </button>
        ) : (
          <>
            {progress && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Progression :</h2>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{progress.completed}/{progress.total} cours terminés</p>
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Cours inclus :</h2>
            <ul className="space-y-4">
              {/* {tutorial.cours.map((cours) => (
                <li key={cours.id} className="border p-4 rounded shadow-sm">
                  <h3 className="text-xl font-medium">{cours.titreCours}</h3>
                  <img
                    src={cours.photo}
                    alt={cours.titreCours}
                    className="mt-2 rounded w-full max-w-sm object-cover"
                    width={300}
                    height={200}
                  />
                </li>
              ))} */}
              {tutorial.cours.map((cours) => (
                <li key={cours.id}>
                  <Link href={`/tutorials/${tutorial.id}/cours/${cours.id}`} className="text-blue-600 hover:underline">
                    {cours.titreCours}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

            <CommentList tutorialId={id} />

      </div>
    );
  }

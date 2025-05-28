//src/app/dashboard/formateur/cours/page.tsx
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Formation {
  id : number,
  nomFormation : string,
}

interface Tutorial {
  id: number;
  titreTuto: string;
  formation: Formation;
}

interface Cours {
  id: number;
  titreCours: string;
  content: string;
  photo?: string;
  videosUrl?: string;
  tutorial: Tutorial;
  
}

export default function CoursPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [cours, setCours] = useState<Cours[]>([]);


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
      console.log(res.data);
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
        <Button >➕ Nouveau cours</Button>
      </div>

      <div className="grid grid-col-3 gap-4">
        {cours.map((c) => (
          <div key={c.id} className="bg-white shadow p-4 rounded relative">
          {/* Badge Formation + Tutoriel */}
          <div className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded shadow">
            <span className="font-semibold">{c.tutorial.formation.nomFormation}</span>
            {' • '}
            <span>{c.tutorial.titreTuto}</span>
          </div>
        
          <h2 className="text-lg font-semibold mt-6">{c.titreCours}</h2>
          <p className="text-sm text-gray-700">{c.content}</p>
        
          {c.videosUrl && (
            <video controls className="w-full mt-2 rounded">
              <source src={c.videosUrl} type="video/mp4" />
            </video>
          )}
        
          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/dashboard/formateur/cours/${c.id}/edit`)}
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
    </div>
  );
}

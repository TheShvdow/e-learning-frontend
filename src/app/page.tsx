'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import axios from '@/lib/api';

interface Cours {
  id: number;
  titreCours: string;
  photo: string;
  tutorialId: number;
}

export default function HomePage() {
  const [popularCourses, setPopularCourses] = useState<Cours[]>([]);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await axios.get('/cours');
        const courses = res.data.slice(0, 6); // On prend les 6 premiers
        console.log(courses);
        setPopularCourses(courses);
      } catch (error) {
        console.error('Erreur lors du chargement des cours en vogue', error);
      }
    };

    fetchPopularCourses();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        Bienvenue sur <span className="text-blue-600">Jangu_Bi</span> 🎓
      </h1>
      <p className="text-lg text-gray-600 max-w-xl text-center mb-8">
        Découvrez des formations tech accessibles en français et en wolof. Suivez des tutoriels, progressez et obtenez des certificats.
      </p>

      <Button asChild className="mb-10">
        <Link href="/formations">Découvrir les formations</Link>
      </Button>

      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Cours en vogue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularCourses.map((cours) => (
            <Card key={cours.id} className="hover:shadow-lg transition">
              <img
                src={cours.photo}
                alt={cours.titreCours}
                className="w-full h-40 object-cover rounded-t"
              />
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold">
                  {cours.titreCours}
                </CardTitle>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href={`/tutorials/${cours.tutorialId}/cours/${cours.id}`}>
                    Voir le cours
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

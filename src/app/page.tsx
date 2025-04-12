/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import  { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/api';
import CoursCard from '@/components/CoursCard';

export default function HomePage() {

  // fetch all cours
  const [cours, setCours] = useState([]);
  useEffect(() => {
    axios.get('/cours')
      .then(res => setCours(res.data))
      .catch(() => alert("Erreur lors du chargement des cours."));
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur la plateforme 🎓</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explorez des formations, suivez des tutoriels et obtenez des certificats.
      </p>
      <Link
        href="/formations"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Découvrir les formations
      </Link>
      
      {/* afficher 6 cours en vogue sur la page d'accueil  */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Cours en vogue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cours.slice(0, 6).map((cours: any) => (
          <CoursCard key={cours.id} cours={cours} />
        ))}
       
      </div>

    </div>
  );
}

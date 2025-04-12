/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import TutorialCard from '@/components/TutorialCard';

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    axios.get('/tutorials')
      .then(res => setTutorials(res.data))
      .catch(() => alert("Erreur lors du chargement des tutoriels."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tous les tutoriels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial: any) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
}

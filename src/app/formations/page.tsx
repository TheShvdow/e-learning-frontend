/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/lib/api';
import Link from 'next/link';

interface Formation {
  id: number | string;
  nomFormation: string;
  description: string;
  photo: string;
}

export default async function FormationsPage() {
  let formations: Formation[] = [];
  try {
    const { data } = await axios.get('/formations');
    formations = data;
    console.log('Formations récupérées:', formations);
  } catch (error) {
    console.error('Erreur lors de la récupération des formations:', error);
    // Gérer l'erreur appropriée

  }
    
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Toutes les formations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {formations.length > 0 ? (
          formations.map((formation: Formation) => (
            <Link
              key={formation.id}
              href={`/formations/${formation.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <img
                src={formation.photo}
                alt={formation.nomFormation}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{formation.nomFormation}</h2>
                <p className="text-sm text-gray-600">{formation.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Aucun formation suivi pour le moment.</p>
        )}
        
      </div>
    </div>
  );
}

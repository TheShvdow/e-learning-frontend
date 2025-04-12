/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/lib/api';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export default async function FormationDetailPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  const formation = await axios.get(`/formations/${id}`).then((res) => res.data);
  const tutorials = await axios.get(`/tutorials/formation/${id}`).then((res) => res.data);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{formation.nomFormation}</h1>
      <p className="text-lg text-gray-700 mb-8">{formation.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Tutoriels</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tutorials.map((tuto: any) => (
          <Link
            href={`/tutorials/${tuto.id}`}
            key={tuto.id}
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={tuto.photo}
              alt={tuto.titreTuto}
              className="w-full h-36 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{tuto.titreTuto}</h3>
              <p className="text-sm text-gray-600">{tuto.descriptionTuto}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

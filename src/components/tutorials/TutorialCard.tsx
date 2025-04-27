/* eslint-disable @next/next/no-img-element */
// src/components/TutorialCard.tsx
'use client';

import Link from 'next/link';

type Tutorial = {
  id: number;
  titreTuto: string;
  descriptionTuto: string;
  photo: string;
};

export default function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="border p-4 rounded shadow">
      <img src={tutorial.photo} alt={tutorial.titreTuto} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{tutorial.titreTuto}</h3>
      <p className="text-sm text-gray-600">{tutorial.descriptionTuto}</p>
      <Link href={`/tutorials/${tutorial.id}`} className="text-blue-600 hover:underline mt-2 inline-block">
        Voir plus
      </Link>
    </div>
  );
}

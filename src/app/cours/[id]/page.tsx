/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import axios from '@/lib/api';
import { notFound } from 'next/navigation';

interface Cours {
  id: number;
  titreCours: string;
  content: string;
  photo: string;
}

export default async function CoursDetailPage({ params }: { params: { id: string } }) {
  try {
    const res = await axios.get<Cours>(`/cours/${params.id}`);
    const cours = res.data;

    return (
      
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{cours.titreCours}</h1>
        <img src={cours.photo} alt={cours.titreCours} className="rounded mb-4" />
        <div className="text-gray-700 whitespace-pre-wrap">{cours.content}</div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

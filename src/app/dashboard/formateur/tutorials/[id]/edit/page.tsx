// src/app/dashboard/formateur/tutorials/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

export default function EditTutorialPage() {
  const { id } = useParams();
  const router = useRouter();
  const [titreTuto, setTitreTuto] = useState('');
  const [descriptionTuto, setDescriptionTuto] = useState('');

  useEffect(() => {
    axios.get(`/tutorials/${id}`).then((res) => {
      setTitreTuto(res.data.titreTuto);
      setDescriptionTuto(res.data.descriptionTuto);
    });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/tutorials/update/${id}`, { titreTuto, descriptionTuto });
      router.push('/dashboard/formateur/tutorials');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Modifier le tutoriel</h1>
      <input
        type="text"
        value={titreTuto}
        onChange={(e) => setTitreTuto(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        value={descriptionTuto}
        onChange={(e) => setDescriptionTuto(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Mettre à jour</button>
    </form>
  );
}

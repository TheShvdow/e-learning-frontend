'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Tutorial {
  id: number;
  titreTuto: string;
  descriptionTuto: string;
  photo: string;
}

interface Formation {
  id: number;
  nomFormation: string;
}

export default function TutorialsPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [titreTuto, setTitreTuto] = useState('');
  const [descriptionTuto, setDescriptionTuto] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [formationId, setFormationId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'FORMATEUR')) {
      router.push('/');
    } else if (user) {
      fetchTutorials();
      fetchFormations();
    }
  }, [loading, user]);

  const fetchTutorials = async () => {
    try {
      const res = await axios.get('/tutorials/formateur');
      setTutorials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFormations = async () => {
    try {
      const res = await axios.get('/formations');
      setFormations(res.data);
    } catch (err) {
      console.error('Erreur chargement formations :', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce tutoriel ?')) return;
    try {
      await axios.delete(`/tutorials/delete/${id}`);
      fetchTutorials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTutorial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !formationId) return;

    const formData = new FormData();
    formData.append('titreTuto', titreTuto);
    formData.append('descriptionTuto', descriptionTuto);
    formData.append('photo', file);
    formData.append('formationId', formationId.toString());

    try {
      const response = await axios.post('/tutorials/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Tutoriel créé :', response.data);
      setShowModal(false);
      setTitreTuto('');
      setDescriptionTuto('');
      setFile(null);
      setFormationId(null);
      fetchTutorials();
    } catch (error) {
      console.error('Erreur lors de la création', error);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 float-right"
      >
        ➕ Nouveau tutoriel
      </button>

      <h1 className="text-2xl font-bold mb-6">Mes Tutoriels</h1>

      <div className="grid grid-cols-1 gap-4">
        {tutorials.map((tuto) => (
          <div key={tuto.id} className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold">{tuto.titreTuto}</h2>
            <p className="text-gray-600 mb-2">{tuto.descriptionTuto}</p>
            <div className="flex gap-2">
              <Link
                href={`/dashboard/formateur/tutorials/${tuto.id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(tuto.id)}
                className="text-red-500 hover:underline"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Créer un nouveau tutoriel</h2>
            <form onSubmit={handleCreateTutorial} className="space-y-4">
              <input
                type="text"
                value={titreTuto}
                onChange={(e) => setTitreTuto(e.target.value)}
                placeholder="Titre du tutoriel"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                value={descriptionTuto}
                onChange={(e) => setDescriptionTuto(e.target.value)}
                placeholder="Description"
                className="w-full border p-2 rounded"
                required
              />

              {/* Selection de la formation */}
              <select
                value={formationId ?? ''}
                onChange={(e) => setFormationId(Number(e.target.value))}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Choisir une formation</option>
                {formations.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nomFormation}
                  </option>
                ))}
              </select>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const uploadedFile = e.target.files?.[0];
                  if (uploadedFile) setFile(uploadedFile);
                }}
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 hover:underline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

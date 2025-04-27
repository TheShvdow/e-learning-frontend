'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import axios from '@/lib/api';

export default function ProfilPage() {
  const { user, loading } = useUser();
  const [description, setDescription] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [etatDemande, setEtatDemande] = useState<string | null>(null);

  useEffect(() => {
    if (user?.etatDemande) {
      setEtatDemande(user.etatDemande);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      alert('Veuillez joindre un CV.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('cv', cvFile);

    try {
      await axios.post('/users/demande-formateur', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Votre demande a été soumise avec succès !');
    } catch (err) {
      console.error(err);
      setMessage('Une erreur est survenue lors de la soumission.');
    }
  };

  if (loading || !user) return <div>Chargement...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>

      <div className="bg-white shadow rounded p-6 space-y-2 mb-6">
        <p><strong>Nom :</strong> {user.nom} {user.prenom}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Username :</strong> {user.username}</p>
        <p><strong>Rôle :</strong> {user.role}</p>
        <p><strong>Bio :</strong> {user.bio}</p>
        

        {etatDemande && (
          <p className="mt-2 italic text-sm">
            Statut de la demande :{' '}
            {etatDemande === 'EN_ATTENTE' && <span className="text-yellow-600">🕒 En attente</span>}
            {etatDemande === 'ACCEPTEE' && <span className="text-green-600">✅ Acceptée</span>}
            {etatDemande === 'REFUSEE' && <span className="text-red-600">❌ Refusée</span>}
          </p>
        )}
      </div>

      {/* ➕ Affiche le formulaire uniquement si l'utilisateur est apprenant */}
      {user.role === 'APPRENANT' && !etatDemande && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold">Devenir formateur</h2>
          <p className="text-sm text-gray-600">Soumettez votre CV et décrivez vos expériences ou domaines d’expertise.</p>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block font-medium">CV (PDF, Word...)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              className="mt-1"
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Soumettre la demande
          </button>

          {message && <p className="mt-2 text-sm">{message}</p>}
        </form>
      )}
    </div>
  );
}

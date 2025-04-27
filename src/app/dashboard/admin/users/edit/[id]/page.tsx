/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import axios from '@/lib/api';
import { IUser } from '@/types/user';
import BackButton from '@/components/UI/BackButton';

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, loading } = useUser();

  const [formData, setFormData] = useState<Partial<IUser>>({
    nom: '',
    prenom: '',
    email: '',
    role: 'APPRENANT',
  });

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${params.id}`);
        setFormData(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement', error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${params.id}`, formData);
      alert('Utilisateur mis à jour avec succès');
      router.push('/dashboard/admin/users');
    } catch (error) {
      alert("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  if (loadingUser) return <div>Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
        <BackButton/>
      <h1 className="text-2xl font-bold mb-4">Modifier l&apos;utilisateur</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nom"
          type="text"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full p-2 border rounded"
        />
        <input
          name="prenom"
          type="text"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="ADMIN">Admin</option>
          <option value="FORMATEUR">Formateur</option>
          <option value="APPRENANT">Apprenant</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}

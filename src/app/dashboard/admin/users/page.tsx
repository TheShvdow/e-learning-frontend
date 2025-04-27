/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from '@/lib/api';
import { IUser } from '@/types/user';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminUserPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get(`/users/paginated?page=${page}&limit=${limit}&search=${search}`);
      setUsers(res.data.users);
      setTotalPages(Math.ceil(res.data.total / limit));
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 400);
    return () => clearTimeout(delay);
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/users/${id}`);
      fetchUsers(); // rechargement
    } catch (err) {
      alert('Erreur lors de la suppression de l’utilisateur.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <DashboardHeader title="Gestion des utilisateurs" />

        <input
          type="text"
          placeholder="Rechercher par nom, prénom ou email"
          className="mb-4 p-2 border w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loadingUsers ? (
          <p className="text-gray-600">Chargement des utilisateurs...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Nom</th>
                    <th className="p-2 border">Prénom</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Rôle</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{u.nom}</td>
                        <td className="p-2 border">{u.prenom}</td>
                        <td className="p-2 border">{u.email}</td>
                        <td className="p-2 border">{u.role}</td>
                        <td className="p-2 border space-x-2">
                          <Link href={`/dashboard/admin/users/edit/${u.id}`}>
                            <button className="text-blue-600 hover:underline">Modifier</button>
                          </Link>
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="text-red-600 hover:underline"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-2 text-center text-gray-500">
                        Aucun utilisateur trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

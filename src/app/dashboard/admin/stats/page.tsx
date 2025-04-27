'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import AdminSidebar from '@/components/dashboard/AdminSidebar';

interface Stats {
  users: number;
  formations: number;
  tutorials: number;
  cours: number;
  formateurs: number;
  apprenants: number;
  demandesEnAttente: number;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function StatistiquesPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) router.push('/');
  }, [loading, user, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Erreur récupération statistiques', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="p-6">Chargement...</div>;

  const pieData = [
    { name: 'Formateurs', value: stats.formateurs },
    { name: 'Apprenants', value: stats.apprenants },
    { name: 'Demandes', value: stats.demandesEnAttente },
  ];

  return (
    <div className="p-6 space-y-6">
        <AdminSidebar />
      <h1 className="text-3xl font-bold">📊 Statistiques générales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Utilisateurs" value={stats.users} />
        <StatCard title="Formations" value={stats.formations} />
        <StatCard title="Tutoriels" value={stats.tutorials} />
        <StatCard title="Cours" value={stats.cours} />
        <StatCard title="Formateurs" value={stats.formateurs} />
        <StatCard title="Apprenants" value={stats.apprenants} />
        <StatCard title="Demandes en attente" value={stats.demandesEnAttente} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Répartition des rôles</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-blue-600">{value}</p>
      </CardContent>
    </Card>
  );
}

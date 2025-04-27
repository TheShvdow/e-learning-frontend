'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/api';
import AdminSidebar from '@/components/dashboard/AdminSidebar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Users,
  GraduationCap,
  BookOpen,
  Book,
  BarChart2,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface GlobalStats {
  users: number;
  formations: number;
  tutorials: number;
  cours: number;
  formateurs: number;
  apprenants: number;
  demandesFormateur: number;
}


const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function AdminDashboardHome() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<GlobalStats | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/stats');
        setStats(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Erreur de chargement des stats :', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-6">Chargement...</div>;

  const pieData = [
    { name: 'Formateurs', value: stats.apprenants },
    { name: 'Apprenants', value: stats.formateurs },
    { name: 'Demandes', value: stats.demandesFormateur },
  ];
  

  const statCards = [
    {
      label: 'Utilisateurs',
      value: stats.users,
      icon: <Users className="text-blue-600" />,
    },
    {
      label: 'Formateurs',
      value: stats.formateurs,
      icon: <UserCheck className="text-green-600" />,
    },
    {
      label: 'Apprenants',
      value: stats.apprenants,
      icon: <GraduationCap className="text-orange-500" />,
    },
    {
      label: 'Formations',
      value: stats.formations,
      icon: <BookOpen className="text-purple-600" />,
    },
    {
      label: 'Tutoriels',
      value: stats.tutorials,
      icon: <Book className="text-pink-500" />,
    },
    {
      label: 'Cours',
      value: stats.cours,
      icon: <BarChart2 className="text-indigo-600" />,
    },
    {
      label: 'Demandes Formateur',
      value: stats.demandesFormateur,
      icon: <UserPlus className="text-red-500" />,
    },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Statistiques Globales</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-6">Répartition des rôles</h3>
        <div className='flex flex-row gap-4'>
        <Card className='mt-6 w-1/2'>
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
        {/* <Card className='mt-6 w-1/2'>
          <CardHeader>
            <CardTitle>Répartition des formations</CardTitle>
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
        </Card> */}
        </div>
      </main>
    </div>
  );
}

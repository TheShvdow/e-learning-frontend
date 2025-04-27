'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBookOpen, FaTrophy, FaUser } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import clsx from 'clsx';
import { useUser } from '@/context/UserContext';
import axios from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function ApprenantSidebar() {
  const pathname = usePathname();
  const { setUser } = useUser();
  const router = useRouter();

  const logout = async () => {
    await axios.post('/users/logout');
    setUser(null);
    router.push('/');
  };

  const menu = [
    { label: 'Mes tutoriels', href: '/dashboard/apprenant/tutoriels', icon: <FaBookOpen /> },
    { label: 'Certificats', href: '/dashboard/apprenant/certificats', icon: <FaTrophy /> },
    { label: 'Profil', href: '/profil', icon: <FaUser /> },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-md h-screen p-5">
      <h2 className="text-xl font-bold mb-8 text-gray-700">E-Learning</h2>
      <nav className="space-y-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100',
              pathname === item.href && 'bg-gray-200 font-medium'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-red-600 mt-8 hover:underline"
        >
          <FiLogOut />
          Déconnexion
        </button>
      </nav>
    </aside>
  );
}

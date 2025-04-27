// src/components/dashboard/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard/admin', label: 'Accueil' },
  { href: '/dashboard/admin/users', label: 'Utilisateurs' },
  { href: '/dashboard/admin/formations', label: 'Formations' },
  // { href: '/dashboard/admin/tutorials', label: 'Tutoriels' },
  // { href: '/dashboard/admin/cours', label: 'Cours' },
  // { href: '/dashboard/admin/certificats', label: 'Certificats' },
  // { href: '/dashboard/admin/stats', label: 'Statistiques' },
  { href: '/dashboard/admin/demandes-formateur', label: 'Demandes Formateur' },
  
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded hover:bg-gray-200 ${
              pathname === link.href ? 'bg-gray-300 font-semibold' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

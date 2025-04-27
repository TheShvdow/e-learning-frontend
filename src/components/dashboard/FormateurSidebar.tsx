'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard/formateur', label: 'Accueil' },
  { href: '/dashboard/formateur/tutorials', label: 'Mes Tutoriels' },
  { href: '/dashboard/formateur/cours', label: 'Mes Cours' },
  { href: '/dashboard/formateur/statistiques', label: 'Statistiques' },
];

export default function FormateurSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r">
      <h2 className="text-lg font-bold mb-6">Espace Formateur</h2>
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

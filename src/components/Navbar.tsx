'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Navbar() {
  const { user, loading, setUser } = useUser();
  const router = useRouter();

  if (loading) return null;

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include', // IMPORTANT pour les cookies
      });
  
      if (!res.ok) throw new Error('Logout échoué');
  
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      alert("La déconnexion a échoué.");
    }
  };
  

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-700 flex ">
          Jangu<span className="flex text-blue-600">Bi <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1" /><path d="M7 3v18" /><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" /></svg></span>
        </Link>
        <nav className="space-x-6">
          <Link href="/formations" className="hover:underline">Formations</Link>
          <Link href="/tutorials" className="hover:underline">Tutoriels</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/forum" className="hover:underline">Forum</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/dashboard" className="hover:underline">Tableau de bord</Link>


          {user ? (
            <>
              <span className="text-gray-600">👋 {user.prenom}</span>
              <button onClick={handleLogout} className="text-red-500 hover:underline">
                Se déconnecter
              </button>
            </>
          ) : (
            <Link href="/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

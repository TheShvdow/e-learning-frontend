// // src/app/layout.tsx
// import './globals.css';
// import Navbar from '../components/Navbar';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'E-Learning',
//   description: 'Plateforme e-learning avec Next.js & Node',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="fr">
//       <body className="min-h-screen bg-gray-50 text-gray-900">
//         <Navbar />
//         <main className="p-4">{children}</main>
//       </body>
//     </html>
//   );
// }


import './globals.css';
import Navbar from '../components/Navbar';
import { UserProvider } from '@/context/UserContext';

export const metadata = {
  title: 'E-Learning Platform',
  description: 'Apprenez efficacement avec des tutoriels et des cours !',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 text-gray-800">
        {/* <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-700 flex ">
              Jangu<span className="flex text-blue-600">Bi <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1" /><path d="M7 3v18" /><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" /></svg></span>
            </Link>
            <nav className="space-x-6">
              <Link href="/formations" className="hover:underline">
                Formations
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Tableau de bord
              </Link>
            </nav>
          </div>
        </header> */}
        <UserProvider>
        <Navbar />
        <main className="py-8 px-4">{children}</main>
        </UserProvider>
        <footer className=" w-full mt-10 border-t py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Jangu_Bi. Tous droits réservés.
        </footer>

      </body>
    </html>
  );
}

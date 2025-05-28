// src/app/layout.tsx
import './globals.css';
import { ThemeModeScript } from 'flowbite-react';
import { UserProvider } from '@/context/UserContext';
import Navbar from '@/components/UIComponents/Navbar';
import Footer from '@/components/UIComponents/Footer';

export const metadata = {
  title: 'E-Learning Platform',
  description: 'Apprenez efficacement avec des tutoriels et des cours !',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <ThemeModeScript />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <UserProvider>
         <Navbar />
            {children}
            
        </UserProvider>

       <Footer/>
      </body>
    </html>
  );
}

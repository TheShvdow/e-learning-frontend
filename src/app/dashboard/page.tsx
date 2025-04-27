/* eslint-disable @next/next/no-img-element */
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full" /> 
        <h1 className="text-2xl font-bold mt-4">{user.prenom} {user.nom}</h1>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Informations personnelles</h2>
        <p className="text-gray-600">Nom: {user.nom}</p>
        <p className="text-gray-600">Prénom: {user.prenom}</p>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>  
      </div>

      
      
    </>

  );
}

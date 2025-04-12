/* eslint-disable @next/next/no-img-element */
import { getCurrentUser } from '@/lib/auth';
import Image from 'next/image';


export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Tableau de bord</h1>

      <div className="flex items-center justify-center w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">

        <div className="text-lg mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-4">Bienvenue {user?.prenom} {user?.nom}👋</h1>
          <p className='mb-4'>Voici les informations de votre profil :</p>
          <p className='mb-4'>Username: {user?.username} </p>
          <p className='mb-4'>Role : {user?.role}</p>
          <p className='mb-4'>Email : {user?.email}</p>
          <textarea className='mb-4' placeholder='Modifier votre bio' defaultValue={user?.bio} /> 


        </div>
        
        <div className="flex flex-col gap-2">
          <img
              src={user?.avatar}
              alt='Avatar'
              className='p-4 rounded-lg object-cover '
              width={400}
              height={400}
              />


        </div>
      </div>

    </div>
  );
}

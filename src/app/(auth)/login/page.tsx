/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from '@/lib/api';

export default function LoginPage() {
  const { refreshUser } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/users/login', form, { withCredentials: true });
      await refreshUser();
      router.push('/');
    } catch (err) {
      alert('Connexion échouée');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl mb-4">Connexion</h1>
      {/* la connexione prend username ou email */}
      <form onSubmit={handleSubmit} className="space-y-4">
{/* permettre de switcher entre email et username */}

      {/* <div className="flex items-center">
          <input
            type="radio"
            name="loginType"
            value="email"
            checked={form.loginType === 'email'}
            onChange={handleChange}
          />
          <label className="ml-2">Email</label>
        </div>

        <div className="flex items-center">
          <input  
            type="radio"
            name="loginType"
            value="username"
            checked={form.loginType === 'username'}
            onChange={handleChange}
          />
          <label className="ml-2">Nom d&apos;utilisateur</label>
        </div> */}

        

        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
          className="border px-3 py-2 w-full"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Mot de passe"
          className="border px-3 py-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}

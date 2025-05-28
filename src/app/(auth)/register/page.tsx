/* eslint-disable @typescript-eslint/no-explicit-any */


'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/users/register', form);
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-slate-50 to-blue-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl'>Inscription</CardTitle>
          <CardDescription className='text-center'>Créez un compte gratuitement</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <Label>Nom</Label>
              <Input name="nom" value={form.nom} onChange={handleChange} />
            </div>
            <div>
              <Label>Prénom</Label>
              <Input name="prenom" value={form.prenom} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label>Nom d&apos;utilisateur</Label>
              <Input name="username" value={form.username} onChange={handleChange} />
            </div>
            <div>
              <Label>Mot de passe</Label>
              <Input type="password" name="password" value={form.password} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Inscription...' : "S'inscrire"}
            </Button>
            <p className="text-sm text-center">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

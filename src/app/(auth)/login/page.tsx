/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import axios from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const { refreshUser } = useUser();
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 🔍 Déterminer si l’identifiant est un email ou un username
    const isEmail = identifier.includes('@');

    try {
      const res = await axios.post('/users/login', {
        ...(isEmail ? { email: identifier } : { username: identifier }),
        password,
      });

      await refreshUser();
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-slate-50 to-blue-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl'>Connexion</CardTitle>
          <CardDescription className='text-center'>Connectez-vous à votre compte</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <Label>Nom d&apos;utilisateur ou Email</Label>
              <Input
                placeholder="nom_utilisateur ou email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Mot de passe</Label>
              <Input
                type="password"
                placeholder="mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            <p className="text-sm text-center">
              Pas encore de compte ?{' '}
              <Link href="/register" className="text-blue-600 hover:underline">
                S&apos;inscrire
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

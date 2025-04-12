'use server';

import axios from './api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const cookieStore = cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  try {
    const res = await axios.get('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return res.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    redirect('/login'); // redirige si non connecté
  }
}

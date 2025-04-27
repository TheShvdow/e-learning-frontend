/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/api';

export default function DemandeFormateurPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [motivation, setMotivation] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'APPRENANT')) {
      router.push('/');
    }
  }, [loading, user, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const uploadCV = async () => {
    if (!cvFile) return '';
    const formData = new FormData();
    formData.append('file', cvFile);
    formData.append('upload_preset', 'your_upload_preset'); // Cloudinary preset

    const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/raw/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uploadedCvUrl = await uploadCV();
      setCvUrl(uploadedCvUrl);

      await axios.post('/users/demander-formateur', {
        motivation,
        experienceProfessionnelle: experience,
        portfolioUrl: portfolio,
        cvUrl: uploadedCvUrl,
      });

      setSuccess(true);
    } catch (err) {
      alert("Erreur lors de l'envoi de la demande.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Soumettre une demande pour devenir Formateur</h1>

      {success ? (
        <p className="text-green-600">Votre demande a été envoyée avec succès !</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Motivation</label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              required
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Expérience professionnelle</label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Lien vers votre portfolio (LinkedIn, GitHub...)</label>
            <input
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">CV (PDF uniquement)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Envoyer ma demande
          </button>
        </form>
      )}
    </div>
  );
}

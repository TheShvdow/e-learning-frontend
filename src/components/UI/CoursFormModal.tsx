'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from '@/lib/api';

export default function CoursFormModal({
  tutorialId,
  onSuccess,
}: {
  tutorialId: number;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [titre, setTitre] = useState('');
  const [content, setContent] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titreCours', titre);
    formData.append('content', content);
    formData.append('tutorialId', tutorialId.toString());
    if (video) formData.append('video', video);
    if (pdf) formData.append('ressource', pdf);

    try {
      await axios.post('/cours', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess();
      setOpen(false);
    } catch (err) {
      console.error('Erreur création cours', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>➕ Ajouter un cours</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre du cours"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu"
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
          />
          <div className="flex justify-end">
            <Button type="submit">Créer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

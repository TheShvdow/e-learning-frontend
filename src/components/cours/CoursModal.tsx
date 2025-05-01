/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {  useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from '@/lib/api';

interface Props {
  cours?: {
    id: number;
    titreCours: string;
    content: string;
    videosUrl?: string;
  };
  onClose: () => void;
}

export default function CoursModal({ cours, onClose }: Props) {
    const [titreCours, setTitreCours] = useState('');
    const [content, setContent] = useState('');
    const [tutorialId, setTutorialId] = useState<number | null>(null); // à définir selon le contexte
    const [fileVideo, setFileVideo] = useState<File | null>(null);
    const [filePdf, setFilePdf] = useState<File | null>(null);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        if (!tutorialId) {
          alert('Aucun tutoriel sélectionné');
          return;
        }
      
        const formData = new FormData();
        formData.append('titreCours', titreCours);
        formData.append('content', content);
        formData.append('tutorialId', tutorialId.toString());
      
        if (fileVideo) {
          formData.append('video', fileVideo);
        }
      
        if (filePdf) {
          formData.append('ressource', filePdf);
        }
      
        try {
          const res = await axios.post('/cours', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          console.log('Cours créé !', res.data);
        } catch (err) {
          console.error('Erreur création cours', err);
        }
      };
      

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? 'Modifier le cours' : 'Créer un cours'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    value={titreCours}
    onChange={(e) => setTitreCours(e.target.value)}
    placeholder="Titre du cours"
    className="w-full border p-2 rounded"
    required
  />
  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Contenu du cours"
    className="w-full border p-2 rounded"
    required
  />
  <input
    type="file"
    accept="video/*"
    onChange={(e) => setFileVideo(e.target.files?.[0] || null)}
  />
  <input
    type="file"
    accept=".pdf"
    onChange={(e) => setFilePdf(e.target.files?.[0] || null)}
  />
  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
    Enregistrer
  </button>
</form>

      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from '@/lib/api';

interface Props {
  tutorialId: number;
  onClose: () => void;
}

export default function CoursModal({ tutorialId, onClose }: Props) {
  const [titreCours, setTitreCours] = useState('');
  const [descriptionCours, setDescriptionCours] = useState('');
  const [content, setContent] = useState('');
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titreCours', titreCours);
    formData.append('descriptionCours', descriptionCours);
    formData.append('content', content);
    formData.append('tutorialId', tutorialId.toString());
    if (fileVideo) formData.append('video', fileVideo);
    if (filePdf) formData.append('ressource', filePdf);

    try {
      setLoading(true);
      await axios.post('/cours', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onClose(); // ferme le modal
    } catch (err) {
      console.error('Erreur création cours', err);
      alert('Erreur lors de la création du cours.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Créer un cours</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Titre du cours"
            value={titreCours}
            onChange={(e) => setTitreCours(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description du cours"
            value={descriptionCours}
            onChange={(e) => setDescriptionCours(e.target.value)}
            required
          />
          <Textarea
            placeholder="Contenu"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Input type="file" accept="video/*" onChange={(e) => setFileVideo(e.target.files?.[0] || null)} />
          <Input type="file" accept=".pdf" onChange={(e) => setFilePdf(e.target.files?.[0] || null)} />
          <Button type="submit" disabled={loading}>
            {loading ? 'Création...' : 'Créer le cours'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

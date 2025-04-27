'use client';

import { useState } from 'react';
import axios from '@/lib/api';
import { toast } from 'sonner';

export default function CommentForm({
  tutorialId,
  onCommentPosted,
}: {
  tutorialId: number;
  onCommentPosted: () => void;
}) {
  const [contenu, setContenu] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contenu.trim()) return;

    setLoading(true);
    try {
      await axios.post(`/commentaires/tutorial/${tutorialId}`, {
        contenu,
      });
      setContenu('');
      onCommentPosted();
      toast.success('Commentaire ajouté avec succès');
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'ajout du commentaire");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <textarea
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        placeholder="Écrivez votre commentaire ici..."
        className="w-full p-2 border rounded mb-2 resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Envoi...' : 'Commenter'}
      </button>
    </form>
  );
}

// 📁 components/comments/ReplyForm.tsx
'use client';

import { useState } from 'react';
import axios from '@/lib/api';

type Props = {
  commentaireId: number;
  onReplySent: () => void; // pour rafraîchir la liste des réponses
};

export default function ReplyForm({ commentaireId, onReplySent }: Props) {
  const [contenu, setContenu] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!contenu.trim()) return;

    setLoading(true);
    try {
      await axios.post('/reponseCommentaires', {
        contenu,
        commentaireId, // 👈 correct
      });

      setContenu('');
      onReplySent(); // recharge les réponses
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la réponse :', err);
      alert('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col">
      <textarea
        placeholder="Votre réponse..."
        className="border rounded p-2 text-sm"
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        rows={3}
      />
      <button
        onClick={handleReply}
        disabled={loading}
        className="self-end mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
      >
        {loading ? 'Envoi...' : 'Répondre'}
      </button>
    </div>
  );
}

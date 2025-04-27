'use client';

import { useEffect, useCallback, useState } from 'react';
import axios from '@/lib/api';
import ReplyForm from './ReplyForm';

type Reponse = {
  id: number;
  contenu: string;
  createdAt: string;
  user: {
    nom: string;
    prenom: string;
  };
};

type Props = {
  commentaire: {
    id: number;
    contenu: string;
    createdAt: string;
    user: {
      nom: string;
      prenom: string;
    };
  };
};

export default function CommentItem({ commentaire }: Props) {
  const [reponses, setReponses] = useState<Reponse[]>([]);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const fetchReponses = useCallback(async () => {
    try {
      const res = await axios.get(`/reponseCommentaires/${commentaire.id}`);
      setReponses(res.data);
    } catch (err) {
      console.error('Erreur chargement réponses :', err);
    }
  }, [commentaire.id]);

  useEffect(() => {
    fetchReponses();
  }, [fetchReponses]);

  return (
    <div className="border p-4 rounded mb-4 bg-white shadow-sm">
      <p className="font-semibold">
        {commentaire.user.nom} {commentaire.user.prenom}
      </p>
      <p className="text-sm text-gray-700">{commentaire.contenu}</p>
      <p className="text-xs text-gray-400 mt-1">
        Posté le {new Date(commentaire.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="text-sm text-blue-600 mt-2 hover:underline"
      >
        {showReplyForm ? 'Annuler' : 'Répondre'}
      </button>

      {showReplyForm && (
        <ReplyForm
          commentaireId={commentaire.id}
          onReplySent={() => {
            fetchReponses();
            setShowReplyForm(false);
          }}
        />
      )}

      {reponses.length > 0 && (
        <ul className="ml-6 mt-4 border-l-2 pl-4 space-y-2">
          {reponses.map((rep) => (
            <li key={rep.id} className="text-sm text-gray-700">
              <p className="font-medium">{rep.user.nom} {rep.user.prenom}</p>
              <p>{rep.contenu}</p>
              <p className="text-xs text-gray-400">
                {new Date(rep.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

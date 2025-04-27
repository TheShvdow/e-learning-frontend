'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';


interface Commentaire {
    id: number;
    contenu: string;
    createdAt: string;
    user: {
        nom: string;
        prenom: string;
    };
}

export default function CommentList({ tutorialId }: { tutorialId: number }) {
    const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

    const fetchCommentaires = async () => {
        try {
            const res = await axios.get(`/commentaires/tutorial/${tutorialId}`);
            setCommentaires(res.data);
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires', error);
        }
    };

    useEffect(() => {
        fetchCommentaires();
    }, [tutorialId]);

    return (
        <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Commentaires</h3>

            {/* Formulaire ajout commentaire */}
            <CommentForm tutorialId={tutorialId} onCommentPosted={fetchCommentaires} />

            <div className="space-y-4">
                {commentaires.map((c) => (
                    <CommentItem key={c.id} commentaire={c} />
                ))}
            </div>
        </div>

    );
}

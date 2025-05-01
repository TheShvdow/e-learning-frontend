/* eslint-disable react-hooks/exhaustive-deps */
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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Component qui affiche la liste des commentaires pour un tutoriel.
 *
 * Il utilise le hook d'effet pour charger les commentaires pour le tutoriel
 * en cours, et un hook d'etat pour stocker les commentaires.
 *
 * Il affiche un formulaire pour ajouter un commentaire, et une liste des
 * commentaires deja present.
 *
 * @param {{ tutorialId: number }} props
 * @param {number} props.tutorialId Identifiant du tutoriel
 */
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

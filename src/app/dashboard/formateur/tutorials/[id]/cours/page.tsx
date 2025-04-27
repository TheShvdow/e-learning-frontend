'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from '@/lib/api';

export default function CreateCoursPage() {
  const { id } = useParams(); // Récupère l'id du tutoriel
  const tutorialId = Number(id);
  const router = useRouter();

  const [titreCours, setTitreCours] = useState('');
  const [content, setContent] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('titreCours', titreCours);
    formData.append('content', content);
    formData.append('tutorialId', tutorialId.toString());

    if (videoFile) formData.append('video', videoFile);
    if (pdfFile) formData.append('ressource', pdfFile);

    try {
      await axios.post('/cours', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Cours créé avec succès

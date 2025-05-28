// //src/app/dashboard/formateur/tutorials/[id]/cours/page.tsx
// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { useState } from 'react';
// import axios from '@/lib/api';

// export default function CreateCoursPage() {
//   const router = useRouter();
//   const { id } = useParams(); // tutorialId depuis l'URL
//   const tutorialId = Number(id);

//   const [titreCours, setTitreCours] = useState('');
//   const [content, setContent] = useState('');
//   const [video, setVideo] = useState<File | null>(null);
//   const [ressource, setRessource] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('titreCours', titreCours);
//     formData.append('content', content);
//     formData.append('tutorialId', tutorialId.toString());

//     if (video) formData.append('video', video);
//     if (ressource) formData.append('ressource', ressource);

//     try {
//       await axios.post('/cours', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Cours créé avec succès !');
//       router.push(`/dashboard/formateur/tutorials/${tutorialId}`); // redirige vers la liste des cours/tuto
//     } catch (error) {
//       console.error('Erreur création cours:', error);
//       alert('Erreur lors de la création du cours');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return ()

//     // <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
//     //   <h2 className="text-2xl font-bold mb-4">Créer un nouveau cours</h2>
//     //   <form onSubmit={handleSubmit} className="space-y-4">
//     //     <input
//     //       type="text"
//     //       placeholder="Titre du cours"
//     //       value={titreCours}
//     //       onChange={(e) => setTitreCours(e.target.value)}
//     //       className="w-full border p-2 rounded"
//     //       required
//     //     />
//     //     <textarea
//     //       placeholder="Contenu du cours"
//     //       value={content}
//     //       onChange={(e) => setContent(e.target.value)}
//     //       className="w-full border p-2 rounded"
//     //       required
//     //     ></textarea>

//     //     <div>
//     //       <label className="block text-sm font-medium">Vidéo (MP4, MOV...)</label>
//     //       <input
//     //         type="file"
//     //         accept="video/*"
//     //         onChange={(e) => setVideo(e.target.files?.[0] || null)}
//     //       />
//     //     </div>

//     //     <div>
//     //       <label className="block text-sm font-medium">Support PDF (optionnel)</label>
//     //       <input
//     //         type="file"
//     //         accept=".pdf"
//     //         onChange={(e) => setRessource(e.target.files?.[0] || null)}
//     //       />
//     //     </div>

//     //     <button
//     //       type="submit"
//     //       disabled={loading}
//     //       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//     //     >
//     //       {loading ? 'Création en cours...' : 'Créer le cours'}
//     //     </button>
//     //   </form>
//     // </div>
//   )
// }

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import CoursModal from '@/components/cours/CoursModal';

export default function CreateCoursPage() {
  const router = useRouter();
  const { id } = useParams(); // tutorialId depuis l'URL
  const tutorialId = Number(id);
  const [open, setOpen] = useState(true); // pour afficher la modale dès l'ouverture

  const handleClose = () => {
    setOpen(false);
    router.push(`/dashboard/formateur/tutorials/${tutorialId}`); // redirige après fermeture
  };

  return (
    <>
      {open && (
        <CoursModal
          tutorialId={tutorialId}
          onClose={handleClose}
        />
      )}
    </>
  );
}

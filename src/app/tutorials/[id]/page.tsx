// ✅ Ceci est une page "server component" qui appelle un composant "client"
import TutorialDetail from '@/components/tutorials/TutorialDetail'; // <-- Vérifie le bon chemin

export default function TutorialPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return <div>Paramètre invalide</div>;

  return <TutorialDetail id={id} />;
}

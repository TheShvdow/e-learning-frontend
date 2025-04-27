export interface IUser {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    avatar?: string;
    role: 'ADMIN' | 'APPRENANT' | 'FORMATEUR';
    bio?: string;
    demandeRoleFormateur : boolean;
    motivationFormateur?: string;
    experienceProfessionnelle?: string;
    cvUrl?: string;
    portfolioUrl?:string;
  }
  
// 'use client'
// import { useState } from "react";
// import { registerUser } from "@/services/user.service";
// import { useRouter } from "next/navigation";


// export default function RegisterPage() {
//     const [form, setForm] = useState({ email: '', password: '', username: '', nom: '', prenom: '' , bio: '',role : 'APPRENANT' , avatar : ''});
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const res = await registerUser(form);
//             console.log('✅ Connecté :', res);
//             router.push('/'); // redirige après connexion
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (err: any) {
//             setError(err?.response?.data?.message || 'Erreur lors de la connexion');
//             console.error('❌', err);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
//             <h1 className="text-xl font-semibold">Inscription</h1>

//             <input
//                 type="text"
//                 placeholder="Nom"
//                 className="w-full border p-2 text-gray-700"
//                 value={form.nom}
//                 onChange={(e) => setForm({ ...form, nom: e.target.value })}
//                 required
//             />
//             <input
//                 type="text"
//                 placeholder="Prénom"
//                 className="w-full border p-2 text-gray-700"
//                 value={form.prenom}
//                 onChange={(e) => setForm({ ...form, prenom: e.target.value })}
//                 required
//             />

//             <input
//                 type="text"
//                 placeholder="Nom d'utilisateur"
//                 className="w-full border p-2 text-gray-700"
//                 value={form.username}
//                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//                 required
//             />

//             <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border p-2 text-gray-700"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Mot de passe"
//                 className="w-full border p-2 text-gray-700"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//             />

//             <input type="password" 
//             placeholder="Confirmer le mot de passe"
//             className="w-full border p-2 text-gray-700"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//             />
//             <textarea
//                 placeholder="Bio"
//                 className="w-full border p-2 text-gray-700"
//                 value={form.bio}
//                 onChange={(e) => setForm({ ...form, bio: e.target.value })}
//             />
//            <input 
//            type="text" 
//            placeholder="Role" 
//            className=" hidden w-full border p-2 text-gray-700"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//             required

//              />
//              <input type="file"
//              className="w-full border p-2 text-gray-700"
//                 value={form.avatar}
//                 onChange={(e) => setForm({ ...form, avatar: e.target.value })}
//               />
           
//             <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
//             >
//                 S&apos;inscrire
//             </button>
//             {error && <p className="text-red-500">{error}</p>}
//         </form>
//     );
// }

<h1 className="text-2xl font-bold mb-6">Inscription</h1>
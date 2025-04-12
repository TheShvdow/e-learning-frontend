/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";

type Cours = {
    id: number;
    titreCours: string;
    photo: string;
    content: string;
    
};


export default function CoursCard( { cours }: { cours: Cours }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <img src={cours.photo} alt={cours.titreCours} className="w-full h-48 object-cover mb-4" />
          <h2 className="text-xl font-semibold mb-2">{cours.titreCours}</h2>    
            <p className="text-gray-600 mb-4">{cours.content}</p>
            <Link href={`/cours/${cours.id}`} className="text-blue-600 hover:underline">
                Voir le cours
            </Link>
        </div>
    );
}
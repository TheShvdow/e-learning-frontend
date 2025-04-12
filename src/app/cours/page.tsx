/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState,useEffect } from "react"
import axios from '@/lib/api';
import CoursCard from '@/components/CoursCard';

export default function CoursPage(){
  
    //fetch all cours 

    const [cours, setCours] = useState([]);
    useEffect(() => {
        axios.get('/cours')
          .then(res => setCours(res.data))
          .catch(() => alert("Erreur lors du chargement des cours."));
      }, []);
    //fetch all cours
    //fetch all cours

      return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Tous les tutoriels</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cours.map((cours: any) => (
                <CoursCard key={cours.id} cours={cours} />
              ))}
            </div>
          </div>
        );


    
}
'use client';

import { useEffect, useState } from 'react';
import type { Service } from '@/lib/firebaseAdmin';
import { getServices } from '@/lib/firebaseAdmin';

export const fallbackServices: Service[] = [
    {
        title: 'Box para Banheiro',
        description:
            'Box de vidro temperado sob medida para banheiros. Modelos de correr, de abrir e incolor ou fumê, com perfis em alumínio de alta resistência.',
        mainImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        featured: false,
    },
    {
        title: 'Esquadrias de Alumínio',
        description:
            'Esquadrias premium com vedação termoacústica superior. Janelas de correr, maxim-ar, portas pivotantes e portas de vidro com design personalizado.',
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        featured: true,
    },
    {
        title: 'Guarda-Corpo de Vidro',
        description:
            'Guarda-corpo em vidro laminado ou temperado para sacadas, escadas e mezaninos. Máxima segurança com elegância e visão panorâmica.',
        mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        featured: false,
    },
    {
        title: 'Vidros Temperados',
        description:
            'Vidros temperados de alta resistência para fachadas, vitrines, divisórias e fechamentos. Segurança e durabilidade garantidas.',
        mainImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        featured: false,
    },
    {
        title: 'Espelhos Decorativos',
        description:
            'Espelhos sob medida para banheiros, closets e salas. Bisotê, lapidação e formatos especiais para transformar seus ambientes.',
        mainImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80',
        gallery: [],
        featured: false,
    },
];

let cache: Promise<Service[]> | null = null;

/** Loads services once per page (shared by the services showcase and the quote form). */
export function useServices(): Service[] {
    const [services, setServices] = useState<Service[]>(fallbackServices);

    useEffect(() => {
        let active = true;
        cache ??= getServices().catch((error) => {
            console.error('Error loading services from Firestore:', error);
            return [];
        });
        cache.then((data) => {
            if (active && data.length > 0) setServices(data);
        });
        return () => {
            active = false;
        };
    }, []);

    return services;
}

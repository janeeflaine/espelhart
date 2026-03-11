'use client';

import { useState, useEffect } from 'react';
import { ShowerHead, DoorOpen, Fence, Layers, Sparkles, ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/firebaseAdmin';

const fallbackServices = [
    {
        title: 'Box para Banheiro',
        description:
            'Box de vidro temperado sob medida para banheiros. Modelos de correr, de abrir e incolor ou fumê, com perfis em alumínio de alta resistência.',
        mainImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80',
        gallery: [],
        featured: false,
    },
    {
        title: 'Esquadrias de Alumínio',
        description:
            'Esquadrias premium com vedação termoacústica superior. Janelas de correr, maxim-ar, portas pivotantes e portas de vidro com design personalizado.',
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        gallery: [],
        featured: true,
    },
    {
        title: 'Guarda-Corpo de Vidro',
        description:
            'Guarda-corpo em vidro laminado ou temperado para sacadas, escadas e mezaninos. Máxima segurança com elegância e visão panorâmica.',
        mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
        gallery: [],
        featured: false,
    },
    {
        title: 'Vidros Temperados',
        description:
            'Vidros temperados de alta resistência para fachadas, vitrines, divisórias e fechamentos. Segurança e durabilidade garantidas.',
        mainImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=600&q=80',
        gallery: [],
        featured: false,
    },
    {
        title: 'Espelhos Decorativos',
        description:
            'Espelhos sob medida para banheiros, closets e salas. Bisotê, lapidação e formatos especiais para transformar seus ambientes.',
        mainImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80',
        gallery: [],
        featured: false,
    },
];

const iconMap: Record<string, typeof ShowerHead> = {
    'Box para Banheiro': ShowerHead,
    'Esquadrias de Alumínio': DoorOpen,
    'Guarda-Corpo de Vidro': Fence,
    'Vidros Temperados': Layers,
    'Espelhos Decorativos': Sparkles,
};

function getIcon(title: string) {
    return iconMap[title] || Sparkles;
}

export default function ServicesGrid() {
    const [services, setServices] = useState<Service[]>(fallbackServices as Service[]);

    useEffect(() => {
        async function loadServices() {
            try {
                const { getServices } = await import('@/lib/firebaseAdmin');
                const data = await getServices();
                if (data.length > 0) {
                    setServices(data);
                }
            } catch (error) {
                console.error('Error loading services from Firestore:', error);
                // Keep fallback data
            }
        }
        loadServices();
    }, []);

    return (
        <section id="servicos" className="py-16 sm:py-20 lg:py-24 bg-espelhart-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-espelhart-accent font-semibold tracking-widest uppercase text-sm">
                        O que fazemos
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-espelhart-darkest mt-2 mb-4">
                        Nossos Serviços
                    </h2>
                    <div className="w-20 h-1 bg-espelhart-accent mx-auto rounded-full" />
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                        Oferecemos soluções completas em vidros e esquadrias de alumínio para projetos residenciais e comerciais.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service) => {
                        const Icon = getIcon(service.title);
                        return (
                            <article
                                key={service.title}
                                className={`group rounded-2xl overflow-hidden shadow-md hover-lift relative ${service.featured
                                    ? 'bg-espelhart-darkest text-white border-b-4 border-espelhart-accent md:scale-105 z-10 shadow-2xl'
                                    : 'bg-white text-gray-800 border-b-4 border-espelhart-medium'
                                    }`}
                            >
                                {/* Featured Badge */}
                                {service.featured && (
                                    <div className="absolute top-4 right-4 z-20 bg-espelhart-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                        Mais Procurado
                                    </div>
                                )}

                                {/* Image */}
                                {service.mainImage && (
                                    <div className="relative h-48 sm:h-52 overflow-hidden">
                                        <img
                                            src={service.mainImage}
                                            alt={service.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className={`absolute inset-0 ${service.featured ? 'bg-espelhart-darkest/30' : 'bg-espelhart-darkest/10'} group-hover:bg-transparent transition-colors`} />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 sm:p-8">
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.featured
                                            ? 'bg-espelhart-accent'
                                            : 'bg-espelhart-medium'
                                            }`}
                                    >
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    <h3
                                        className={`text-xl font-bold mb-3 ${service.featured ? 'text-white' : 'text-espelhart-darkest'
                                            }`}
                                    >
                                        {service.title}
                                    </h3>

                                    <p
                                        className={`text-sm leading-relaxed mb-6 ${service.featured ? 'text-gray-300' : 'text-gray-600'
                                            }`}
                                    >
                                        {service.description}
                                    </p>

                                    <a
                                        href={`https://wa.me/5500000000000?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20serviço%20de%20${encodeURIComponent(service.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 font-semibold text-sm group/link transition-colors ${service.featured
                                            ? 'text-espelhart-accent hover:text-espelhart-light'
                                            : 'text-espelhart-medium hover:text-espelhart-accent'
                                            }`}
                                    >
                                        Ver Detalhes
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

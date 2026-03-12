'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/firebaseAdmin';

interface TestimonialItem {
    name: string;
    text: string;
    rating: number;
    date?: string;
    avatar?: string;
}

const fallbackTestimonials: TestimonialItem[] = [
    {
        name: 'Ricardo Souza',
        text: 'Instalei janelas de alumínio em todo o meu apartamento. O acabamento é excelente e os instaladores foram muito profissionais. Recomendo demais!',
        rating: 5,
        date: 'Há 2 meses',
    },
    {
        name: 'Mariana Silva',
        text: 'O box do banheiro ficou incrível! Vidro temperado perfeito, sem nenhum defeito. O atendimento da Espelhart superou minhas expectativas.',
        rating: 5,
        date: 'Há 1 mês',
    },
    {
        name: 'Carlos Eduardo',
        text: 'Preço justo e qualidade de primeira. O guarda-corpo de vidro da varanda ficou lindo, vedação perfeita. Zero barulho da rua com as esquadrias.',
        rating: 5,
        date: 'Há 3 semanas',
    },
    {
        name: 'Ana Beatriz',
        text: 'Fiz o fechamento da sacada com vidro temperado e ficou espetacular. A equipe foi pontual, limpa e extremamente competente.',
        rating: 5,
        date: 'Há 1 semana',
    },
    {
        name: 'Fernando Costa',
        text: 'Profissionalismo impecável. Desde a medição até a instalação, a equipe foi muito cuidadosa. As janelas ficaram maravilhosas.',
        rating: 5,
        date: 'Há 2 semanas',
    },
    {
        name: 'Juliana Oliveira',
        text: 'Qualidade superior! As esquadrias de alumínio estão em outro nível. O acabamento é perfeito. Recomendo fortemente para projetos de alto padrão.',
        rating: 5,
        date: 'Há 5 dias',
    },
];

function getInitials(name: string) {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);

    useEffect(() => {
        async function loadTestimonials() {
            try {
                const data = await getTestimonials();
                if (data.length > 0) {
                    setTestimonials(data);
                }
            } catch (error) {
                console.error('Error loading testimonials from Firestore:', error);
            }
        }
        loadTestimonials();
    }, []);

    return (
        <section id="depoimentos" className="py-16 sm:py-20 lg:py-24 bg-espelhart-darkest">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-espelhart-accent font-semibold tracking-widest uppercase text-sm">
                        Avaliações
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                        O que nossos clientes dizem
                    </h2>
                    <div className="w-20 h-1 bg-espelhart-accent mx-auto rounded-full" />
                    <div className="mt-4 inline-flex items-center gap-2 text-gray-400 text-sm">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <span>4.9/5 estrelas no Google</span>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl hover:bg-white/10 transition-colors group"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-espelhart-accent/20 text-espelhart-accent rounded-full flex items-center justify-center font-bold text-sm">
                                        {getInitials(testimonial.name)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                                        <p className="text-xs text-gray-500">{testimonial.date || 'Cliente'}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 gap-0.5">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                    ))}
                                </div>
                            </div>

                            {/* Text */}
                            <p className="text-gray-300 text-sm italic leading-relaxed">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

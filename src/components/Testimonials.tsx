'use client';

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTestimonials } from '@/lib/useTestimonials';
import { useSettings } from '@/lib/SettingsContext';

function initials(name: string) {
    return name.split(' ').filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function Stars({ value, size = 'w-4 h-4' }: { value: number; size?: string }) {
    const rounded = Math.round(value);
    return (
        <span className="flex gap-0.5 text-[#E8A33D]" aria-label={`${value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} de 5 estrelas`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`${size} ${i < rounded ? 'fill-current' : 'opacity-30'}`} aria-hidden="true" />
            ))}
        </span>
    );
}

export default function Testimonials() {
    const items = useTestimonials();
    const settings = useSettings();
    const rail = useRef<HTMLUListElement>(null);

    // Hidden until real testimonials are registered in the admin panel.
    if (items.length === 0) return null;

    const average = items.reduce((sum, t) => sum + (Number(t.rating) || 0), 0) / items.length;

    const scroll = (dir: 1 | -1) => {
        const el = rail.current;
        if (!el) return;
        const card = el.querySelector('li');
        el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: 'smooth' });
    };

    return (
        <section id="depoimentos" className="py-16 sm:py-20 lg:py-28 bg-mist overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                    <div>
                        <h2 className="font-wide text-balance text-3xl sm:text-4xl font-bold text-ink leading-[1.08]">
                            {settings.testimonialsTitle}
                        </h2>
                        <div className="mt-4 flex items-center gap-3 text-sm text-muted">
                            <Stars value={average} />
                            <span>
                                Média {average.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} em {items.length} avaliações
                            </span>
                        </div>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <button type="button" onClick={() => scroll(-1)} aria-label="Depoimentos anteriores" className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-paper">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button type="button" onClick={() => scroll(1)} aria-label="Próximos depoimentos" className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-paper">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <ul
                    ref={rail}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
                >
                    {items.map((t, i) => (
                        <li
                            key={t.id ?? `${t.name}-${i}`}
                            className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] bg-paper rounded-md p-6 sm:p-7 flex flex-col"
                        >
                            <Stars value={Number(t.rating) || 0} />
                            <blockquote className="mt-4 text-[16px] leading-relaxed text-ink flex-1">{t.text}</blockquote>
                            <div className="mt-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-mist text-teal font-semibold text-sm flex items-center justify-center">
                                    {initials(t.name)}
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-ink">{t.name}</span>
                                    <span className="block text-xs text-muted">{t.date || 'Cliente'}</span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

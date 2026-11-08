'use client';

import { useState } from 'react';
import { useServices } from '@/lib/useServices';
import { useQuote } from '@/lib/QuoteContext';

export default function ServicesGrid() {
    const services = useServices();
    const { requestQuote } = useQuote();
    const [selected, setSelected] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    // Default to the featured service of whatever list is loaded (fallback or Firestore).
    let index = services.findIndex((s) => s.title === selected);
    if (index < 0) index = Math.max(0, services.findIndex((s) => s.featured));
    const active = services[index];
    if (!active) return null;

    const images = [active.mainImage, ...(active.gallery || [])].filter(Boolean);
    const shown = photo && images.includes(photo) ? photo : images[0];

    const select = (i: number) => {
        setSelected(services[i].title);
        setPhoto(null);
    };

    return (
        <section id="servicos" className="py-16 sm:py-20 lg:py-28 bg-paper">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-10 lg:mb-14">
                    <h2 className="font-wide text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ink leading-[1.08]">
                        O que fazemos para sua casa ou empresa
                    </h2>
                    <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
                        Escolha um serviço para ver detalhes e fotos. Cada peça é medida, cortada e instalada pela nossa equipe.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-14">
                    {/* Service list */}
                    <div
                        role="tablist"
                        aria-label="Serviços"
                        className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:border-t lg:border-line"
                    >
                        {services.map((s, i) => {
                            const isSelected = i === index;
                            return (
                                <button
                                    key={s.id ?? s.title}
                                    role="tab"
                                    id={`tab-servico-${i}`}
                                    aria-selected={isSelected}
                                    aria-controls="painel-servico"
                                    onClick={() => select(i)}
                                    className={`group shrink-0 text-left transition-colors
                                        rounded-full lg:rounded-none px-4 py-2.5 lg:px-0 lg:py-5 lg:border-b lg:border-line
                                        ${isSelected ? 'bg-ink text-white lg:bg-transparent lg:text-ink' : 'bg-mist text-ink lg:bg-transparent lg:text-muted hover:lg:text-ink'}`}
                                >
                                    <span className="flex items-center justify-between gap-4">
                                        <span className="text-sm lg:font-wide lg:text-2xl font-semibold whitespace-nowrap lg:whitespace-normal">
                                            {s.title}
                                        </span>
                                        {s.featured && (
                                            <span className="hidden lg:inline text-xs font-medium text-teal bg-mist px-2.5 py-1 rounded-full">
                                                Mais procurado
                                            </span>
                                        )}
                                    </span>
                                    {isSelected && (
                                        <span className="hidden lg:block mt-3 text-[15px] leading-relaxed text-muted max-w-md">
                                            {s.description}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Showcase */}
                    <div id="painel-servico" role="tabpanel" aria-labelledby={`tab-servico-${index}`}>
                        <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-mist">
                            {shown && (
                                <img
                                    key={shown}
                                    src={shown}
                                    alt={`${active.title} instalado pela Espelhart`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                    width={1200}
                                    height={900}
                                />
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar" aria-label="Mais fotos">
                                {images.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        onClick={() => setPhoto(src)}
                                        aria-label={`Ver foto ${i + 1} de ${images.length}`}
                                        aria-pressed={src === shown}
                                        className={`shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${src === shown ? 'border-teal' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <p className="lg:hidden mt-5 text-[15px] leading-relaxed text-muted">{active.description}</p>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                            <button
                                type="button"
                                onClick={() => requestQuote(active.title)}
                                className="inline-flex items-center justify-center bg-ink hover:bg-ink-2 text-white px-6 py-3.5 rounded-md font-semibold transition-colors"
                            >
                                Orçar {active.title.toLowerCase()}
                            </button>
                            <span className="text-sm text-muted">Orçamento gratuito e sem compromisso.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

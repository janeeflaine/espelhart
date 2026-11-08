'use client';

import { ShieldCheck, Award } from 'lucide-react';
import { useSettings } from '@/lib/SettingsContext';

export default function About() {
    const settings = useSettings();

    const stats = settings.aboutStats.filter((s) => s.value || s.label);
    const highlights = settings.aboutHighlights.filter(Boolean);

    return (
        <section id="sobre" className="bg-ink text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 lg:order-1 relative">
                    <img
                        src={settings.aboutImage}
                        alt="Obra entregue pela Espelhart"
                        className="w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] object-cover rounded-md"
                        loading="lazy"
                        width={1000}
                        height={1250}
                    />
                    <div className="absolute inset-y-6 -right-3 w-3 bg-edge/70 rounded-r" aria-hidden="true" />
                </div>

                <div className="order-1 lg:order-2">
                    <p className="text-sm font-medium text-teal-light mb-4">Quem somos</p>
                    <h2 className="font-wide text-balance text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.1] whitespace-pre-line">
                        {settings.aboutTitle}
                    </h2>

                    <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-white/75 max-w-xl">
                        {settings.aboutText ? (
                            <p className="whitespace-pre-line">{settings.aboutText}</p>
                        ) : (
                            <>
                                <p>
                                    A Espelhart nasceu do desejo de oferecer soluções em vidros e esquadrias que unam o
                                    rigor técnico à estética arquitetônica. Com anos de mercado, nos tornamos referência
                                    pela precisão na instalação e pelo compromisso com prazos.
                                </p>
                                <p>
                                    Nossa equipe usa tecnologia de ponta para que cada peça, seja um box, um guarda-corpo
                                    ou uma esquadria de alumínio, fique exatamente como você imaginou.
                                </p>
                            </>
                        )}
                    </div>

                    <dl className="mt-10 flex border-y border-white/15">
                        {stats.map((stat, i) => (
                            <div key={i} className={`flex-1 py-6 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-white/15' : ''}`}>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd className="font-wide text-2xl sm:text-4xl font-bold">{stat.value}</dd>
                                <dd className="mt-1 text-xs sm:text-sm text-white/60">{stat.label}</dd>
                            </div>
                        ))}
                    </dl>

                    <ul className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
                        {highlights.map((h, i) => {
                            const Icon = i === 0 ? Award : ShieldCheck;
                            return (
                                <li key={i} className="flex items-center gap-3 text-[15px] font-medium">
                                    <Icon className="w-5 h-5 text-teal-light shrink-0" aria-hidden="true" />
                                    {h}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}

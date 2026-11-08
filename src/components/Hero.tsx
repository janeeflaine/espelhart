'use client';

import { Check } from 'lucide-react';
import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';
import { useQuote } from '@/lib/QuoteContext';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const promises = ['Orçamento gratuito', 'Medição no local', 'Peças sob medida', 'Garantia em todos os serviços'];

export default function Hero() {
    const settings = useSettings();
    const { requestQuote } = useQuote();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, 'Olá! Vim pelo site e gostaria de um orçamento.');

    return (
        <section id="inicio" className="relative bg-mist overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 lg:pt-20 lg:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
                <div>
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-teal mb-5">
                        <span className="w-6 h-px bg-teal" aria-hidden="true" />
                        {settings.heroBadge || 'Referência em Vidraçaria de Alto Padrão'}
                    </p>

                    <h1 className="font-wide text-balance text-[2.15rem] leading-[1.04] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-bold text-ink whitespace-pre-line">
                        {settings.heroTitle || 'Vidros e Esquadrias\nde Alto Padrão'}
                    </h1>

                    <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted max-w-[34rem] whitespace-pre-line">
                        {settings.heroSubtitle ||
                            'Transformamos seus projetos em realidade com qualidade premium, acabamento impecável e atendimento personalizado.'}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={() => requestQuote()}
                            className="inline-flex items-center justify-center bg-ink hover:bg-ink-2 text-white px-7 py-4 rounded-md font-semibold text-base transition-colors"
                        >
                            Pedir orçamento gratuito
                        </button>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2.5 bg-wa hover:bg-wa-dark text-ink px-7 py-4 rounded-md font-semibold text-base transition-colors"
                        >
                            <WhatsAppIcon />
                            Conversar no WhatsApp
                        </a>
                    </div>

                    <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 max-w-lg">
                        {promises.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-sm font-medium text-ink">
                                <Check className="w-4 h-4 text-teal shrink-0" aria-hidden="true" />
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Signature: sliding aluminium window that opens once on load */}
                <div className="relative mx-auto w-full max-w-[560px]">
                    <div className="window-frame">
                        <div className="relative aspect-[4/3] lg:aspect-[5/6] overflow-hidden rounded-[2px] bg-ink">
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80"
                                alt="Sala ampla com grandes painéis de vidro e esquadrias de alumínio"
                                className="absolute inset-0 w-full h-full object-cover"
                                width={1100}
                                height={1320}
                                fetchPriority="high"
                            />
                            <div className="window-sash window-sash--fixed" aria-hidden="true" />
                            <div className="window-sash window-sash--moving" aria-hidden="true" />
                            {/* track rails */}
                            <div className="absolute inset-x-0 top-0 h-[6px] bg-[#9AA6A9]" aria-hidden="true" />
                            <div className="absolute inset-x-0 bottom-0 h-[6px] bg-[#7C898D]" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="absolute -bottom-5 left-4 sm:-left-6 bg-paper rounded-md shadow-lg px-4 py-3 border border-line">
                        <p className="text-xs text-muted">Atendimento</p>
                        <p className="text-sm font-semibold text-ink">Seg a sex 8h–18h, sáb 8h–12h</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

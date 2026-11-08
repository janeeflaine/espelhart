'use client';

import { Users, Cpu, Clock, ShieldCheck } from 'lucide-react';
import { useSettings } from '@/lib/SettingsContext';

const icons = [Users, Cpu, Clock, ShieldCheck];

export default function WhyChooseUs() {
    const settings = useSettings();

    const features =
        settings.features && settings.features.length > 0
            ? settings.features
            : [
                  { title: 'Equipe Especializada', description: 'Profissionais altamente treinados e certificados para instalações complexas de vidros e esquadrias.' },
                  { title: 'Alta Tecnologia', description: 'Utilizamos maquinário de ponta e materiais de última geração para corte e acabamento perfeitos.' },
                  { title: 'Prazos Rigorosos', description: 'Cronogramas respeitados do início ao fim, sem atrasos ou surpresas. Compromisso com sua obra.' },
                  { title: 'Garantia Estendida', description: 'Segurança total com suporte pós-venda e garantia de fabricação em todos os nossos produtos.' },
              ];

    return (
        <section className="py-16 sm:py-20 lg:py-28 bg-paper">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-16">
                <div>
                    <h2 className="font-wide text-balance text-3xl sm:text-4xl font-bold text-ink leading-[1.08] whitespace-pre-line">
                        {settings.featuresTitle || 'Por que escolher a Espelhart?'}
                    </h2>
                    <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed whitespace-pre-line">
                        {settings.featuresSubtitle ||
                            'Combinamos técnica avançada e atendimento personalizado para garantir o sucesso da sua obra.'}
                    </p>
                </div>

                <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                    {features.map((item, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <li key={i} className="flex gap-4">
                                <span className="w-11 h-11 shrink-0 rounded-md bg-mist flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-teal" aria-hidden="true" />
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold text-ink whitespace-pre-line">{item.title}</h3>
                                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted whitespace-pre-line">
                                        {item.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

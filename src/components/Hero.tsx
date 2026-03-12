'use client';

import { MessageCircle, ArrowDown } from 'lucide-react';
import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';

export default function Hero() {
    const settings = useSettings();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, 'Olá! Gostaria de solicitar um orçamento para meu projeto.');

    return (
        <section
            id="inicio"
            className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
                    alt="Arquitetura moderna com vidros e esquadrias de alto padrão"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-espelhart-darkest/80 via-espelhart-darkest/60 to-espelhart-darkest/90" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                    <div className="w-2 h-2 bg-espelhart-accent rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-espelhart-light">
                        {settings.heroBadge || 'Referência em Vidraçaria de Alto Padrão'}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight whitespace-pre-line break-words">
                    {settings.heroTitle || 'Vidros e Esquadrias\nde Alto Padrão'}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-gray-300 font-light leading-relaxed whitespace-pre-line break-words">
                    {settings.heroSubtitle || 'Transformamos seus projetos em realidade com qualidade premium, acabamento impecável e atendimento personalizado.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2 sm:px-0">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white text-base sm:text-lg px-6 sm:px-10 py-4 rounded-full font-bold shadow-lg shadow-green-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 w-full sm:w-auto justify-center"
                    >
                        <MessageCircle className="w-6 h-6 group-hover:animate-bounce shrink-0" />
                        <span className="truncate">Falar com Especialista</span>
                    </a>

                    <a
                        href="/#servicos"
                        className="flex items-center gap-2 text-white/80 hover:text-white border border-white/30 hover:border-white/60 px-8 py-4 rounded-full font-medium transition-all hover:bg-white/5 w-full sm:w-auto justify-center text-sm sm:text-base"
                    >
                        Conheça Nossos Serviços
                        <ArrowDown className="w-4 h-4 shrink-0 transition-transform group-hover:translate-y-1" />
                    </a>
                </div>

                {/* Stats Bar */}
                <div className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
                    {(settings.aboutStats || [
                        { value: '10+', label: 'Anos de Mercado' },
                        { value: '1500+', label: 'Projetos Entregues' },
                        { value: '100%', label: 'Satisfação Garantida' },
                    ]).map((stat, i) => (
                        <div key={i} className="text-center relative px-2">
                            <span className="block text-2xl sm:text-4xl font-bold text-espelhart-accent">{stat.value}</span>
                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

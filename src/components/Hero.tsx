import { MessageCircle, ArrowDown } from 'lucide-react';

export default function Hero() {
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
                        Referência em Vidraçaria de Alto Padrão
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight">
                    Vidros e Esquadrias
                    <br />
                    <span className="text-espelhart-accent">de Alto Padrão</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-gray-300 font-light leading-relaxed">
                    Transformamos seus projetos em realidade com qualidade premium,
                    acabamento impecável e atendimento personalizado.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://wa.me/5500000000000?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20meu%20projeto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white text-lg px-8 sm:px-10 py-4 rounded-full font-bold shadow-lg shadow-green-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 w-full sm:w-auto justify-center"
                    >
                        <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                        Falar com Especialista
                    </a>

                    <a
                        href="#servicos"
                        className="flex items-center gap-2 text-white/80 hover:text-white border border-white/30 hover:border-white/60 px-8 py-4 rounded-full font-medium transition-all hover:bg-white/5 w-full sm:w-auto justify-center"
                    >
                        Conheça Nossos Serviços
                        <ArrowDown className="w-4 h-4" />
                    </a>
                </div>

                {/* Stats Bar */}
                <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                    <div className="text-center">
                        <span className="block text-3xl sm:text-4xl font-bold text-espelhart-accent">10+</span>
                        <span className="text-sm text-gray-400">Anos de Mercado</span>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-white/20" />
                    <div className="text-center">
                        <span className="block text-3xl sm:text-4xl font-bold text-espelhart-accent">1500+</span>
                        <span className="text-sm text-gray-400">Projetos Entregues</span>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-white/20" />
                    <div className="text-center">
                        <span className="block text-3xl sm:text-4xl font-bold text-espelhart-accent">100%</span>
                        <span className="text-sm text-gray-400">Satisfação Garantida</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

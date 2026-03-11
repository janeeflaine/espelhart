import { Award, Wrench } from 'lucide-react';

export default function About() {
    return (
        <section id="sobre" className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 w-full">
                        <span className="text-espelhart-accent font-semibold tracking-widest uppercase text-sm">
                            Quem Somos
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-espelhart-darkest mt-2 mb-6 leading-tight">
                            Expertise que atravessa gerações de transparência.
                        </h2>

                        <p className="text-gray-600 text-base sm:text-lg mb-4 leading-relaxed">
                            A <strong className="text-espelhart-medium">Espelhart</strong> nasceu do desejo de oferecer soluções em vidros e
                            esquadrias que unam o rigor técnico à estética arquitetônica. Com anos de mercado,
                            nos tornamos referência pela precisão na instalação e pelo compromisso com prazos.
                        </p>

                        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                            Nossa equipe é composta por especialistas certificados que utilizam tecnologia de
                            ponta para garantir que cada peça — seja um box para banheiro, um guarda-corpo de vidro ou uma
                            esquadria de alumínio — seja um reflexo do seu sonho.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-4 sm:gap-6 mb-8">
                            <div className="flex-1 text-center p-4 sm:p-6 bg-espelhart-surface rounded-xl border border-espelhart-accent/10">
                                <span className="block text-2xl sm:text-3xl font-bold text-espelhart-medium">10+</span>
                                <span className="text-xs sm:text-sm text-gray-500">Anos de Mercado</span>
                            </div>
                            <div className="flex-1 text-center p-4 sm:p-6 bg-espelhart-surface rounded-xl border border-espelhart-accent/10">
                                <span className="block text-2xl sm:text-3xl font-bold text-espelhart-medium">1500+</span>
                                <span className="text-xs sm:text-sm text-gray-500">Obras Entregues</span>
                            </div>
                            <div className="flex-1 text-center p-4 sm:p-6 bg-espelhart-surface rounded-xl border border-espelhart-accent/10">
                                <span className="block text-2xl sm:text-3xl font-bold text-espelhart-medium">5★</span>
                                <span className="text-xs sm:text-sm text-gray-500">Avaliação Google</span>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-3 bg-espelhart-darkest text-white px-4 py-3 rounded-xl flex-1">
                                <Award className="w-5 h-5 text-espelhart-accent shrink-0" />
                                <span className="text-sm font-medium">Certificação de Qualidade</span>
                            </div>
                            <div className="flex items-center gap-3 bg-espelhart-darkest text-white px-4 py-3 rounded-xl flex-1">
                                <Wrench className="w-5 h-5 text-espelhart-accent shrink-0" />
                                <span className="text-sm font-medium">Garantia em Todos os Serviços</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="lg:w-1/2 w-full relative">
                        <div className="absolute -top-6 -left-6 w-28 h-28 bg-espelhart-accent/15 rounded-full z-0 blur-sm" />
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-espelhart-medium/15 rounded-full z-0 blur-sm" />
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                            alt="Projeto de vidraçaria de alto padrão - Espelhart Vidros e Esquadrias"
                            className="relative z-10 rounded-2xl shadow-2xl w-full h-auto object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

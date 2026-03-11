import { MessageCircle, Phone, MapPin, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contato" className="py-16 sm:py-20 lg:py-24 bg-espelhart-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-espelhart-darkest via-espelhart-dark to-espelhart-medium rounded-3xl overflow-hidden shadow-2xl">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left: Main CTA */}
                        <div className="lg:w-3/5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                            <span className="text-espelhart-accent font-semibold tracking-widest uppercase text-sm mb-2">
                                Orçamento Gratuito
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                Pronto para transformar
                                <br />
                                <span className="text-espelhart-accent">seu projeto?</span>
                            </h2>
                            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
                                Fale agora com um de nossos especialistas em vidros e esquadrias via WhatsApp.
                                Atendimento rápido, personalizado e sem compromisso.
                            </p>

                            {/* Primary WhatsApp CTA */}
                            <a
                                href="https://wa.me/5500000000000?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento%20para%20meu%20projeto%20de%20vidraçaria."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white px-8 sm:px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 w-full sm:w-auto"
                            >
                                <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />
                                Solicitar Orçamento via WhatsApp
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Secondary: Call */}
                            <a
                                href="tel:+5500000000000"
                                className="mt-4 inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl font-medium transition-all hover:bg-white/5 w-full sm:w-auto text-sm"
                            >
                                <Phone className="w-4 h-4" />
                                Prefere ligar? (00) 0000-0000
                            </a>
                        </div>

                        {/* Right: Info */}
                        <div className="lg:w-2/5 bg-espelhart-accent/10 backdrop-blur-sm p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">
                                Informações de Contato
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-espelhart-accent/20 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-espelhart-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Telefone / WhatsApp</p>
                                        <p className="text-white font-medium">(00) 0000-0000</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-espelhart-accent/20 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-espelhart-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">E-mail</p>
                                        <p className="text-white font-medium">contato@espelhart.com.br</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-espelhart-accent/20 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-espelhart-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Endereço</p>
                                        <p className="text-white font-medium">
                                            Av. Industrial, 1234
                                            <br />
                                            Bairro Novo — São Paulo, SP
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-sm text-gray-400 mb-2">Horário de Atendimento</p>
                                <p className="text-white font-medium text-sm">
                                    Segunda a Sexta: 08h — 18h
                                    <br />
                                    Sábado: 08h — 12h
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

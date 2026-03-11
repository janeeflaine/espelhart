import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Clock, ArrowLeft, HelpCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Termos de Uso | Espelhart Vidros e Esquadrias',
    description:
        'Termos de Uso da Espelhart Vidros e Esquadrias. Conheça as condições de uso do nosso site e dos nossos serviços.',
};

export default function TermsOfUsePage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section className="relative py-16 sm:py-20 bg-espelhart-darkest overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#51A4B4_0%,_transparent_70%)]" />
                    </div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Termos de Uso
                        </h1>
                        <p className="text-espelhart-accent/80 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium">
                            Conheça as condições de uso do nosso site e dos nossos serviços de vidraçaria e esquadrias.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="flex items-center gap-2 text-espelhart-accent text-sm font-bold uppercase tracking-widest">
                                <Clock className="w-4 h-4" />
                                Última atualização: Março 2026
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 sm:py-16 md:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        {/* Back link */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-espelhart-accent hover:text-espelhart-medium text-sm font-medium mb-10 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar ao início
                        </Link>

                        <div className="space-y-12">
                            {/* 1. Aceitação */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">1. Aceitação dos Termos</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Ao acessar e utilizar o site da Espelhart Vidros e Esquadrias, você concorda com os presentes Termos de Uso.
                                    Caso não concorde com alguma disposição, solicitamos que não utilize nosso site. Estes termos podem ser
                                    atualizados periodicamente, e é sua responsabilidade revisá-los.
                                </p>
                            </div>

                            {/* 2. Serviços */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">2. Descrição dos Serviços</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    A Espelhart oferece serviços de vidraçaria e esquadrias, incluindo, mas não limitado a: instalação de box
                                    para banheiro, esquadrias de alumínio, guarda-corpo de vidro, vidros temperados e espelhos decorativos. Os
                                    orçamentos são realizados sob demanda e os valores podem variar conforme especificações técnicas do projeto.
                                </p>
                            </div>

                            {/* 3. Orçamentos */}
                            <div className="p-6 sm:p-8 bg-espelhart-surface rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">3. Orçamentos e Contratação</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Os orçamentos fornecidos pela Espelhart têm validade de 15 (quinze) dias a partir da data de emissão, salvo
                                    indicação contrária. A contratação do serviço somente é efetivada após a aprovação formal do orçamento pelo
                                    cliente e o pagamento da entrada, quando aplicável. Valores estão sujeitos a alteração sem aviso prévio
                                    para novos orçamentos.
                                </p>
                            </div>

                            {/* 4. Garantia */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">4. Garantia dos Serviços</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Todos os serviços executados pela Espelhart possuem garantia mínima de 12 (doze) meses para defeitos de
                                    fabricação e instalação, conforme previsto no Código de Defesa do Consumidor (Lei nº 8.078/90). A garantia
                                    não cobre danos causados por uso inadequado, acidentes, modificações realizadas por terceiros ou manutenção
                                    imprópria.
                                </p>
                            </div>

                            {/* 5. Propriedade Intelectual */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">5. Propriedade Intelectual</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Todo o conteúdo do site — incluindo textos, imagens, logotipos, ícones e layout — é de propriedade
                                    exclusiva da Espelhart ou de seus licenciadores e está protegido pelas leis de direitos autorais e propriedade
                                    intelectual. É proibida a reprodução, distribuição ou uso não autorizado de qualquer material deste site.
                                </p>
                            </div>

                            {/* 6. Limitação de Responsabilidade */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">6. Limitação de Responsabilidade</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    A Espelhart não se responsabiliza por danos indiretos, incidentais ou consequentes que resultem do uso ou da
                                    impossibilidade de uso do site. As informações no site são fornecidas &ldquo;como estão&rdquo; e podem
                                    conter imprecisões. Para informações atualizadas e precisas sobre serviços e preços, entre em contato
                                    diretamente conosco via WhatsApp.
                                </p>
                            </div>

                            {/* 7. Foro */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">7. Foro Competente</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas decorrentes
                                    destes termos serão resolvidas no foro da comarca de São Paulo/SP, com exclusão de qualquer outro.
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="p-8 sm:p-10 bg-espelhart-medium rounded-2xl text-white text-center">
                                <HelpCircle className="w-12 h-12 text-espelhart-accent mx-auto mb-4" />
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dúvidas sobre os Termos?</h2>
                                <p className="text-gray-300 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                                    Se você tiver qualquer dúvida sobre nossos termos de uso ou condições de serviço, entre em contato com
                                    nossa equipe.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="mailto:contato@espelhart.com.br"
                                        className="inline-flex items-center justify-center gap-2 bg-espelhart-accent hover:bg-espelhart-accent/90 px-8 py-3 rounded-xl font-bold transition-all"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Enviar E-mail
                                    </a>
                                    <a
                                        href="https://wa.me/5500000000000?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20os%20termos%20de%20uso."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-xl font-bold transition-all"
                                    >
                                        Falar no WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

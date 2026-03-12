import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { LegalEmailText, LegalCTA } from '@/components/LegalDynamicContent';

export const metadata: Metadata = {
    title: 'Política de Privacidade | Espelhart Vidros e Esquadrias',
    description:
        'Política de Privacidade da Espelhart. Saiba como coletamos, usamos e protegemos suas informações pessoais em conformidade com a LGPD.',
};

export default function PrivacyPolicyPage() {
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
                            Política de Privacidade
                        </h1>
                        <p className="text-espelhart-accent/80 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium">
                            Sua privacidade é nossa prioridade. Conheça como tratamos seus dados e garantimos sua segurança digital.
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
                            {/* 1. Introdução */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">1. Introdução</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Bem-vindo à Espelhart. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas
                                    informações pessoais ao utilizar nossos serviços e site. Ao acessar nossa plataforma, você concorda com as
                                    práticas descritas aqui. Nosso compromisso é com a transparência e a segurança de seus dados em conformidade
                                    com a LGPD (Lei Geral de Proteção de Dados – Lei nº 13.709/2018).
                                </p>
                            </div>

                            {/* 2. Coleta de Dados */}
                            <div className="p-6 sm:p-8 bg-espelhart-surface rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">2. Coleta de Dados</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Coletamos informações que você nos fornece diretamente, tais como:
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-espelhart-accent shrink-0" />
                                        Nome completo e informações de contato (e-mail, telefone);
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-espelhart-accent shrink-0" />
                                        Dados de navegação através de cookies e tecnologias similares;
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-espelhart-accent shrink-0" />
                                        Informações de pagamento quando aplicável para serviços contratados;
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-espelhart-accent shrink-0" />
                                        Endereço para visita técnica e instalação dos serviços.
                                    </li>
                                </ul>
                            </div>

                            {/* 3. Uso de Cookies */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">3. Uso de Cookies</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Utilizamos cookies para melhorar sua experiência em nosso site, analisar o tráfego e personalizar conteúdo.
                                    Cookies são pequenos arquivos de texto armazenados no seu dispositivo. Você pode optar por desativar os
                                    cookies nas configurações do seu navegador, embora isso possa afetar algumas funcionalidades do site.
                                </p>
                            </div>

                            {/* 4. Segurança */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">4. Segurança da Informação</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    A Espelhart implementa medidas técnicas e organizacionais rigorosas para proteger seus dados contra acessos
                                    não autorizados, perda ou alteração. Utilizamos protocolos de criptografia padrão da indústria para garantir a
                                    integridade de suas informações.
                                </p>
                            </div>

                            {/* 5. Compartilhamento */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">5. Compartilhamento de Dados</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing.
                                    Podemos compartilhar dados com prestadores de serviços que nos auxiliam na operação do site e na prestação
                                    dos serviços, sempre mediante contrato de confidencialidade.
                                </p>
                            </div>

                            {/* 6. Seus Direitos */}
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-8 w-1 bg-espelhart-accent rounded-full" />
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-espelhart-darkest">6. Seus Direitos</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    De acordo com a LGPD, você tem o direito de: acessar seus dados pessoais; solicitar a correção de dados
                                    incompletos, inexatos ou desatualizados; solicitar a eliminação de dados pessoais; revogar o consentimento a
                                    qualquer momento. Para exercer seus direitos, entre em contato conosco pelo e-mail
                                    <LegalEmailText />.
                                </p>
                            </div>

                            {/* CTA */}
                            <LegalCTA />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

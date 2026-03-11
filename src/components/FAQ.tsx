'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Qual o prazo médio de entrega e instalação?',
        answer:
            'O prazo varia de acordo com o tipo de serviço. Vidros temperados e box para banheiro costumam levar de 10 a 15 dias úteis. Esquadrias de alumínio sob medida podem levar de 20 a 30 dias úteis. Guarda-corpos de vidro são entregues em até 20 dias úteis. A medição é agendada em até 48h após o contato.',
    },
    {
        question: 'Vocês trabalham com manutenção de esquadrias?',
        answer:
            'Sim! Realizamos manutenção preventiva e corretiva em esquadrias de alumínio, incluindo troca de roldanas, vedações, borrachas de vedação e ajustes de fechamento. Também fazemos substituição de vidros danificados.',
    },
    {
        question: 'Quais formas de pagamento são aceitas?',
        answer:
            'Aceitamos cartões de crédito (com parcelamento em até 12x sob consulta), PIX com desconto especial, transferência bancária e boleto para faturamento empresarial. Condições especiais para projetos de grande porte.',
    },
    {
        question: 'Os vidros temperados são realmente seguros?',
        answer:
            'Sim, absoluta segurança! O vidro temperado é até 5 vezes mais resistente que o vidro comum. Em caso de quebra, ele se fragmenta em pequenos pedaços arredondados, minimizando o risco de cortes. Todos os nossos vidros seguem a norma ABNT NBR 14698.',
    },
    {
        question: 'Vocês fazem projeto sob medida?',
        answer:
            'Sim! Todos os nossos projetos são personalizados. Fazemos a medição no local, desenvolvemos o projeto junto com o cliente e produzimos peças sob medida para box, esquadrias, guarda-corpos, espelhos e fechamentos.',
    },
    {
        question: 'A Espelhart atende qual região?',
        answer:
            'Atendemos toda a região metropolitana de São Paulo, incluindo Grande São Paulo, ABC Paulista e cidades próximas. Para projetos de grande porte, atendemos também em outras regiões — entre em contato para consultar.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-espelhart-accent font-semibold tracking-widest uppercase text-sm">
                        Dúvidas
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-espelhart-darkest mt-2 mb-4">
                        Perguntas Frequentes
                    </h2>
                    <div className="w-20 h-1 bg-espelhart-accent mx-auto rounded-full" />
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-espelhart-accent/30 rounded-xl"
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-semibold text-espelhart-darkest text-sm sm:text-base pr-2">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-espelhart-accent shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                    } overflow-hidden`}
                            >
                                <div className="px-5 sm:px-6 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

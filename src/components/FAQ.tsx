'use client';

import { useState, useEffect, useId } from 'react';
import { Plus } from 'lucide-react';
import { getFAQs } from '@/lib/firebaseAdmin';
import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';
import WhatsAppIcon from '@/components/WhatsAppIcon';

interface FAQItem {
    id?: string;
    question: string;
    answer: string;
}

const fallbackFAQs: FAQItem[] = [
    { question: 'Qual o prazo médio de entrega e instalação?', answer: 'O prazo varia de acordo com o tipo de serviço. Vidros temperados e box para banheiro costumam levar de 10 a 15 dias úteis. Esquadrias de alumínio sob medida podem levar de 20 a 30 dias úteis. Guarda-corpos de vidro são entregues em até 20 dias úteis. A medição é agendada em até 48h após o contato.' },
    { question: 'Vocês trabalham com manutenção de esquadrias?', answer: 'Sim! Realizamos manutenção preventiva e corretiva em esquadrias de alumínio, incluindo troca de roldanas, vedações, borrachas de vedação e ajustes de fechamento. Também fazemos substituição de vidros danificados.' },
    { question: 'Quais formas de pagamento são aceitas?', answer: 'Aceitamos cartões de crédito (com parcelamento em até 12x sob consulta), PIX com desconto especial, transferência bancária e boleto para faturamento empresarial. Condições especiais para projetos de grande porte.' },
    { question: 'Os vidros temperados são realmente seguros?', answer: 'Sim, absoluta segurança! O vidro temperado é até 5 vezes mais resistente que o vidro comum. Em caso de quebra, ele se fragmenta em pequenos pedaços arredondados, minimizando o risco de cortes. Todos os nossos vidros seguem a norma ABNT NBR 14698.' },
    { question: 'Vocês fazem projeto sob medida?', answer: 'Sim! Todos os nossos projetos são personalizados. Fazemos a medição no local, desenvolvemos o projeto junto com o cliente e produzimos peças sob medida para box, esquadrias, guarda-corpos, espelhos e fechamentos.' },
    { question: 'A Espelhart atende qual região?', answer: 'Atendemos Valparaíso de Goiás, o Entorno e o Distrito Federal. Para projetos de grande porte, atendemos também em outras regiões — entre em contato para consultar.' },
];

export default function FAQ() {
    const settings = useSettings();
    const baseId = useId();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFAQs);

    useEffect(() => {
        let active = true;
        getFAQs()
            .then((data) => {
                if (active && data.length > 0) setFaqs(data);
            })
            .catch((error) => console.error('Error loading FAQs from Firestore:', error));
        return () => {
            active = false;
        };
    }, []);

    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, 'Olá! Tenho uma dúvida sobre os serviços da Espelhart.');

    return (
        <section id="faq" className="py-16 sm:py-20 lg:py-28 bg-mist">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] gap-10 lg:gap-16">
                <div>
                    <h2 className="font-wide text-balance text-3xl sm:text-4xl font-bold text-ink leading-[1.08]">
                        {settings.faqTitle}
                    </h2>
                    <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
                        {settings.faqSubtitle}
                    </p>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2.5 font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4 hover:text-teal"
                    >
                        <WhatsAppIcon className="w-5 h-5 text-[#1FAF53]" />
                        Perguntar no WhatsApp
                    </a>
                </div>

                <ul className="border-t border-ink/15">
                    {faqs.map((faq, i) => {
                        const open = openIndex === i;
                        const panelId = `${baseId}-p${i}`;
                        const buttonId = `${baseId}-b${i}`;
                        return (
                            <li key={faq.id ?? i} className="border-b border-ink/15">
                                <h3>
                                    <button
                                        id={buttonId}
                                        type="button"
                                        onClick={() => setOpenIndex(open ? null : i)}
                                        aria-expanded={open}
                                        aria-controls={panelId}
                                        className="w-full py-5 text-left flex justify-between items-start gap-6"
                                    >
                                        <span className="text-[17px] font-semibold text-ink">{faq.question}</span>
                                        <Plus
                                            className={`w-5 h-5 mt-0.5 text-teal shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                                            aria-hidden="true"
                                        />
                                    </button>
                                </h3>
                                <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-panel" data-open={open}>
                                    <div className="overflow-hidden">
                                        <p className="pb-6 pr-10 text-[16px] leading-relaxed text-muted max-w-[65ch]">{faq.answer}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

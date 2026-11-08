import Link from 'next/link';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { LegalCTA } from '@/components/LegalDynamicContent';

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        <section id={id} className="scroll-mt-24">
            <h2 className="font-wide text-xl sm:text-2xl font-bold text-ink">{title}</h2>
            <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-muted [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:marker:text-teal">
                {children}
            </div>
        </section>
    );
}

export default function LegalPage({
    title,
    intro,
    updated,
    toc,
    children,
}: {
    title: string;
    intro: string;
    updated: string;
    toc: { id: string; label: string }[];
    children: ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="bg-paper">
                <div className="bg-mist">
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                        <Link href="/" className="text-sm font-medium text-teal hover:text-ink">
                            Voltar ao início
                        </Link>
                        <h1 className="mt-4 font-wide text-3xl sm:text-5xl font-bold text-ink leading-[1.05]">{title}</h1>
                        <p className="mt-4 text-lg text-muted max-w-2xl">{intro}</p>
                        <p className="mt-6 text-sm text-muted">Última atualização: {updated}</p>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[14rem_minmax(0,1fr)] gap-10 lg:gap-14">
                    <nav aria-label="Nesta página" className="hidden lg:block">
                        <div className="sticky top-24">
                            <p className="text-sm font-semibold text-ink mb-3">Nesta página</p>
                            <ol className="space-y-2 text-sm">
                                {toc.map((t) => (
                                    <li key={t.id}>
                                        <a href={`#${t.id}`} className="text-muted hover:text-ink">
                                            {t.label}
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </nav>
                    <div className="max-w-[68ch] space-y-12">
                        {children}
                        <LegalCTA />
                    </div>
                </div>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { getFAQs, getServices, getSettings, getTestimonials, type FAQ, type Service, type Testimonial } from '@/lib/firebaseAdmin';
import { mergeSettings, type SiteSettings } from '@/lib/siteSettings';
import { LoadingState } from './_ui';

type Data = { settings: SiteSettings; services: Service[]; testimonials: Testimonial[]; faqs: FAQ[] };

function greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
}

/** The homepage drawn as blocks, in order. Each block opens its editor. */
const sitemap = [
    { href: '/admin/hero', label: 'Topo', h: 'h-16', tone: 'bg-mist' },
    { href: '/admin/services', label: 'Serviços', h: 'h-14', tone: 'bg-paper' },
    { href: '/admin/processo', label: 'Como funciona', h: 'h-8', tone: 'bg-mist' },
    { href: '/admin/about', label: 'Quem somos', h: 'h-12', tone: 'bg-ink text-white' },
    { href: '/admin/features', label: 'Diferenciais', h: 'h-9', tone: 'bg-paper' },
    { href: '/admin/testimonials', label: 'Depoimentos', h: 'h-9', tone: 'bg-mist' },
    { href: '/admin/orcamento', label: 'Orçamento', h: 'h-14', tone: 'bg-paper' },
    { href: '/admin/faqs', label: 'Dúvidas', h: 'h-10', tone: 'bg-mist' },
    { href: '/admin/rodape', label: 'Rodapé', h: 'h-8', tone: 'bg-ink text-white' },
];

export default function AdminDashboard() {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        Promise.all([
            getSettings().catch(() => null),
            getServices().catch(() => []),
            getTestimonials().catch(() => []),
            getFAQs().catch(() => []),
        ]).then(([s, services, testimonials, faqs]) => setData({ settings: mergeSettings(s), services, testimonials, faqs }));
    }, []);

    if (!data) return <LoadingState />;

    const { settings, services, testimonials, faqs } = data;
    const photos = services.reduce((n, s) => n + (s.gallery?.length ?? 0) + (s.mainImage ? 1 : 0), 0);
    const phoneDigits = settings.phone.replace(/\D/g, '');

    const checks = [
        {
            ok: testimonials.length > 0,
            good: `${testimonials.length} depoimento${testimonials.length === 1 ? '' : 's'} no site`,
            bad: 'Seção de depoimentos escondida: publique avaliações reais de clientes',
            href: '/admin/testimonials',
        },
        {
            ok: services.length > 0 && services.every((s) => s.mainImage),
            good: 'Todos os serviços têm foto',
            bad: services.length === 0 ? 'Nenhum serviço cadastrado: o site mostra exemplos' : 'Há serviço sem foto principal',
            href: '/admin/services',
        },
        {
            ok: services.some((s) => (s.gallery?.length ?? 0) >= 3),
            good: 'Galerias com fotos de obras',
            bad: 'Adicione pelo menos 3 fotos de obras na galeria dos serviços',
            href: '/admin/services',
        },
        {
            ok: phoneDigits.length === 11,
            good: 'Telefone com o 9 do celular',
            bad: 'Confira o telefone: celular precisa de 11 dígitos com DDD',
            href: '/admin/settings',
        },
        {
            ok: !!settings.instagram,
            good: 'Instagram ligado ao site',
            bad: 'Adicione o link do Instagram para mostrar mais obras',
            href: '/admin/settings',
        },
        {
            ok: faqs.length > 0,
            good: `${faqs.length} dúvidas respondidas`,
            bad: 'Nenhuma dúvida cadastrada: o site mostra exemplos',
            href: '/admin/faqs',
        },
    ];
    const done = checks.filter((c) => c.ok).length;
    const pct = Math.round((done / checks.length) * 100);

    const tiles = [
        { label: 'Serviços', value: services.length, href: '/admin/services' },
        { label: 'Fotos de obras', value: photos, href: '/admin/services' },
        { label: 'Depoimentos', value: testimonials.length, href: '/admin/testimonials' },
        { label: 'Dúvidas', value: faqs.length, href: '/admin/faqs' },
    ];

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm text-muted">{greeting()}</p>
                <h1 className="font-wide text-2xl sm:text-[2rem] font-bold text-ink leading-tight mt-1">O que vamos atualizar hoje?</h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {tiles.map((t) => (
                    <Link
                        key={t.label}
                        href={t.href}
                        className="group rounded-lg bg-paper border border-line/80 px-5 py-4 hover:border-ink/25 transition-colors"
                    >
                        <p className="font-wide text-3xl font-bold text-ink tabular-nums">{t.value}</p>
                        <p className="mt-1 text-sm text-muted group-hover:text-ink">{t.label}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-6 items-start">
                {/* Health */}
                <section className="rounded-lg bg-paper border border-line/80 p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-[17px] font-semibold text-ink">Saúde do site</h2>
                            <p className="mt-1 text-sm text-muted">O que falta para o site passar mais confiança e vender mais.</p>
                        </div>
                        <div className="relative w-14 h-14 shrink-0" aria-label={`${pct}% concluído`}>
                            <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90" aria-hidden="true">
                                <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-mist)" strokeWidth="4" />
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="15.5"
                                    fill="none"
                                    stroke="var(--color-teal)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
                                {done}/{checks.length}
                            </span>
                        </div>
                    </div>
                    <ul className="mt-5 divide-y divide-line">
                        {[...checks].sort((a, b) => Number(a.ok) - Number(b.ok)).map((c, i) => (
                            <li key={i}>
                                <Link href={c.href} className="group flex items-center gap-3 py-3">
                                    {c.ok ? (
                                        <CheckCircle2 className="w-5 h-5 text-teal shrink-0" aria-hidden="true" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-[#C27C0E] shrink-0" aria-hidden="true" />
                                    )}
                                    <span className={`flex-1 text-sm ${c.ok ? 'text-muted' : 'text-ink font-medium'}`}>{c.ok ? c.good : c.bad}</span>
                                    <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Site map */}
                <section className="rounded-lg bg-paper border border-line/80 p-5 sm:p-7">
                    <h2 className="text-[17px] font-semibold text-ink">Mapa da página inicial</h2>
                    <p className="mt-1 text-sm text-muted">Clique numa seção para editar.</p>
                    <div className="mt-5 mx-auto max-w-[18rem] rounded-md border border-line overflow-hidden shadow-[0_16px_40px_-24px_rgba(12,35,41,0.45)]">
                        <div className="h-4 bg-paper border-b border-line flex items-center gap-1 px-2" aria-hidden="true">
                            <span className="w-1.5 h-1.5 rounded-full bg-line" />
                            <span className="w-1.5 h-1.5 rounded-full bg-line" />
                            <span className="w-1.5 h-1.5 rounded-full bg-line" />
                        </div>
                        {sitemap.map((s) => {
                            const hidden = s.label === 'Depoimentos' && testimonials.length === 0;
                            return (
                                <Link
                                    key={s.href}
                                    href={s.href}
                                    className={`group relative flex items-center justify-between px-3 ${s.h} ${s.tone} border-b border-line/70 last:border-b-0 hover:ring-2 hover:ring-inset hover:ring-teal transition-shadow ${
                                        hidden ? 'opacity-45 [background-image:repeating-linear-gradient(135deg,transparent_0_6px,rgba(12,35,41,0.06)_6px_8px)]' : ''
                                    }`}
                                >
                                    <span className="text-xs font-semibold">{s.label}</span>
                                    {hidden ? (
                                        <span className="text-[10px] font-medium">escondida</span>
                                    ) : (
                                        <span className="text-[10px] font-semibold text-teal opacity-0 group-hover:opacity-100">Editar</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

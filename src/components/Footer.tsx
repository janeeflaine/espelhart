'use client';

import Link from 'next/link';
import { useSettings } from '@/lib/SettingsContext';
import { useServices } from '@/lib/useServices';
import Logo from '@/components/Logo';
import { useTestimonials } from '@/lib/useTestimonials';

const baseLinks = [
    { href: '/#servicos', label: 'Serviços' },
    { href: '/#como-funciona', label: 'Como funciona' },
    { href: '/#sobre', label: 'Sobre nós' },
    { href: '/#faq', label: 'Dúvidas frequentes' },
    { href: '/#orcamento', label: 'Pedir orçamento' },
];

export default function Footer() {
    const settings = useSettings();
    const services = useServices();
    const hasTestimonials = useTestimonials().length > 0;
    const links = hasTestimonials
        ? [...baseLinks.slice(0, 3), { href: '/#depoimentos', label: 'Depoimentos' }, ...baseLinks.slice(3)]
        : baseLinks;
    const phone = settings.phone;

    return (
        <footer className="bg-ink text-white pb-24 lg:pb-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Logo tone="light" />
                        <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-xs">
                            {settings.footerDescription}
                        </p>
                        {(settings.instagram || settings.facebook) && (
                            <div className="mt-6 flex gap-3">
                                {settings.instagram && (
                                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <rect x="3" y="3" width="18" height="18" rx="5" />
                                            <circle cx="12" cy="12" r="4" />
                                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                                        </svg>
                                    </a>
                                )}
                                {settings.facebook && (
                                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.95.93-1.95 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.03 24 18.06 24 12.07z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    <nav aria-label="Rodapé">
                        <p className="font-semibold mb-4">Navegação</p>
                        <ul className="space-y-3">
                            {links.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href} className="text-white/65 hover:text-white text-[15px]">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="font-semibold mb-4">Serviços</p>
                        <ul className="space-y-3">
                            {services.map((s) => (
                                <li key={s.id ?? s.title}>
                                    <Link href="/#servicos" className="text-white/65 hover:text-white text-[15px]">
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold mb-4">Contato</p>
                        <ul className="space-y-3 text-[15px] text-white/65">
                            <li>
                                <a href={`tel:+55${phone.replace(/\D/g, '')}`} className="hover:text-white">{phone}</a>
                            </li>
                            {settings.email && (
                                <li className="break-all">
                                    <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
                                </li>
                            )}
                            {settings.address && <li className="whitespace-pre-line">{settings.address}</li>}
                            <li>{settings.hoursWeek}{settings.hoursSaturday && <><br />{settings.hoursSaturday}</>}</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
                    <div className="text-center sm:text-left space-y-1">
                        <p>{settings.footerText || `© ${new Date().getFullYear()} Espelhart Vidros e Esquadrias. Todos os direitos reservados.`}</p>
                        {(settings.companyLegalName || settings.cnpj) && (
                            <p>
                                {settings.companyLegalName}
                                {settings.companyLegalName && settings.cnpj && ', '}
                                {settings.cnpj && `CNPJ ${settings.cnpj}`}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-5">
                        <Link href="/politica-de-privacidade" className="hover:text-white">Política de privacidade</Link>
                        <Link href="/termos-de-uso" className="hover:text-white">Termos de uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useSettings } from '@/lib/SettingsContext';
import { useQuote } from '@/lib/QuoteContext';
import Logo from '@/components/Logo';
import { useTestimonials } from '@/lib/useTestimonials';

const baseNavLinks = [
    { href: '/#servicos', label: 'Serviços' },
    { href: '/#como-funciona', label: 'Como funciona' },
    { href: '/#sobre', label: 'Sobre' },
    { href: '/#faq', label: 'Dúvidas' },
];

function telHref(phone: string) {
    const digits = phone.replace(/\D/g, '');
    return `tel:+55${digits}`;
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const settings = useSettings();
    const { requestQuote } = useQuote();
    const hasTestimonials = useTestimonials().length > 0;
    const navLinks = hasTestimonials
        ? [...baseNavLinks.slice(0, 3), { href: '/#depoimentos', label: 'Clientes' }, ...baseNavLinks.slice(3)]
        : baseNavLinks;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setMobileOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        if (!mobileOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [mobileOpen]);

    const phone = settings.phone || '(61) 9817-9760';

    return (
        <header
            className={`sticky top-0 z-50 bg-paper/95 backdrop-blur-md transition-shadow ${scrolled ? 'shadow-[0_1px_0_var(--color-line)]' : ''}`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-6">
                <Logo />

                <ul className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="px-3 py-2 text-[15px] font-medium text-muted hover:text-ink transition-colors"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden lg:flex items-center gap-5">
                    <a href={telHref(phone)} className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-teal">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        {phone}
                    </a>
                    <button
                        type="button"
                        onClick={() => requestQuote()}
                        className="bg-ink hover:bg-ink-2 text-white px-5 py-2.5 rounded-md font-semibold text-[15px] transition-colors"
                    >
                        Pedir orçamento
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((o) => !o)}
                    className="lg:hidden -mr-2 p-2 text-ink"
                    aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={mobileOpen}
                    aria-controls="menu-mobile"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            <div
                id="menu-mobile"
                className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-paper transition-opacity duration-200 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="flex flex-col h-full px-4 pt-4 pb-8">
                    <ul className="flex flex-col">
                        {navLinks.map((link) => (
                            <li key={link.href} className="border-b border-line">
                                <a
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-4 font-wide text-xl font-semibold text-ink"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setMobileOpen(false);
                                requestQuote();
                            }}
                            className="w-full bg-ink text-white py-4 rounded-md font-semibold text-base"
                        >
                            Pedir orçamento
                        </button>
                        <a
                            href={telHref(phone)}
                            className="w-full inline-flex items-center justify-center gap-2 border border-line py-4 rounded-md font-semibold text-ink"
                        >
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            Ligar {phone}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

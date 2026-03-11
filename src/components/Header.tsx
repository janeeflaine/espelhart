'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';

const navLinks = [
    { href: '/#inicio', label: 'Início' },
    { href: '/#servicos', label: 'Serviços' },
    { href: '/#sobre', label: 'Sobre' },
    { href: '/#depoimentos', label: 'Depoimentos' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#contato', label: 'Contato' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const settings = useSettings();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, 'Olá! Gostaria de solicitar um orçamento.');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-espelhart-darkest/95 shadow-lg shadow-black/20 backdrop-blur-md'
                : 'bg-espelhart-darkest'
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-espelhart-accent rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                        E
                    </div>
                    <span className="text-xl sm:text-2xl font-bold tracking-wider text-white">
                        ESPEL<span className="text-espelhart-accent">HART</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-1 lg:gap-2">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="px-3 py-2 text-sm lg:text-base font-medium text-gray-300 hover:text-espelhart-accent transition-colors rounded-md hover:bg-white/5"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-green-500/25"
                >
                    <MessageCircle className="w-4 h-4" />
                    Solicitar Orçamento
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu Drawer */}
            <div
                className={`md:hidden fixed inset-0 top-[72px] z-40 transition-all duration-300 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 w-full max-w-sm h-full bg-espelhart-darkest shadow-2xl transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col p-6 gap-2">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 text-lg font-medium text-gray-200 hover:text-espelhart-accent hover:bg-white/5 rounded-xl transition-all"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {link.label}
                            </a>
                        ))}

                        <div className="mt-4 pt-4 border-t border-white/10">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white px-6 py-4 rounded-xl font-bold text-lg transition-all w-full"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Solicitar Orçamento
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

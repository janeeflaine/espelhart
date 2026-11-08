'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from 'firebase/auth';
import Link from 'next/link';
import {
    LayoutGrid,
    PanelTop,
    Wrench,
    Route,
    Building2,
    Award,
    MessageSquareQuote,
    ClipboardList,
    HelpCircle,
    Contact,
    PanelBottom,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Eye,
} from 'lucide-react';
import { FeedbackProvider, unsaved } from './_ui';

const groups = [
    {
        label: null,
        links: [{ href: '/admin', label: 'Visão geral', icon: LayoutGrid }],
    },
    {
        label: 'Página inicial',
        links: [
            { href: '/admin/hero', label: 'Topo', icon: PanelTop },
            { href: '/admin/services', label: 'Serviços', icon: Wrench },
            { href: '/admin/processo', label: 'Como funciona', icon: Route },
            { href: '/admin/about', label: 'Quem somos', icon: Building2 },
            { href: '/admin/features', label: 'Diferenciais', icon: Award },
            { href: '/admin/testimonials', label: 'Depoimentos', icon: MessageSquareQuote },
            { href: '/admin/orcamento', label: 'Formulário de orçamento', icon: ClipboardList },
            { href: '/admin/faqs', label: 'Dúvidas', icon: HelpCircle },
        ],
    },
    {
        label: 'Empresa',
        links: [
            { href: '/admin/settings', label: 'Contato e redes', icon: Contact },
            { href: '/admin/rodape', label: 'Rodapé', icon: PanelBottom },
        ],
    },
];

const allLinks = groups.flatMap((g) => g.links);

/**
 * Local visual preview of the panel without signing in. Only active in `next dev`
 * with NEXT_PUBLIC_ADMIN_PREVIEW=1; Firestore/Storage rules still reject every write.
 */
const PREVIEW = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ADMIN_PREVIEW === '1';

function Mark() {
    return (
        <svg width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
            <rect x="2" y="3" width="15" height="24" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <rect x="11" y="3" width="15" height="24" rx="1.5" fill="#A9D3C8" fillOpacity="0.55" stroke="#8FD0DA" strokeWidth="2.2" />
        </svg>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Pick<User, 'email'> | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }
        if (PREVIEW) {
            setUser({ email: 'modo-previa@local' });
            setLoading(false);
            return;
        }
        let unsubscribe: (() => void) | undefined;
        (async () => {
            try {
                const { onAuthStateChanged } = await import('firebase/auth');
                const { auth } = await import('@/lib/firebase');
                unsubscribe = onAuthStateChanged(auth, (current) => {
                    setUser(current);
                    setLoading(false);
                    if (!current) router.push('/admin/login');
                });
            } catch (error) {
                console.error('Firebase Auth initialization failed:', error);
                setLoading(false);
                router.push('/admin/login');
            }
        })();
        return () => unsubscribe?.();
    }, [router, isLoginPage]);

    useEffect(() => setSidebarOpen(false), [pathname]);

    if (isLoginPage) return <>{children}</>;

    if (loading) {
        return (
            <div className="min-h-screen bg-mist flex items-center justify-center">
                <div className="w-8 h-8 border-[3px] border-teal border-t-transparent rounded-full animate-spin" aria-label="Carregando" />
            </div>
        );
    }

    if (!user) return null;

    const handleLogout = async () => {
        if (PREVIEW) return;
        const { signOut } = await import('firebase/auth');
        const { auth } = await import('@/lib/firebase');
        await signOut(auth);
        router.push('/admin/login');
    };

    const current = allLinks.find((l) => l.href === pathname);

    return (
        <FeedbackProvider>
            <div className="min-h-screen bg-mist lg:pl-[17rem]">
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-ink/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-[17rem] bg-ink text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="h-16 px-5 flex items-center justify-between border-b border-white/10 shrink-0">
                        <Link href="/admin" className="flex items-center gap-2.5">
                            <Mark />
                            <span className="leading-none">
                                <span className="block font-wide text-[15px] font-bold tracking-[0.12em]">ESPELHART</span>
                                <span className="block text-[11px] text-white/50 mt-1">Painel do site</span>
                            </span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-white/60 hover:text-white" aria-label="Fechar menu">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Painel">
                        {groups.map((group, gi) => (
                            <div key={gi} className={gi > 0 ? 'mt-6' : ''}>
                                {group.label && <p className="px-3 mb-2 text-xs font-medium text-white/40">{group.label}</p>}
                                <ul className="space-y-0.5">
                                    {group.links.map((link) => {
                                        const Icon = link.icon;
                                        const active = pathname === link.href;
                                        return (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    onClick={(e) => {
                                                        if (
                                                            unsaved.dirty &&
                                                            !window.confirm('Você tem alterações não salvas nesta página. Sair mesmo assim?')
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    aria-current={active ? 'page' : undefined}
                                                    className={`relative flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] font-medium transition-colors ${
                                                        active ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                                                    }`}
                                                >
                                                    {active && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-edge" aria-hidden="true" />}
                                                    <Icon className={`w-[18px] h-[18px] ${active ? 'text-edge' : ''}`} aria-hidden="true" />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    <div className="p-3 border-t border-white/10 shrink-0">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold uppercase">
                                {(user.email ?? '?')[0]}
                            </span>
                            <span className="text-xs text-white/60 truncate flex-1">{user.email}</span>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-md text-white/50 hover:text-white hover:bg-white/10"
                                aria-label="Sair do painel"
                                title="Sair"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="flex flex-col min-h-screen min-w-0">
                    {PREVIEW && (
                        <div className="bg-[#E8A33D] text-ink text-sm font-medium px-4 py-2 flex items-center gap-2">
                            <Eye className="w-4 h-4" aria-hidden="true" />
                            Modo prévia local: sem login e nada é salvo.
                        </div>
                    )}
                    <header className="sticky top-0 z-30 h-16 bg-mist/85 backdrop-blur-md border-b border-line/70 px-4 sm:px-6 lg:px-10 flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden -ml-1 p-2 text-ink" aria-label="Abrir menu">
                            <Menu className="w-5 h-5" />
                        </button>
                        <p className="text-sm text-muted truncate">
                            Painel <span className="mx-1.5 text-line">/</span>
                            <span className="text-ink font-medium">{current?.label ?? 'Página'}</span>
                        </p>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-2 rounded-md bg-ink text-white px-3.5 py-2 text-sm font-semibold hover:bg-ink-2"
                        >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            <span className="hidden sm:inline">Ver site</span>
                        </a>
                    </header>

                    <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8 lg:py-10 pb-28">
                        <div className="mx-auto max-w-5xl">{children}</div>
                    </main>
                </div>
            </div>
        </FeedbackProvider>
    );
}

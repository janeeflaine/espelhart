'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from 'firebase/auth';
import Link from 'next/link';
import {
    LayoutDashboard,
    Wrench,
    MessageSquareQuote,
    HelpCircle,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from 'lucide-react';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/services', label: 'Serviços', icon: Wrench },
    { href: '/admin/testimonials', label: 'Depoimentos', icon: MessageSquareQuote },
    { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    { href: '/admin/settings', label: 'Configurações', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        // Skip auth check entirely on login page
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        let unsubscribe: (() => void) | undefined;

        async function initAuth() {
            try {
                const { onAuthStateChanged } = await import('firebase/auth');
                const { auth } = await import('@/lib/firebase');
                unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    setLoading(false);

                    if (!currentUser) {
                        router.push('/admin/login');
                    }
                });
            } catch (error) {
                console.error('Firebase Auth initialization failed:', error);
                setLoading(false);
                router.push('/admin/login');
            }
        }
        initAuth();

        return () => { if (unsubscribe) unsubscribe(); };
    }, [router, isLoginPage]);

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Login page - render immediately without auth wrapper
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-espelhart-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Auth guard
    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        const { signOut } = await import('firebase/auth');
        const { auth } = await import('@/lib/firebase');
        await signOut(auth);
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-espelhart-darkest text-white transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-5 border-b border-white/10 flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-espelhart-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                E
                            </div>
                            <span className="text-lg font-bold tracking-wider">
                                ESPEL<span className="text-espelhart-accent">HART</span>
                            </span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {sidebarLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                        ? 'bg-espelhart-accent text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {link.label}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-white/10">
                        <div className="text-xs text-gray-500 mb-3 px-4 truncate">
                            {user.email}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
                        >
                            <LogOut className="w-5 h-5" />
                            Sair
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-espelhart-darkest"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <h2 className="text-lg font-semibold text-espelhart-darkest">
                        Painel Administrativo
                    </h2>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

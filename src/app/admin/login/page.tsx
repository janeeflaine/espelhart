'use client';

import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const { auth } = await import('@/lib/firebaseAuth');
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (err: unknown) {
            const code = (err as { code?: string }).code || '';
            if (['auth/user-not-found', 'auth/invalid-credential', 'auth/wrong-password'].includes(code)) {
                setError('E-mail ou senha incorretos. Confira e tente de novo.');
            } else if (code === 'auth/invalid-email') {
                setError('Digite um e-mail válido.');
            } else if (code === 'auth/too-many-requests') {
                setError('Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.');
            } else if (code === 'auth/network-request-failed') {
                setError('Sem conexão com a internet. Verifique e tente de novo.');
            } else {
                setError('Não foi possível entrar agora. Tente de novo em instantes.');
            }
        } finally {
            setLoading(false);
        }
    };

    const input =
        'w-full rounded-md border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted/60 focus:outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15';

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] bg-paper">
            {/* Brand side: the sliding window, open */}
            <div className="relative hidden lg:flex flex-col justify-between bg-ink text-white p-12 overflow-hidden">
                <div className="flex items-center gap-2.5">
                    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                        <rect x="2" y="3" width="15" height="24" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                        <rect x="11" y="3" width="15" height="24" rx="1.5" fill="#A9D3C8" fillOpacity="0.55" stroke="#8FD0DA" strokeWidth="2.2" />
                    </svg>
                    <span className="font-wide text-lg font-bold tracking-[0.12em]">ESPELHART</span>
                </div>

                <div className="relative z-10 max-w-md">
                    <p className="font-wide text-[2.6rem] font-bold leading-[1.05]">Seu site, sempre como a sua obra: impecável.</p>
                    <p className="mt-5 text-white/60 leading-relaxed">
                        Edite textos, fotos, serviços e depoimentos. Tudo o que você salva aparece no site na hora.
                    </p>
                </div>

                <p className="relative z-10 text-sm text-white/40">Área restrita da equipe Espelhart</p>

                {/* decorative glass panes */}
                <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[26rem] h-[34rem] pointer-events-none" aria-hidden="true">
                    <div className="absolute inset-0 rounded-sm border-[10px] border-[#8E9A9E]/40" />
                    <div className="window-sash window-sash--fixed !border-[8px]" />
                    <div className="window-sash window-sash--moving !border-[8px]" />
                </div>
            </div>

            {/* Form side */}
            <div className="flex items-center justify-center px-5 py-12 bg-mist lg:bg-paper">
                <div className="w-full max-w-sm">
                    <div className="lg:hidden flex items-center gap-2.5 mb-10 text-ink">
                        <svg width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
                            <rect x="2" y="3" width="15" height="24" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                            <rect x="11" y="3" width="15" height="24" rx="1.5" fill="#A9D3C8" fillOpacity="0.55" stroke="#237482" strokeWidth="2.2" />
                        </svg>
                        <span className="font-wide text-lg font-bold tracking-[0.12em]">ESPELHART</span>
                    </div>

                    <h1 className="font-wide text-[1.9rem] font-bold text-ink leading-tight">Entrar no painel</h1>
                    <p className="mt-2 text-muted">Use o e-mail e a senha da equipe.</p>

                    <form onSubmit={handleLogin} className="mt-8 space-y-5" noValidate>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={input}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`${input} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded text-muted hover:text-ink"
                                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p role="alert" className="rounded-md bg-[#B42318]/8 border border-[#B42318]/25 px-3.5 py-3 text-sm text-[#912018]">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-ink py-3.5 font-semibold text-white hover:bg-ink-2 disabled:opacity-60"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                            {loading ? 'Entrando…' : 'Entrar'}
                        </button>
                    </form>

                    <Link href="/" className="mt-8 inline-block text-sm text-muted hover:text-ink">
                        Voltar para o site
                    </Link>
                </div>
            </div>
        </div>
    );
}

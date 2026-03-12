'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const { auth } = await import('@/lib/firebase');
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (err: unknown) {
            const firebaseError = err as { code?: string; message?: string };
            const code = firebaseError.code || '';

            if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
                setError('Usuário não encontrado. Verifique o email ou crie um usuário no Firebase Console.');
            } else if (code === 'auth/wrong-password') {
                setError('Senha incorreta. Tente novamente.');
            } else if (code === 'auth/invalid-email') {
                setError('Email inválido.');
            } else if (code === 'auth/too-many-requests') {
                setError('Muitas tentativas. Aguarde alguns minutos.');
            } else {
                setError(`Erro: ${code || firebaseError.message || 'desconhecido'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-espelhart-darkest flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-espelhart-accent rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            E
                        </div>
                        <span className="text-2xl font-bold text-white tracking-wider">
                            ESPEL<span className="text-espelhart-accent">HART</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm">Painel Administrativo</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-espelhart-accent/10 rounded-xl flex items-center justify-center">
                            <Lock className="w-5 h-5 text-espelhart-accent" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-espelhart-darkest">Entrar</h1>
                            <p className="text-gray-500 text-xs">Acesse o painel de controle</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@espelhart.com.br"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-espelhart-accent focus:border-transparent text-base transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-espelhart-accent hover:bg-espelhart-medium text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : 'Entrar no Painel'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-600 text-xs mt-6">
                    © {new Date().getFullYear()} Espelhart — Área restrita
                </p>
            </div>
        </div>
    );
}

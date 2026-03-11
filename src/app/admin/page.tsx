'use client';

import { useEffect, useState } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Wrench, MessageSquareQuote, HelpCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ services: 0, testimonials: 0, faqs: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [servicesSnap, testimonialsSnap, faqsSnap] = await Promise.all([
                    getCountFromServer(collection(db, 'services')),
                    getCountFromServer(collection(db, 'testimonials')),
                    getCountFromServer(collection(db, 'faqs')),
                ]);
                setStats({
                    services: servicesSnap.data().count,
                    testimonials: testimonialsSnap.data().count,
                    faqs: faqsSnap.data().count,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const cards = [
        {
            label: 'Serviços',
            value: stats.services,
            icon: Wrench,
            color: 'bg-blue-500',
            href: '/admin/services',
        },
        {
            label: 'Depoimentos',
            value: stats.testimonials,
            icon: MessageSquareQuote,
            color: 'bg-green-500',
            href: '/admin/testimonials',
        },
        {
            label: 'FAQs',
            value: stats.faqs,
            icon: HelpCircle,
            color: 'bg-purple-500',
            href: '/admin/faqs',
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-espelhart-darkest">Dashboard</h1>
                <p className="text-gray-500 mt-1">Visão geral do conteúdo do site</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <a
                            key={card.label}
                            href={card.href}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-gray-300 group-hover:text-espelhart-accent transition-colors" />
                            </div>
                            <p className="text-3xl font-bold text-espelhart-darkest">
                                {loading ? '—' : card.value}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{card.label} cadastrados</p>
                        </a>
                    );
                })}
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-espelhart-darkest mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a
                        href="/admin/services"
                        className="bg-espelhart-surface hover:bg-espelhart-accent/10 px-4 py-3 rounded-xl text-sm font-medium text-espelhart-medium transition-colors text-center"
                    >
                        + Adicionar Serviço
                    </a>
                    <a
                        href="/admin/testimonials"
                        className="bg-espelhart-surface hover:bg-espelhart-accent/10 px-4 py-3 rounded-xl text-sm font-medium text-espelhart-medium transition-colors text-center"
                    >
                        + Adicionar Depoimento
                    </a>
                    <a
                        href="/admin/faqs"
                        className="bg-espelhart-surface hover:bg-espelhart-accent/10 px-4 py-3 rounded-xl text-sm font-medium text-espelhart-medium transition-colors text-center"
                    >
                        + Adicionar FAQ
                    </a>
                </div>
            </div>
        </div>
    );
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSettings } from '@/lib/firebaseAdmin';

export interface SiteSettings {
    whatsappNumber: string;
    whatsappMessage: string;
    instagram: string;
    facebook: string;
    aboutTitle: string;
    aboutText: string;
    aboutStats: { label: string; value: string }[];
    aboutHighlights: string[];
    footerText: string;
    phone: string;
    email: string;
    address: string;
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    featuresTitle: string;
    featuresSubtitle: string;
    features: { title: string; description: string }[];
}

export const defaultSettings: SiteSettings = {
    whatsappNumber: '5500000000000',
    whatsappMessage: 'Olá! Gostaria de solicitar um orçamento.',
    instagram: '',
    facebook: '',
    aboutTitle: 'Expertise que atravessa gerações de transparência.',
    aboutText: '',
    aboutStats: [
        { label: 'Anos de Mercado', value: '10+' },
        { label: 'Obras Entregues', value: '1500+' },
        { label: 'Avaliação Google', value: '5★' },
    ],
    aboutHighlights: [
        'Certificação de Qualidade',
        'Garantia em Todos os Serviços'
    ],
    footerText: '© 2026 Espelhart. Todos os direitos reservados.',
    phone: '(00) 0000-0000',
    email: 'contato@espelhart.com.br',
    address: 'São Paulo, SP',
    heroBadge: 'Referência em Vidraçaria de Alto Padrão',
    heroTitle: 'Vidros e Esquadrias\nde Alto Padrão',
    heroSubtitle: 'Transformamos seus projetos em realidade com qualidade premium, acabamento impecável e atendimento personalizado.',
    featuresTitle: 'Por que escolher a Espelhart?',
    featuresSubtitle: 'Combinamos técnica avançada e atendimento personalizado para garantir o sucesso da sua obra.',
    features: [
        { title: 'Equipe Especializada', description: 'Profissionais altamente treinados e certificados para instalações complexas de vidros e esquadrias.' },
        { title: 'Alta Tecnologia', description: 'Utilizamos maquinário de ponta e materiais de última geração para corte e acabamento perfeitos.' },
        { title: 'Prazos Rigorosos', description: 'Cronogramas respeitados do início ao fim, sem atrasos ou surpresas. Compromisso com sua obra.' },
        { title: 'Garantia Estendida', description: 'Segurança total com suporte pós-venda e garantia de fabricação em todos os nossos produtos.' }
    ]
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function useSettings() {
    return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await getSettings();
                console.log("Settings loaded from Firestore:", data);
                if (data) {
                    setSettings({ ...defaultSettings, ...data });
                }
            } catch (error) {
                console.error('Error loading settings from Firestore:', error);
            }
        }
        loadSettings();
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

export function getWhatsAppUrl(number: string, message: string): string {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

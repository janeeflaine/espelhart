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
    footerText: string;
    phone: string;
    email: string;
    address: string;
}

const defaultSettings: SiteSettings = {
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
    footerText: '© 2026 Espelhart. Todos os direitos reservados.',
    phone: '(00) 0000-0000',
    email: 'contato@espelhart.com.br',
    address: 'São Paulo, SP',
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

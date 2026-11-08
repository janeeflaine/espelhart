'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSettings } from '@/lib/firebaseAdmin';
import { defaultSettings, mergeSettings, type SiteSettings } from '@/lib/siteSettings';

export type { SiteSettings };
export { defaultSettings };

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function useSettings() {
    return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

    useEffect(() => {
        let active = true;
        getSettings()
            .then((data) => {
                if (active && data) setSettings(mergeSettings(data));
            })
            .catch((error) => console.error('Error loading settings from Firestore:', error));
        return () => {
            active = false;
        };
    }, []);

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function getWhatsAppUrl(number: string, message: string): string {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string): string {
    return `tel:+55${phone.replace(/\D/g, '')}`;
}

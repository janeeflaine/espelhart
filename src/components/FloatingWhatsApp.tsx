'use client';

import { MessageCircle } from 'lucide-react';
import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';

export default function FloatingWhatsApp() {
    const settings = useSettings();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, settings.whatsappMessage);

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[100] bg-whatsapp hover:bg-whatsapp-hover text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 transition-all group active:scale-95"
            aria-label="Contato via WhatsApp"
        >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 group-hover:animate-bounce shrink-0" />

            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" />
        </a>
    );
}

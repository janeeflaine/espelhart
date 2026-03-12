'use client';

import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';
import { Mail, HelpCircle } from 'lucide-react';

export function LegalEmailText() {
    const settings = useSettings();
    return <strong> {settings.email || 'contato@espelhart.com.br'}</strong>;
}

export function LegalCTA() {
    const settings = useSettings();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, 'Olá! Tenho uma dúvida sobre as políticas/termos.');

    return (
        <div className="p-8 sm:p-10 bg-espelhart-medium rounded-2xl text-white text-center">
            <HelpCircle className="w-12 h-12 text-espelhart-accent mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dúvidas ou Contato?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Se você tiver qualquer dúvida sobre nossos termos ou como seus dados são tratados, entre em
                contato com nossa equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href={`mailto:${settings.email || 'contato@espelhart.com.br'}`}
                    className="inline-flex items-center justify-center gap-2 bg-espelhart-accent hover:bg-espelhart-accent/90 px-8 py-3 rounded-xl font-bold transition-all"
                >
                    <Mail className="w-4 h-4" />
                    Enviar E-mail
                </a>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-xl font-bold transition-all"
                >
                    Falar no WhatsApp
                </a>
            </div>
        </div>
    );
}

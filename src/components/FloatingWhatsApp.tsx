'use client';

import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';
import { useQuote } from '@/lib/QuoteContext';
import WhatsAppIcon from '@/components/WhatsAppIcon';

/** Desktop: floating WhatsApp button. Mobile: bottom action bar (quote + WhatsApp). */
export default function FloatingWhatsApp() {
    const settings = useSettings();
    const { requestQuote } = useQuote();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, settings.whatsappMessage);

    return (
        <>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conversar no WhatsApp"
                className="hidden lg:flex fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-wa hover:bg-wa-dark text-ink items-center justify-center shadow-[0_12px_30px_-8px_rgba(12,35,41,0.5)] transition-transform hover:scale-105"
            >
                <WhatsAppIcon className="w-8 h-8" />
            </a>

            <div className="lg:hidden fixed inset-x-0 bottom-0 z-[100] bg-paper/95 backdrop-blur border-t border-line px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3">
                <button
                    type="button"
                    onClick={() => requestQuote()}
                    className="flex-1 bg-ink text-white rounded-md py-3.5 font-semibold text-[15px]"
                >
                    Pedir orçamento
                </button>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-wa text-ink rounded-md py-3.5 font-semibold text-[15px]"
                >
                    <WhatsAppIcon />
                    WhatsApp
                </a>
            </div>
        </>
    );
}

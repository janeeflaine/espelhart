import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/5500000000000?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-whatsapp hover:bg-whatsapp-hover text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 transition-all group"
            aria-label="Contato via WhatsApp"
        >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 group-hover:animate-bounce" />

            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" />
        </a>
    );
}

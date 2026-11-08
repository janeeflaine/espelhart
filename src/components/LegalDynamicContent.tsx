'use client';

import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';
import { Mail } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export function LegalEmailText() {
    const settings = useSettings();
    return (
        <a href={`mailto:${settings.email}`} className="font-semibold text-ink underline decoration-teal underline-offset-2">
            {settings.email}
        </a>
    );
}

/** Company identification block (LGPD art. 9, III; Decreto 7.962/2013 art. 2). */
export function CompanyIdentity() {
    const s = useSettings();
    return (
        <dl className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-6 gap-y-2 rounded-md bg-mist p-5 text-[15px]">
            <dt className="text-muted">Empresa</dt>
            <dd className="text-ink font-medium">{s.companyLegalName || 'Espelhart Vidros e Esquadrias'}</dd>
            {s.cnpj && (
                <>
                    <dt className="text-muted">CNPJ</dt>
                    <dd className="text-ink font-medium">{s.cnpj}</dd>
                </>
            )}
            {s.address && (
                <>
                    <dt className="text-muted">Endereço</dt>
                    <dd className="text-ink font-medium whitespace-pre-line">{s.address}</dd>
                </>
            )}
            <dt className="text-muted">E-mail</dt>
            <dd className="text-ink font-medium break-all">{s.email}</dd>
            <dt className="text-muted">Telefone</dt>
            <dd className="text-ink font-medium">{s.phone}</dd>
        </dl>
    );
}

export function DpoContact() {
    const s = useSettings();
    return (
        <p>
            {s.dpoName ? (
                <>
                    O encarregado pelo tratamento de dados pessoais é <strong className="text-ink">{s.dpoName}</strong>, que pode ser
                    contatado pelo e-mail <LegalEmailText />.
                </>
            ) : (
                <>
                    O canal de comunicação com titulares de dados, que cumpre a função de encarregado, é o e-mail <LegalEmailText />.
                </>
            )}
        </p>
    );
}

export function LegalCTA() {
    const settings = useSettings();
    const whatsappUrl = getWhatsAppUrl(settings.whatsappNumber, 'Olá! Tenho uma dúvida sobre a política de privacidade ou os termos de uso.');

    return (
        <div className="rounded-md bg-ink text-white p-7 sm:p-9">
            <h2 className="font-wide text-2xl font-bold">Dúvidas sobre seus dados ou estes termos?</h2>
            <p className="mt-3 text-white/70 max-w-lg">Fale com a nossa equipe. Respondemos pedidos sobre dados pessoais em até 15 dias.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                    href={`mailto:${settings.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-paper text-ink px-6 py-3 font-semibold hover:bg-mist"
                >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Enviar e-mail
                </a>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-wa text-ink px-6 py-3 font-semibold hover:bg-wa-dark"
                >
                    <WhatsAppIcon />
                    Falar no WhatsApp
                </a>
            </div>
        </div>
    );
}

'use client';

import { useState, useId, FormEvent, ReactNode } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useSettings, getWhatsAppUrl } from '@/lib/SettingsContext';
import { useQuote } from '@/lib/QuoteContext';
import { useServices } from '@/lib/useServices';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const OTHER = 'Outro / ainda não sei';

function Chip({
    name,
    value,
    checked,
    onChange,
}: {
    name: string;
    value: string;
    checked: boolean;
    onChange: (v: string) => void;
}) {
    return (
        <label
            className={`cursor-pointer select-none rounded-full border px-4 py-2.5 text-[15px] font-medium transition-colors
                has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal has-[:focus-visible]:outline-offset-2
                ${checked ? 'bg-ink border-ink text-white' : 'bg-paper border-line text-ink hover:border-ink/40'}`}
        >
            <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
            {value}
        </label>
    );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
    return (
        <fieldset className="pt-6 first:pt-0">
            <legend className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-ink text-white text-sm font-bold flex items-center justify-center" aria-hidden="true">
                    {n}
                </span>
                <span className="text-lg font-semibold text-ink">{title}</span>
            </legend>
            {children}
        </fieldset>
    );
}

const inputClass =
    'w-full rounded-md border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25';

export default function Contact() {
    const settings = useSettings();
    const services = useServices();
    const { service, setService } = useQuote();
    const id = useId();

    const [property, setProperty] = useState('');
    const [timing, setTiming] = useState('');
    const [measures, setMeasures] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState<{ service?: string; name?: string }>({});
    const [sentUrl, setSentUrl] = useState<string | null>(null);

    const options = [...services.map((s) => s.title), OTHER];
    const phone = settings.phone;

    const buildMessage = () => {
        const details = [
            `*Serviço:* ${service}`,
            property && `*Imóvel:* ${property}`,
            measures.trim() && `*Medidas aproximadas:* ${measures.trim()}`,
            place.trim() && `*Bairro/cidade:* ${place.trim()}`,
            timing && `*Prazo:* ${timing}`,
            notes.trim() && `*Observações:* ${notes.trim()}`,
        ].filter(Boolean);
        return [`Olá! Sou ${name.trim()} e vim pelo site. Gostaria de um orçamento.`, '', ...details].join('\n');
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const next: typeof errors = {};
        if (!service) next.service = 'Escolha o serviço que você precisa.';
        if (!name.trim()) next.name = 'Informe seu nome para sabermos com quem falar.';
        setErrors(next);
        if (Object.keys(next).length > 0) {
            document.getElementById(next.service ? `${id}-servico` : `${id}-nome`)?.focus();
            return;
        }
        const url = getWhatsAppUrl(settings.whatsappNumber, buildMessage());
        window.open(url, '_blank', 'noopener,noreferrer');
        setSentUrl(url);
    };

    return (
        <section id="orcamento" className="py-16 sm:py-20 lg:py-28 bg-paper">
            <div id="contato" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-12 lg:gap-16">
                <div>
                    <h2 className="font-wide text-balance text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ink leading-[1.08]">
                        {settings.quoteTitle}
                    </h2>
                    <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed max-w-xl">
                        {settings.quoteSubtitle}
                    </p>

                    {sentUrl ? (
                        <div role="status" className="mt-10 rounded-md bg-mist p-6 sm:p-8">
                            <CheckCircle2 className="w-8 h-8 text-teal" aria-hidden="true" />
                            <p className="mt-4 text-xl font-semibold text-ink">Pedido pronto no WhatsApp</p>
                            <p className="mt-2 text-muted leading-relaxed">
                                Confira a mensagem e toque em enviar. Se o WhatsApp não abriu, use o botão abaixo.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <a
                                    href={sentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2.5 bg-wa hover:bg-wa-dark text-ink px-6 py-3.5 rounded-md font-semibold"
                                >
                                    <WhatsAppIcon />
                                    Abrir WhatsApp
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setSentUrl(null)}
                                    className="px-6 py-3.5 rounded-md font-semibold text-ink border border-line hover:border-ink/40"
                                >
                                    Editar pedido
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} noValidate className="mt-10 divide-y divide-line [&>fieldset]:pb-6">
                            <Step n={1} title="Qual serviço você precisa?">
                                <div
                                    id={`${id}-servico`}
                                    tabIndex={-1}
                                    role="radiogroup"
                                    aria-invalid={!!errors.service}
                                    aria-describedby={errors.service ? `${id}-servico-erro` : undefined}
                                    className="flex flex-wrap gap-2 focus:outline-none"
                                >
                                    {options.map((o) => (
                                        <Chip
                                            key={o}
                                            name="servico"
                                            value={o}
                                            checked={service === o}
                                            onChange={(v) => {
                                                setService(v);
                                                setErrors((e) => ({ ...e, service: undefined }));
                                            }}
                                        />
                                    ))}
                                </div>
                                {errors.service && (
                                    <p id={`${id}-servico-erro`} className="mt-3 text-sm font-medium text-[#B42318]">
                                        {errors.service}
                                    </p>
                                )}
                            </Step>

                            <Step n={2} title="Sobre o local">
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-sm font-medium text-ink mb-2">Tipo de imóvel</p>
                                        <div className="flex flex-wrap gap-2">
                                            {settings.quotePropertyTypes.filter(Boolean).map((o) => (
                                                <Chip key={o} name="imovel" value={o} checked={property === o} onChange={setProperty} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor={`${id}-medidas`} className="block text-sm font-medium text-ink mb-2">
                                                Medidas aproximadas <span className="text-muted font-normal">(opcional)</span>
                                            </label>
                                            <input
                                                id={`${id}-medidas`}
                                                value={measures}
                                                onChange={(e) => setMeasures(e.target.value)}
                                                placeholder="Ex.: 1,20 x 1,90 m"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`${id}-local`} className="block text-sm font-medium text-ink mb-2">
                                                Bairro ou cidade
                                            </label>
                                            <input
                                                id={`${id}-local`}
                                                value={place}
                                                onChange={(e) => setPlace(e.target.value)}
                                                autoComplete="address-level2"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-ink mb-2">Para quando?</p>
                                        <div className="flex flex-wrap gap-2">
                                            {settings.quoteTimings.filter(Boolean).map((o) => (
                                                <Chip key={o} name="prazo" value={o} checked={timing === o} onChange={setTiming} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Step>

                            <Step n={3} title="Seu contato">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor={`${id}-nome`} className="block text-sm font-medium text-ink mb-2">
                                            Seu nome
                                        </label>
                                        <input
                                            id={`${id}-nome`}
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                if (e.target.value.trim()) setErrors((er) => ({ ...er, name: undefined }));
                                            }}
                                            autoComplete="name"
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? `${id}-nome-erro` : undefined}
                                            className={`${inputClass} ${errors.name ? 'border-[#B42318]' : ''}`}
                                        />
                                        {errors.name && (
                                            <p id={`${id}-nome-erro`} className="mt-2 text-sm font-medium text-[#B42318]">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor={`${id}-obs`} className="block text-sm font-medium text-ink mb-2">
                                            Algo mais que devemos saber? <span className="text-muted font-normal">(opcional)</span>
                                        </label>
                                        <textarea
                                            id={`${id}-obs`}
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            rows={3}
                                            placeholder="Cor do vidro, tipo de abertura, se já tem projeto…"
                                            className={`${inputClass} resize-y`}
                                        />
                                    </div>
                                </div>
                            </Step>

                            <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2.5 bg-wa hover:bg-wa-dark text-ink px-7 py-4 rounded-md font-semibold text-base transition-colors"
                                >
                                    <WhatsAppIcon />
                                    Enviar pedido pelo WhatsApp
                                </button>
                                <p className="text-sm text-muted">Gratuito e sem compromisso.</p>
                            </div>
                        </form>
                    )}
                </div>

                <aside className="lg:pt-24">
                    <div className="rounded-md bg-ink text-white p-6 sm:p-8">
                        <p className="text-lg font-semibold">Prefere falar direto?</p>
                        <ul className="mt-6 space-y-5 text-[15px]">
                            <li>
                                <a href={`tel:+55${phone.replace(/\D/g, '')}`} className="flex items-start gap-3 hover:text-teal-light">
                                    <Phone className="w-5 h-5 text-teal-light shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>
                                        <span className="block text-white/60 text-sm">Telefone e WhatsApp</span>
                                        <span className="font-semibold">{phone}</span>
                                    </span>
                                </a>
                            </li>
                            {settings.email && (
                                <li>
                                    <a href={`mailto:${settings.email}`} className="flex items-start gap-3 hover:text-teal-light">
                                        <Mail className="w-5 h-5 text-teal-light shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="min-w-0">
                                            <span className="block text-white/60 text-sm">E-mail</span>
                                            <span className="font-semibold break-all">{settings.email}</span>
                                        </span>
                                    </a>
                                </li>
                            )}
                            {settings.address && (
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-teal-light shrink-0 mt-0.5" aria-hidden="true" />
                                    <span>
                                        <span className="block text-white/60 text-sm">Endereço</span>
                                        <span className="font-semibold whitespace-pre-line">{settings.address}</span>
                                    </span>
                                </li>
                            )}
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-teal-light shrink-0 mt-0.5" aria-hidden="true" />
                                <span>
                                    <span className="block text-white/60 text-sm">Horário</span>
                                    <span className="block font-semibold">{settings.hoursWeek}</span>
                                    {settings.hoursSaturday && <span className="block font-semibold">{settings.hoursSaturday}</span>}
                                </span>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    );
}

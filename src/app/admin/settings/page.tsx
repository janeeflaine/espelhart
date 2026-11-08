'use client';

import { PhoneCall } from 'lucide-react';
import { PageHeader, Panel, TextInput, TextArea, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';
import { getWhatsAppUrl, telHref } from '@/lib/SettingsContext';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const FIELDS = [
    'whatsappNumber',
    'whatsappMessage',
    'phone',
    'email',
    'address',
    'hoursWeek',
    'hoursSaturday',
    'instagram',
    'facebook',
] as const;

export default function AdminSettingsPage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    const waDigits = values.whatsappNumber.replace(/\D/g, '');
    const waValid = /^55\d{10,11}$/.test(waDigits);

    return (
        <>
            <PageHeader
                title="Contato e redes"
                description="Usados em todos os botões, no formulário de orçamento e no rodapé."
                siteAnchor="orcamento"
            />
            <div className="space-y-6 max-w-3xl">
                <Panel title="WhatsApp" description="Para onde vão os pedidos de orçamento.">
                    <div className="space-y-5">
                        <TextInput
                            label="Número do WhatsApp"
                            hint={
                                waValid
                                    ? 'Formato certo: 55 + DDD + número, só dígitos.'
                                    : 'Use 55 + DDD + número, só dígitos. Ex.: 556198179760'
                            }
                            value={values.whatsappNumber}
                            onChange={(v) => set('whatsappNumber', v.replace(/\D/g, ''))}
                            inputMode="numeric"
                            aria-invalid={!waValid}
                        />
                        <TextArea
                            label="Mensagem inicial do botão flutuante"
                            value={values.whatsappMessage}
                            onChange={(v) => set('whatsappMessage', v)}
                            rows={2}
                            maxLength={200}
                        />
                        <a
                            href={getWhatsAppUrl(waDigits, values.whatsappMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4 hover:text-teal"
                        >
                            <WhatsAppIcon className="w-4 h-4 text-[#1FAF53]" />
                            Testar este número no WhatsApp
                        </a>
                    </div>
                </Panel>

                <Panel title="Telefone, e-mail e endereço">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <TextInput
                                label="Telefone para ligações"
                                hint="Com o 9 do celular. Ex.: (61) 99817-9760"
                                value={values.phone}
                                onChange={(v) => set('phone', v)}
                                inputMode="tel"
                            />
                            <a href={telHref(values.phone)} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-ink">
                                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                                Testar ligação
                            </a>
                        </div>
                        <TextInput label="E-mail" type="email" value={values.email} onChange={(v) => set('email', v)} />
                        <div className="sm:col-span-2">
                            <TextArea label="Endereço" value={values.address} onChange={(v) => set('address', v)} rows={2} />
                        </div>
                    </div>
                </Panel>

                <Panel title="Horário de atendimento">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextInput label="Dias de semana" value={values.hoursWeek} onChange={(v) => set('hoursWeek', v)} placeholder="Seg a sex, 8h às 18h" />
                        <TextInput
                            label="Sábado"
                            hint="Deixe em branco se não abrir."
                            value={values.hoursSaturday}
                            onChange={(v) => set('hoursSaturday', v)}
                            placeholder="Sábado, 8h às 12h"
                        />
                    </div>
                </Panel>

                <Panel title="Redes sociais" description="Os ícones só aparecem no rodapé quando o link estiver preenchido.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextInput label="Instagram" type="url" value={values.instagram} onChange={(v) => set('instagram', v)} placeholder="https://instagram.com/espelhart" />
                        <TextInput label="Facebook" type="url" value={values.facebook} onChange={(v) => set('facebook', v)} placeholder="https://facebook.com/espelhart" />
                    </div>
                </Panel>
            </div>
            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

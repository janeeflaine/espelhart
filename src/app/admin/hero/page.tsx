'use client';

import { Check } from 'lucide-react';
import { PageHeader, Panel, TextInput, TextArea, ImageField, StringListEditor, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

const FIELDS = ['heroBadge', 'heroTitle', 'heroSubtitle', 'heroImage', 'heroPromises'] as const;

export default function AdminHeroPage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    return (
        <>
            <PageHeader
                title="Topo do site"
                description="É a primeira coisa que o cliente vê. Um título claro e uma boa foto de obra fazem a diferença."
                siteAnchor=""
            />

            <div className="grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 items-start">
                <div className="space-y-6">
                    <Panel title="Textos">
                        <div className="space-y-5">
                            <TextInput label="Frase acima do título" value={values.heroBadge} onChange={(v) => set('heroBadge', v)} maxLength={60} />
                            <TextArea
                                label="Título principal"
                                hint="Use Enter para quebrar a linha onde quiser."
                                value={values.heroTitle}
                                onChange={(v) => set('heroTitle', v)}
                                rows={2}
                                maxLength={70}
                            />
                            <TextArea label="Texto de apoio" value={values.heroSubtitle} onChange={(v) => set('heroSubtitle', v)} rows={3} maxLength={220} />
                        </div>
                    </Panel>

                    <Panel title="Foto" description="Aparece dentro da janela de correr. Prefira fotos verticais de obras reais.">
                        <ImageField label="Foto do topo" value={values.heroImage} onChange={(v) => set('heroImage', v)} folder="_site/hero" aspect="aspect-[5/4]" />
                    </Panel>

                    <Panel title="Garantias" description="Itens com ✓ abaixo dos botões. Até 4 ficam melhor.">
                        <StringListEditor
                            label="Itens"
                            items={values.heroPromises}
                            onChange={(v) => set('heroPromises', v)}
                            addLabel="Adicionar item"
                            placeholder="Ex.: Orçamento gratuito"
                            max={6}
                        />
                    </Panel>
                </div>

                {/* Live preview */}
                <div className="xl:sticky xl:top-24">
                    <p className="mb-2 text-sm font-medium text-muted">Prévia ao vivo</p>
                    <div className="rounded-lg border border-line overflow-hidden shadow-[0_20px_50px_-24px_rgba(12,35,41,0.35)] bg-mist">
                        <div className="h-8 bg-paper border-b border-line flex items-center gap-1.5 px-3" aria-hidden="true">
                            <span className="w-2.5 h-2.5 rounded-full bg-line" />
                            <span className="w-2.5 h-2.5 rounded-full bg-line" />
                            <span className="w-2.5 h-2.5 rounded-full bg-line" />
                            <span className="ml-3 h-4 flex-1 max-w-[12rem] rounded bg-mist" />
                        </div>
                        <div className="p-5 sm:p-7 grid grid-cols-[1.1fr_0.9fr] gap-5 items-center">
                            <div className="min-w-0">
                                <p className="text-[10px] font-medium text-teal truncate">{values.heroBadge}</p>
                                <p className="mt-2 font-wide font-bold text-ink text-[1.35rem] sm:text-[1.6rem] leading-[1.05] whitespace-pre-line break-words">
                                    {values.heroTitle}
                                </p>
                                <p className="mt-3 text-[11px] leading-relaxed text-muted line-clamp-4">{values.heroSubtitle}</p>
                                <div className="mt-4 flex gap-1.5">
                                    <span className="rounded bg-ink px-2.5 py-1.5 text-[9px] font-semibold text-white">Pedir orçamento</span>
                                    <span className="rounded bg-wa px-2.5 py-1.5 text-[9px] font-semibold text-ink">WhatsApp</span>
                                </div>
                                <ul className="mt-3 grid grid-cols-2 gap-1">
                                    {values.heroPromises.filter(Boolean).map((p, i) => (
                                        <li key={i} className="flex items-center gap-1 text-[9px] text-ink">
                                            <Check className="w-2.5 h-2.5 text-teal shrink-0" aria-hidden="true" />
                                            <span className="truncate">{p}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="window-frame !p-1.5">
                                <div className="relative aspect-[5/6] overflow-hidden bg-ink">
                                    {values.heroImage && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={values.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                    <div className="window-sash window-sash--fixed !border-[4px]" aria-hidden="true" />
                                    <div className="window-sash !left-[4%] !border-[4px]" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

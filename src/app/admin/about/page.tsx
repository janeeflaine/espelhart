'use client';

import { PageHeader, Panel, TextInput, TextArea, ImageField, ListEditor, StringListEditor, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

const FIELDS = ['aboutTitle', 'aboutText', 'aboutImage', 'aboutStats', 'aboutHighlights'] as const;

export default function AdminAboutPage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    return (
        <>
            <PageHeader title="Quem somos" description="Conte a história da Espelhart e mostre os números que dão confiança." siteAnchor="sobre" />
            <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 items-start">
                <div className="space-y-6">
                    <Panel title="Texto">
                        <div className="space-y-5">
                            <TextArea label="Título" value={values.aboutTitle} onChange={(v) => set('aboutTitle', v)} rows={2} maxLength={90} />
                            <TextArea
                                label="Sobre a empresa"
                                hint="Deixe em branco para usar o texto padrão. Linhas em branco viram parágrafos."
                                value={values.aboutText}
                                onChange={(v) => set('aboutText', v)}
                                rows={7}
                            />
                        </div>
                    </Panel>
                    <Panel title="Números" description="Ex.: anos de mercado, obras entregues. Use só números reais.">
                        <ListEditor
                            items={values.aboutStats}
                            onChange={(v) => set('aboutStats', v)}
                            create={() => ({ value: '', label: '' })}
                            addLabel="Adicionar número"
                            itemLabel={(i) => `Número ${i + 1}`}
                            max={4}
                            render={(stat, update) => (
                                <div className="grid grid-cols-[7rem_1fr] gap-3">
                                    <TextInput label="Valor" value={stat.value} onChange={(v) => update({ ...stat, value: v })} placeholder="10+" maxLength={8} />
                                    <TextInput label="Descrição" value={stat.label} onChange={(v) => update({ ...stat, label: v })} placeholder="Anos de mercado" maxLength={30} />
                                </div>
                            )}
                        />
                    </Panel>
                </div>
                <div className="space-y-6">
                    <Panel title="Foto">
                        <ImageField label="Foto da seção" value={values.aboutImage} onChange={(v) => set('aboutImage', v)} folder="_site/about" aspect="aspect-[4/5]" />
                    </Panel>
                    <Panel title="Selos" description="Frases curtas exibidas abaixo dos números.">
                        <StringListEditor
                            label="Selos"
                            items={values.aboutHighlights}
                            onChange={(v) => set('aboutHighlights', v)}
                            addLabel="Adicionar selo"
                            placeholder="Ex.: Garantia em todos os serviços"
                            max={3}
                        />
                    </Panel>
                </div>
            </div>
            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

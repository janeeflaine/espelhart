'use client';

import { PageHeader, Panel, TextInput, TextArea, ListEditor, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

const FIELDS = ['featuresTitle', 'featuresSubtitle', 'features'] as const;

export default function AdminFeaturesPage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    return (
        <>
            <PageHeader title="Diferenciais" description="Os motivos para o cliente escolher a Espelhart e não a concorrência." siteAnchor="sobre" />
            <div className="space-y-6 max-w-3xl">
                <Panel title="Cabeçalho da seção">
                    <div className="space-y-5">
                        <TextInput label="Título" value={values.featuresTitle} onChange={(v) => set('featuresTitle', v)} maxLength={60} />
                        <TextArea label="Texto de apoio" value={values.featuresSubtitle} onChange={(v) => set('featuresSubtitle', v)} rows={2} maxLength={180} />
                    </div>
                </Panel>
                <Panel title="Diferenciais" description="Quatro itens deixam a seção equilibrada.">
                    <ListEditor
                        items={values.features}
                        onChange={(v) => set('features', v)}
                        create={() => ({ title: '', description: '' })}
                        addLabel="Adicionar diferencial"
                        itemLabel={(i) => `Diferencial ${i + 1}`}
                        max={6}
                        render={(f, update) => (
                            <div className="space-y-4">
                                <TextInput label="Título" value={f.title} onChange={(v) => update({ ...f, title: v })} maxLength={40} />
                                <TextArea label="Explicação" value={f.description} onChange={(v) => update({ ...f, description: v })} rows={2} maxLength={160} />
                            </div>
                        )}
                    />
                </Panel>
            </div>
            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

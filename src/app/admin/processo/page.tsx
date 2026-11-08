'use client';

import { PageHeader, Panel, TextInput, TextArea, ListEditor, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

const FIELDS = ['processTitle', 'processSteps'] as const;

export default function AdminProcessPage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    return (
        <>
            <PageHeader
                title="Como funciona"
                description="Mostra ao cliente o caminho do pedido até a instalação. Etapas claras passam segurança para fechar."
                siteAnchor="como-funciona"
            />
            <div className="space-y-6 max-w-3xl">
                <Panel title="Título da seção">
                    <TextInput label="Título" value={values.processTitle} onChange={(v) => set('processTitle', v)} maxLength={60} />
                </Panel>
                <Panel title="Etapas" description="Aparecem numeradas na ordem abaixo. O ideal são 3 ou 4.">
                    <ListEditor
                        items={values.processSteps}
                        onChange={(v) => set('processSteps', v)}
                        create={() => ({ title: '', description: '' })}
                        addLabel="Adicionar etapa"
                        itemLabel={(i) => `Etapa ${i + 1}`}
                        max={6}
                        min={1}
                        render={(step, update) => (
                            <div className="space-y-4">
                                <TextInput label="Nome da etapa" value={step.title} onChange={(v) => update({ ...step, title: v })} maxLength={40} />
                                <TextArea label="Explicação" value={step.description} onChange={(v) => update({ ...step, description: v })} rows={2} maxLength={160} />
                            </div>
                        )}
                    />
                </Panel>
            </div>
            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

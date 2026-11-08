'use client';

import { PageHeader, Panel, TextInput, TextArea, StringListEditor, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

const FIELDS = ['quoteTitle', 'quoteSubtitle', 'quotePropertyTypes', 'quoteTimings'] as const;

export default function AdminQuotePage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    return (
        <>
            <PageHeader
                title="Formulário de orçamento"
                description="O pedido do cliente chega no WhatsApp já organizado com estas respostas. A lista de serviços vem da página Serviços."
                siteAnchor="orcamento"
            />
            <div className="space-y-6 max-w-3xl">
                <Panel title="Cabeçalho">
                    <div className="space-y-5">
                        <TextInput label="Título" value={values.quoteTitle} onChange={(v) => set('quoteTitle', v)} maxLength={60} />
                        <TextArea label="Texto de apoio" value={values.quoteSubtitle} onChange={(v) => set('quoteSubtitle', v)} rows={3} maxLength={220} />
                    </div>
                </Panel>
                <Panel title="Opções de resposta" description="Botões que o cliente toca no formulário.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <StringListEditor
                            label="Tipo de imóvel"
                            items={values.quotePropertyTypes}
                            onChange={(v) => set('quotePropertyTypes', v)}
                            addLabel="Adicionar opção"
                            max={8}
                        />
                        <StringListEditor
                            label="Para quando?"
                            items={values.quoteTimings}
                            onChange={(v) => set('quoteTimings', v)}
                            addLabel="Adicionar opção"
                            max={6}
                        />
                    </div>
                </Panel>
            </div>
            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

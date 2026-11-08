'use client';

import { PageHeader, Panel, TextInput, TextArea, SaveBar, LoadingState } from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

const FIELDS = ['footerDescription', 'footerText'] as const;

export default function AdminFooterPage() {
    const { values, set, dirty, saving, save, discard, loading } = useSettingsEditor(FIELDS);
    if (loading || !values) return <LoadingState />;

    return (
        <>
            <PageHeader title="Rodapé" description="Texto institucional e linha de direitos autorais no fim de todas as páginas." siteAnchor="" />
            <div className="space-y-6 max-w-3xl">
                <Panel title="Rodapé">
                    <div className="space-y-5">
                        <TextArea label="Descrição da empresa" value={values.footerDescription} onChange={(v) => set('footerDescription', v)} rows={3} maxLength={200} />
                        <TextInput label="Linha de direitos autorais" value={values.footerText} onChange={(v) => set('footerText', v)} maxLength={90} />
                    </div>
                </Panel>
            </div>
            <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={discard} />
        </>
    );
}

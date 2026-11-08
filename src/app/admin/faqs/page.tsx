'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, HelpCircle, Pencil, Plus, Trash2 } from 'lucide-react';
import { addFAQ, deleteFAQ, getFAQs, saveOrder, updateFAQ, type FAQ } from '@/lib/firebaseAdmin';
import {
    Button,
    Drawer,
    EmptyState,
    IconButton,
    LoadingState,
    PageHeader,
    Panel,
    SaveBar,
    TextArea,
    TextInput,
    useConfirm,
    useToast,
} from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

type Draft = Pick<FAQ, 'question' | 'answer'>;

export default function AdminFaqsPage() {
    const toast = useToast();
    const confirm = useConfirm();
    const section = useSettingsEditor(['faqTitle', 'faqSubtitle'] as const);
    const [items, setItems] = useState<FAQ[] | null>(null);
    const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
    const [saving, setSaving] = useState(false);

    const load = useCallback(async () => {
        try {
            setItems(await getFAQs());
        } catch (e) {
            console.error(e);
            setItems([]);
            toast.error('Não foi possível carregar as dúvidas.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const closeDrawer = useCallback(() => setEditing(null), []);

    if (!items || section.loading || !section.values) return <LoadingState />;

    const setDraft = (patch: Partial<Draft>) => setEditing((e) => (e ? { ...e, draft: { ...e.draft, ...patch } } : e));

    const submit = async () => {
        if (!editing) return;
        const { id, draft } = editing;
        if (!draft.question.trim() || !draft.answer.trim()) {
            toast.error('Preencha a pergunta e a resposta.');
            return;
        }
        setSaving(true);
        try {
            if (id) await updateFAQ(id, draft);
            else await addFAQ({ ...draft, order: items.length });
            toast.success(id ? 'Dúvida atualizada.' : 'Dúvida publicada no site.');
            setEditing(null);
            await load();
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível salvar.');
        } finally {
            setSaving(false);
        }
    };

    const remove = async (f: FAQ) => {
        const ok = await confirm({ title: 'Excluir esta dúvida?', description: f.question });
        if (!ok || !f.id) return;
        try {
            await deleteFAQ(f.id);
            toast.success('Dúvida excluída.');
            await load();
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível excluir.');
        }
    };

    const move = async (from: number, to: number) => {
        const next = [...items];
        const [it] = next.splice(from, 1);
        next.splice(to, 0, it);
        setItems(next);
        try {
            await saveOrder('faqs', next.map((f) => f.id!).filter(Boolean));
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível salvar a nova ordem.');
            load();
        }
    };

    const newButton = (
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setEditing({ id: null, draft: { question: '', answer: '' } })}>
            Nova dúvida
        </Button>
    );

    return (
        <>
            <PageHeader
                title="Dúvidas"
                description="Responda aqui o que os clientes mais perguntam no WhatsApp. A primeira já aparece aberta no site."
                siteAnchor="faq"
                actions={newButton}
            />

            <div className="space-y-6">
                {items.length === 0 ? (
                    <EmptyState
                        icon={<HelpCircle className="w-6 h-6" />}
                        title="Nenhuma dúvida cadastrada"
                        text="Enquanto a lista estiver vazia, o site mostra perguntas de exemplo."
                        action={newButton}
                    />
                ) : (
                    <ol className="rounded-lg bg-paper border border-line/80 divide-y divide-line">
                        {items.map((f, i) => (
                            <li key={f.id} className="flex flex-wrap sm:flex-nowrap items-start gap-x-3 gap-y-1 p-4 sm:px-5">
                                <span className="mt-0.5 w-6 shrink-0 text-sm font-semibold text-muted tabular-nums">{i + 1}.</span>
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-ink">{f.question}</p>
                                    <p className="mt-1 text-sm text-muted line-clamp-2">{f.answer}</p>
                                </div>
                                <div className="flex shrink-0 w-full sm:w-auto justify-end -mr-2 sm:mr-0">
                                    <IconButton label="Mover para cima" disabled={i === 0} onClick={() => move(i, i - 1)}>
                                        <ArrowUp className="w-4 h-4" />
                                    </IconButton>
                                    <IconButton label="Mover para baixo" disabled={i === items.length - 1} onClick={() => move(i, i + 1)}>
                                        <ArrowDown className="w-4 h-4" />
                                    </IconButton>
                                    <IconButton label="Editar" onClick={() => setEditing({ id: f.id ?? null, draft: { question: f.question, answer: f.answer } })}>
                                        <Pencil className="w-4 h-4" />
                                    </IconButton>
                                    <IconButton label="Excluir" tone="danger" onClick={() => remove(f)}>
                                        <Trash2 className="w-4 h-4" />
                                    </IconButton>
                                </div>
                            </li>
                        ))}
                    </ol>
                )}

                <Panel title="Cabeçalho da seção">
                    <div className="space-y-5 max-w-2xl">
                        <TextInput label="Título" value={section.values.faqTitle} onChange={(v) => section.set('faqTitle', v)} maxLength={60} />
                        <TextArea label="Texto de apoio" value={section.values.faqSubtitle} onChange={(v) => section.set('faqSubtitle', v)} rows={2} maxLength={160} />
                    </div>
                </Panel>
            </div>

            <Drawer
                open={!!editing}
                title={editing?.id ? 'Editar dúvida' : 'Nova dúvida'}
                onClose={closeDrawer}
                footer={
                    <>
                        <Button variant="secondary" onClick={closeDrawer}>
                            Cancelar
                        </Button>
                        <Button onClick={submit} loading={saving}>
                            {editing?.id ? 'Salvar e publicar' : 'Publicar dúvida'}
                        </Button>
                    </>
                }
            >
                {editing && (
                    <>
                        <TextInput label="Pergunta" value={editing.draft.question} onChange={(v) => setDraft({ question: v })} maxLength={120} />
                        <TextArea label="Resposta" value={editing.draft.answer} onChange={(v) => setDraft({ answer: v })} rows={7} maxLength={800} />
                    </>
                )}
            </Drawer>

            <SaveBar dirty={section.dirty} saving={section.saving} onSave={section.save} onDiscard={section.discard} />
        </>
    );
}

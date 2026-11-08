'use client';

import { useCallback, useEffect, useState } from 'react';
import { Eye, EyeOff, MessageSquareQuote, Pencil, Plus, Star, Trash2 } from 'lucide-react';
import { addTestimonial, deleteTestimonial, getTestimonials, updateTestimonial, type Testimonial } from '@/lib/firebaseAdmin';
import {
    Button,
    Drawer,
    EmptyState,
    Field,
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

type Draft = Pick<Testimonial, 'name' | 'text' | 'rating' | 'date'>;
const emptyDraft: Draft = { name: '', text: '', rating: 5, date: '' };

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <Field label="Nota">
            <div role="radiogroup" aria-label="Nota" className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={value === n}
                        aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
                        onClick={() => onChange(n)}
                        className="p-1 rounded text-[#E8A33D] hover:scale-110 transition-transform"
                    >
                        <Star className={`w-7 h-7 ${n <= value ? 'fill-current' : 'opacity-30'}`} />
                    </button>
                ))}
            </div>
        </Field>
    );
}

export default function AdminTestimonialsPage() {
    const toast = useToast();
    const confirm = useConfirm();
    const section = useSettingsEditor(['testimonialsTitle'] as const);
    const [items, setItems] = useState<Testimonial[] | null>(null);
    const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
    const [saving, setSaving] = useState(false);

    const load = useCallback(async () => {
        try {
            setItems(await getTestimonials());
        } catch (e) {
            console.error(e);
            setItems([]);
            toast.error('Não foi possível carregar os depoimentos.');
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
        if (!draft.name.trim() || !draft.text.trim()) {
            toast.error('Preencha o nome do cliente e o depoimento.');
            return;
        }
        setSaving(true);
        try {
            if (id) await updateTestimonial(id, draft);
            else await addTestimonial(draft);
            toast.success(id ? 'Depoimento atualizado.' : 'Depoimento publicado no site.');
            setEditing(null);
            await load();
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível salvar o depoimento.');
        } finally {
            setSaving(false);
        }
    };

    const remove = async (t: Testimonial) => {
        const ok = await confirm({
            title: `Excluir o depoimento de ${t.name}?`,
            description: items.length === 1 ? 'É o último depoimento: a seção vai sumir do site.' : 'Esta ação não pode ser desfeita.',
        });
        if (!ok || !t.id) return;
        try {
            await deleteTestimonial(t.id);
            toast.success('Depoimento excluído.');
            await load();
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível excluir.');
        }
    };

    const visible = items.length > 0;
    const newButton = (
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setEditing({ id: null, draft: { ...emptyDraft } })}>
            Novo depoimento
        </Button>
    );

    return (
        <>
            <PageHeader
                title="Depoimentos"
                description="Avaliações reais de clientes. Peça permissão antes de publicar o nome de alguém."
                siteAnchor={visible ? 'depoimentos' : undefined}
                actions={newButton}
            />

            <div
                className={`mb-6 flex items-start gap-3 rounded-lg px-4 py-3 text-sm ${
                    visible ? 'bg-edge/30 text-ink' : 'bg-[#E8A33D]/15 text-ink'
                }`}
            >
                {visible ? <Eye className="w-5 h-5 shrink-0 text-teal" aria-hidden="true" /> : <EyeOff className="w-5 h-5 shrink-0 text-[#A86A12]" aria-hidden="true" />}
                <p>
                    {visible
                        ? `A seção está visível no site com ${items.length} depoimento${items.length > 1 ? 's' : ''}.`
                        : 'A seção está escondida no site. Ela aparece assim que você publicar o primeiro depoimento.'}
                </p>
            </div>

            <div className="space-y-6">
                {items.length === 0 ? (
                    <EmptyState
                        icon={<MessageSquareQuote className="w-6 h-6" />}
                        title="Nenhum depoimento ainda"
                        text="Copie avaliações do Google ou mensagens de clientes satisfeitos (com a permissão deles)."
                        action={newButton}
                    />
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {items.map((t) => (
                            <li key={t.id} className="flex flex-col rounded-lg bg-paper border border-line/80 p-5">
                                <div className="flex text-[#E8A33D]" aria-label={`${t.rating} de 5 estrelas`}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'opacity-25'}`} aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="mt-3 text-[15px] text-ink leading-relaxed line-clamp-4 flex-1">{t.text}</p>
                                <div className="mt-4 flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-ink truncate">{t.name}</p>
                                        {t.date && <p className="text-xs text-muted">{t.date}</p>}
                                    </div>
                                    <div className="flex">
                                        <IconButton
                                            label="Editar"
                                            onClick={() =>
                                                setEditing({ id: t.id ?? null, draft: { name: t.name, text: t.text, rating: t.rating || 5, date: t.date || '' } })
                                            }
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </IconButton>
                                        <IconButton label="Excluir" tone="danger" onClick={() => remove(t)}>
                                            <Trash2 className="w-4 h-4" />
                                        </IconButton>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <Panel title="Título da seção">
                    <div className="max-w-2xl">
                        <TextInput label="Título" value={section.values.testimonialsTitle} onChange={(v) => section.set('testimonialsTitle', v)} maxLength={60} />
                    </div>
                </Panel>
            </div>

            <Drawer
                open={!!editing}
                title={editing?.id ? 'Editar depoimento' : 'Novo depoimento'}
                onClose={closeDrawer}
                footer={
                    <>
                        <Button variant="secondary" onClick={closeDrawer}>
                            Cancelar
                        </Button>
                        <Button onClick={submit} loading={saving}>
                            {editing?.id ? 'Salvar e publicar' : 'Publicar depoimento'}
                        </Button>
                    </>
                }
            >
                {editing && (
                    <>
                        <TextInput label="Nome do cliente" value={editing.draft.name} onChange={(v) => setDraft({ name: v })} placeholder="Ex.: Maria S." maxLength={40} />
                        <TextArea label="Depoimento" value={editing.draft.text} onChange={(v) => setDraft({ text: v })} rows={5} maxLength={400} />
                        <StarPicker value={editing.draft.rating} onChange={(v) => setDraft({ rating: v })} />
                        <TextInput
                            label="Quando ou onde"
                            hint="Opcional. Ex.: Março de 2026, ou Avaliação no Google"
                            value={editing.draft.date ?? ''}
                            onChange={(v) => setDraft({ date: v })}
                            maxLength={40}
                        />
                    </>
                )}
            </Drawer>

            <SaveBar dirty={section.dirty} saving={section.saving} onSave={section.save} onDiscard={section.discard} />
        </>
    );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Images, Loader2, Pencil, Plus, Star, Trash2, Wrench, X } from 'lucide-react';
import { addService, deleteService, getServices, saveOrder, updateService, type Service } from '@/lib/firebaseAdmin';
import { uploadSiteImage } from '@/lib/imageUpload';
import {
    Button,
    Drawer,
    EmptyState,
    Field,
    IconButton,
    ImageField,
    LoadingState,
    PageHeader,
    Panel,
    SaveBar,
    Switch,
    TextArea,
    TextInput,
    useConfirm,
    useToast,
} from '../_ui';
import { useSettingsEditor } from '../_useSettingsEditor';

type Draft = Pick<Service, 'title' | 'description' | 'mainImage' | 'gallery' | 'featured'>;
const emptyDraft: Draft = { title: '', description: '', mainImage: '', gallery: [], featured: false };

function GalleryEditor({ images, onChange }: { images: string[]; onChange: (v: string[]) => void }) {
    const input = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(0);
    const toast = useToast();

    const add = async (files: FileList | null) => {
        const list = Array.from(files ?? []).filter((f) => f.type.startsWith('image/'));
        if (list.length === 0) return;
        setUploading(list.length);
        const urls: string[] = [];
        for (const file of list) {
            try {
                urls.push(await uploadSiteImage(file, 'gallery'));
            } catch (e) {
                console.error(e);
                toast.error(`Não foi possível enviar ${file.name}.`);
            }
            setUploading((n) => n - 1);
        }
        onChange([...images, ...urls]);
        if (input.current) input.current.value = '';
    };

    return (
        <Field label="Galeria de obras" hint="Fotos extras exibidas em miniatura abaixo da foto principal. Arraste várias de uma vez.">
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    add(e.dataTransfer.files);
                }}
                className="grid grid-cols-3 sm:grid-cols-4 gap-2"
            >
                {images.map((src, i) => (
                    <div key={src} className="group relative aspect-square rounded-md overflow-hidden bg-mist">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Foto ${i + 1} da galeria`} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-1 bottom-1 flex justify-between opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                            <button
                                type="button"
                                aria-label="Mover para a esquerda"
                                disabled={i === 0}
                                onClick={() => {
                                    const next = [...images];
                                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                                    onChange(next);
                                }}
                                className="w-7 h-7 rounded bg-paper/95 text-ink flex items-center justify-center disabled:opacity-30"
                            >
                                <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                            </button>
                            <button
                                type="button"
                                aria-label="Remover foto"
                                onClick={() => onChange(images.filter((_, j) => j !== i))}
                                className="w-7 h-7 rounded bg-paper/95 text-[#B42318] flex items-center justify-center"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
                {Array.from({ length: uploading }, (_, i) => (
                    <div key={`up-${i}`} className="aspect-square rounded-md bg-mist flex items-center justify-center text-muted">
                        <Loader2 className="w-5 h-5 animate-spin" aria-label="Enviando" />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => input.current?.click()}
                    className="aspect-square rounded-md border border-dashed border-ink/25 flex flex-col items-center justify-center gap-1 text-muted hover:border-teal hover:text-teal transition-colors"
                >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                    <span className="text-xs font-medium">Adicionar</span>
                </button>
                <input ref={input} type="file" accept="image/*" multiple className="hidden" onChange={(e) => add(e.target.files)} />
            </div>
        </Field>
    );
}

export default function AdminServicesPage() {
    const toast = useToast();
    const confirm = useConfirm();
    const section = useSettingsEditor(['servicesTitle', 'servicesSubtitle'] as const);

    const [services, setServices] = useState<Service[] | null>(null);
    const [editing, setEditing] = useState<{ id: string | null; draft: Draft } | null>(null);
    const [saving, setSaving] = useState(false);

    const load = useCallback(async () => {
        try {
            setServices(await getServices());
        } catch (e) {
            console.error(e);
            setServices([]);
            toast.error('Não foi possível carregar os serviços.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const closeDrawer = useCallback(() => setEditing(null), []);

    if (!services || section.loading || !section.values) return <LoadingState />;

    const setDraft = (patch: Partial<Draft>) => setEditing((e) => (e ? { ...e, draft: { ...e.draft, ...patch } } : e));

    const submit = async () => {
        if (!editing) return;
        const { id, draft } = editing;
        if (!draft.title.trim() || !draft.description.trim()) {
            toast.error('Preencha o nome e a descrição do serviço.');
            return;
        }
        setSaving(true);
        try {
            if (id) {
                await updateService(id, draft);
            } else {
                await addService({ ...draft, order: services.length });
            }
            toast.success(id ? 'Serviço atualizado no site.' : 'Serviço adicionado ao site.');
            setEditing(null);
            await load();
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível salvar o serviço. Tente de novo.');
        } finally {
            setSaving(false);
        }
    };

    const remove = async (s: Service) => {
        const ok = await confirm({
            title: `Excluir "${s.title}"?`,
            description: 'O serviço sai do site e do formulário de orçamento. Esta ação não pode ser desfeita.',
        });
        if (!ok || !s.id) return;
        try {
            await deleteService(s.id);
            toast.success('Serviço excluído.');
            await load();
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível excluir o serviço.');
        }
    };

    const move = async (from: number, to: number) => {
        const next = [...services];
        const [it] = next.splice(from, 1);
        next.splice(to, 0, it);
        setServices(next);
        try {
            await saveOrder('services', next.map((s) => s.id!).filter(Boolean));
        } catch (e) {
            console.error(e);
            toast.error('Não foi possível salvar a nova ordem.');
            load();
        }
    };

    return (
        <>
            <PageHeader
                title="Serviços"
                description="Cada serviço aparece no site com foto, galeria e botão de orçamento, e vira uma opção no formulário."
                siteAnchor="servicos"
                actions={
                    <Button icon={<Plus className="w-4 h-4" />} onClick={() => setEditing({ id: null, draft: { ...emptyDraft } })}>
                        Novo serviço
                    </Button>
                }
            />

            <div className="space-y-6">
                {services.length === 0 ? (
                    <EmptyState
                        icon={<Wrench className="w-6 h-6" />}
                        title="Nenhum serviço cadastrado"
                        text="Enquanto não houver serviços, o site mostra uma lista de exemplo. Cadastre o primeiro para substituir."
                        action={
                            <Button icon={<Plus className="w-4 h-4" />} onClick={() => setEditing({ id: null, draft: { ...emptyDraft } })}>
                                Cadastrar serviço
                            </Button>
                        }
                    />
                ) : (
                    <ul className="space-y-3">
                        {services.map((s, i) => (
                            <li key={s.id} className="flex items-center gap-4 rounded-lg bg-paper border border-line/80 p-3 pr-2 sm:pr-3">
                                <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-md overflow-hidden bg-mist shrink-0">
                                    {s.mainImage && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={s.mainImage} alt="" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-semibold text-ink truncate">{s.title}</p>
                                        {s.featured && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-edge/40 px-2 py-0.5 text-[11px] font-semibold text-ink">
                                                <Star className="w-3 h-3 fill-current" aria-hidden="true" /> Destaque
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-0.5 text-sm text-muted line-clamp-1">{s.description}</p>
                                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                                        <Images className="w-3.5 h-3.5" aria-hidden="true" />
                                        {(() => {
                                            const n = (s.gallery?.length ?? 0) + (s.mainImage ? 1 : 0);
                                            return n === 1 ? '1 foto' : `${n} fotos`;
                                        })()}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="hidden sm:flex">
                                        <IconButton label="Mover para cima" disabled={i === 0} onClick={() => move(i, i - 1)}>
                                            <ArrowUp className="w-4 h-4" />
                                        </IconButton>
                                        <IconButton label="Mover para baixo" disabled={i === services.length - 1} onClick={() => move(i, i + 1)}>
                                            <ArrowDown className="w-4 h-4" />
                                        </IconButton>
                                    </div>
                                    <IconButton
                                        label="Editar"
                                        onClick={() =>
                                            setEditing({
                                                id: s.id ?? null,
                                                draft: {
                                                    title: s.title,
                                                    description: s.description,
                                                    mainImage: s.mainImage || '',
                                                    gallery: s.gallery || [],
                                                    featured: !!s.featured,
                                                },
                                            })
                                        }
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </IconButton>
                                    <IconButton label="Excluir" tone="danger" onClick={() => remove(s)}>
                                        <Trash2 className="w-4 h-4" />
                                    </IconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <Panel title="Cabeçalho da seção" description="Título e texto acima da lista de serviços no site.">
                    <div className="space-y-5 max-w-2xl">
                        <TextInput label="Título" value={section.values.servicesTitle} onChange={(v) => section.set('servicesTitle', v)} maxLength={60} />
                        <TextArea label="Texto de apoio" value={section.values.servicesSubtitle} onChange={(v) => section.set('servicesSubtitle', v)} rows={2} maxLength={180} />
                    </div>
                </Panel>
            </div>

            <Drawer
                open={!!editing}
                title={editing?.id ? 'Editar serviço' : 'Novo serviço'}
                onClose={closeDrawer}
                footer={
                    <>
                        <Button variant="secondary" onClick={closeDrawer}>
                            Cancelar
                        </Button>
                        <Button onClick={submit} loading={saving}>
                            {editing?.id ? 'Salvar e publicar' : 'Adicionar ao site'}
                        </Button>
                    </>
                }
            >
                {editing && (
                    <>
                        <TextInput label="Nome do serviço" value={editing.draft.title} onChange={(v) => setDraft({ title: v })} placeholder="Ex.: Box para banheiro" maxLength={40} />
                        <TextArea label="Descrição" value={editing.draft.description} onChange={(v) => setDraft({ description: v })} rows={4} maxLength={300} />
                        <ImageField label="Foto principal" value={editing.draft.mainImage} onChange={(v) => setDraft({ mainImage: v })} folder="main" />
                        <GalleryEditor images={editing.draft.gallery} onChange={(v) => setDraft({ gallery: v })} />
                        <div className="rounded-md bg-mist/70 p-4">
                            <Switch
                                label="Mostrar primeiro no site"
                                description="O serviço em destaque já aparece aberto quando o cliente chega na seção."
                                checked={!!editing.draft.featured}
                                onChange={(v) => setDraft({ featured: v })}
                            />
                        </div>
                    </>
                )}
            </Drawer>

            <SaveBar dirty={section.dirty} saving={section.saving} onSave={section.save} onDiscard={section.discard} />
        </>
    );
}

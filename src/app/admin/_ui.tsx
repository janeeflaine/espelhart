'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
    type InputHTMLAttributes,
    type ReactNode,
    type TextareaHTMLAttributes,
} from 'react';
import {
    ArrowDown,
    ArrowUp,
    CheckCircle2,
    ExternalLink,
    ImagePlus,
    Loader2,
    Plus,
    RefreshCw,
    Trash2,
    X,
    AlertTriangle,
} from 'lucide-react';
import { uploadSiteImage } from '@/lib/imageUpload';

/* ============================== Layout ============================== */

export function PageHeader({
    title,
    description,
    siteAnchor,
    actions,
}: {
    title: string;
    description?: string;
    siteAnchor?: string;
    actions?: ReactNode;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
                <h1 className="font-wide text-2xl sm:text-[2rem] font-bold text-ink leading-tight">{title}</h1>
                {description && <p className="mt-2 text-[15px] text-muted max-w-2xl">{description}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
                {siteAnchor !== undefined && (
                    <a
                        href={`/${siteAnchor ? `#${siteAnchor}` : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm font-medium text-ink hover:border-ink/30"
                    >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Ver no site
                    </a>
                )}
                {actions}
            </div>
        </div>
    );
}

export function Panel({
    title,
    description,
    children,
    aside,
}: {
    title: string;
    description?: string;
    children: ReactNode;
    aside?: ReactNode;
}) {
    return (
        <section className="rounded-lg bg-paper border border-line/80 shadow-[0_1px_2px_rgba(12,35,41,0.04)]">
            <header className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6">
                <div>
                    <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
                    {description && <p className="mt-1 text-sm text-muted">{description}</p>}
                </div>
                {aside}
            </header>
            <div className="px-5 sm:px-7 pt-5 pb-6 sm:pb-7">{children}</div>
        </section>
    );
}

/* ============================== Fields ============================== */

const inputBase =
    'w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-muted/60 transition-colors focus:outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15';

export function Field({
    label,
    hint,
    children,
    htmlFor,
    counter,
}: {
    label: string;
    hint?: string;
    children: ReactNode;
    htmlFor?: string;
    counter?: string;
}) {
    return (
        <div>
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
                    {label}
                </label>
                {counter && <span className="text-xs text-muted tabular-nums">{counter}</span>}
            </div>
            {children}
            {hint && <p className="mt-1.5 text-[13px] text-muted">{hint}</p>}
        </div>
    );
}

export function TextInput({
    label,
    hint,
    value,
    onChange,
    maxLength,
    ...rest
}: { label: string; hint?: string; value: string; onChange: (v: string) => void } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>) {
    const id = useId();
    return (
        <Field label={label} hint={hint} htmlFor={id} counter={maxLength ? `${value.length}/${maxLength}` : undefined}>
            <input id={id} value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} className={inputBase} {...rest} />
        </Field>
    );
}

export function TextArea({
    label,
    hint,
    value,
    onChange,
    rows = 3,
    maxLength,
    ...rest
}: { label: string; hint?: string; value: string; onChange: (v: string) => void } & Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
>) {
    const id = useId();
    return (
        <Field label={label} hint={hint} htmlFor={id} counter={maxLength ? `${value.length}/${maxLength}` : undefined}>
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                maxLength={maxLength}
                className={`${inputBase} resize-y leading-relaxed`}
                {...rest}
            />
        </Field>
    );
}

export function Switch({
    checked,
    onChange,
    label,
    description,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    description?: string;
}) {
    const id = useId();
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <label htmlFor={id} className="text-sm font-medium text-ink cursor-pointer">
                    {label}
                </label>
                {description && <p className="text-[13px] text-muted mt-0.5">{description}</p>}
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${checked ? 'bg-teal' : 'bg-line'}`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-paper shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
                />
            </button>
        </div>
    );
}

/* ============================== Image ============================== */

export function ImageField({
    label,
    hint,
    value,
    onChange,
    folder,
    aspect = 'aspect-[4/3]',
}: {
    label: string;
    hint?: string;
    value: string;
    onChange: (url: string) => void;
    folder: string;
    aspect?: string;
}) {
    const input = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const toast = useToast();

    const pick = async (file?: File | null) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Escolha um arquivo de imagem (JPG, PNG ou WebP).');
            return;
        }
        setBusy(true);
        try {
            const url = await uploadSiteImage(file, folder);
            onChange(url);
            toast.success('Imagem enviada. Salve para publicar no site.');
        } catch (error) {
            console.error(error);
            toast.error('Não foi possível enviar a imagem. Verifique a conexão e tente de novo.');
        } finally {
            setBusy(false);
            if (input.current) input.current.value = '';
        }
    };

    return (
        <Field label={label} hint={hint ?? 'Fotos grandes são reduzidas automaticamente antes do envio.'}>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    pick(e.dataTransfer.files?.[0]);
                }}
                className={`group relative ${aspect} w-full overflow-hidden rounded-md border border-dashed border-ink/20 bg-mist`}
            >
                {value ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted">
                        <ImagePlus className="w-7 h-7" aria-hidden="true" />
                        <span className="mt-2 text-sm">Arraste uma foto ou clique para escolher</span>
                    </div>
                )}
                {busy && (
                    <div className="absolute inset-0 bg-ink/50 flex items-center justify-center text-white text-sm gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Enviando…
                    </div>
                )}
                <button
                    type="button"
                    onClick={() => input.current?.click()}
                    className="absolute inset-0"
                    aria-label={value ? `Trocar ${label.toLowerCase()}` : `Escolher ${label.toLowerCase()}`}
                    disabled={busy}
                />
                {value && !busy && (
                    <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-paper/95 px-3 py-1.5 text-xs font-semibold text-ink shadow opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                        <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" /> Trocar foto
                    </span>
                )}
                <input
                    ref={input}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => pick(e.target.files?.[0])}
                />
            </div>
        </Field>
    );
}

/* ============================== Lists ============================== */

export function ListEditor<T>({
    items,
    onChange,
    create,
    render,
    addLabel,
    max,
    min = 0,
    itemLabel,
}: {
    items: T[];
    onChange: (items: T[]) => void;
    create: () => T;
    render: (item: T, update: (next: T) => void, index: number) => ReactNode;
    addLabel: string;
    max?: number;
    min?: number;
    itemLabel: (index: number) => string;
}) {
    const move = (from: number, to: number) => {
        const next = [...items];
        const [it] = next.splice(from, 1);
        next.splice(to, 0, it);
        onChange(next);
    };
    return (
        <div className="space-y-3">
            {items.map((item, i) => (
                <div key={i} className="rounded-md border border-line bg-mist/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-muted">{itemLabel(i)}</span>
                        <div className="flex items-center gap-1">
                            <IconButton label="Mover para cima" disabled={i === 0} onClick={() => move(i, i - 1)}>
                                <ArrowUp className="w-4 h-4" />
                            </IconButton>
                            <IconButton label="Mover para baixo" disabled={i === items.length - 1} onClick={() => move(i, i + 1)}>
                                <ArrowDown className="w-4 h-4" />
                            </IconButton>
                            <IconButton
                                label="Remover"
                                tone="danger"
                                disabled={items.length <= min}
                                onClick={() => onChange(items.filter((_, j) => j !== i))}
                            >
                                <Trash2 className="w-4 h-4" />
                            </IconButton>
                        </div>
                    </div>
                    {render(item, (next) => onChange(items.map((it, j) => (j === i ? next : it))), i)}
                </div>
            ))}
            {(max === undefined || items.length < max) && (
                <button
                    type="button"
                    onClick={() => onChange([...items, create()])}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-dashed border-ink/25 py-3 text-sm font-semibold text-ink hover:border-teal hover:text-teal transition-colors"
                >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    {addLabel}
                </button>
            )}
        </div>
    );
}

export function StringListEditor({
    label,
    hint,
    items,
    onChange,
    addLabel,
    placeholder,
    max,
}: {
    label: string;
    hint?: string;
    items: string[];
    onChange: (items: string[]) => void;
    addLabel: string;
    placeholder?: string;
    max?: number;
}) {
    return (
        <Field label={label} hint={hint}>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <input
                            value={item}
                            onChange={(e) => onChange(items.map((it, j) => (j === i ? e.target.value : it)))}
                            placeholder={placeholder}
                            aria-label={`${label} ${i + 1}`}
                            className={inputBase}
                        />
                        <IconButton label="Mover para cima" disabled={i === 0} onClick={() => {
                            const next = [...items];
                            [next[i - 1], next[i]] = [next[i], next[i - 1]];
                            onChange(next);
                        }}>
                            <ArrowUp className="w-4 h-4" />
                        </IconButton>
                        <IconButton label="Remover" tone="danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>
                            <X className="w-4 h-4" />
                        </IconButton>
                    </div>
                ))}
                {(max === undefined || items.length < max) && (
                    <button
                        type="button"
                        onClick={() => onChange([...items, ''])}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-ink"
                    >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        {addLabel}
                    </button>
                )}
            </div>
        </Field>
    );
}

export function IconButton({
    label,
    onClick,
    children,
    disabled,
    tone = 'default',
}: {
    label: string;
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
    tone?: 'default' | 'danger';
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={`shrink-0 w-9 h-9 inline-flex items-center justify-center rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none ${
                tone === 'danger' ? 'text-muted hover:text-[#B42318] hover:bg-[#B42318]/10' : 'text-muted hover:text-ink hover:bg-ink/5'
            }`}
        >
            {children}
        </button>
    );
}

/* ============================== Buttons ============================== */

export function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled,
    loading,
    icon,
}: {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode;
}) {
    const styles = {
        primary: 'bg-ink text-white hover:bg-ink-2',
        secondary: 'bg-paper text-ink border border-line hover:border-ink/30',
        danger: 'bg-[#B42318] text-white hover:bg-[#912018]',
    }[variant];
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles}`}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : icon}
            {children}
        </button>
    );
}

/* ============================== Save bar ============================== */

export function SaveBar({
    dirty,
    saving,
    onSave,
    onDiscard,
}: {
    dirty: boolean;
    saving: boolean;
    onSave: () => void;
    onDiscard: () => void;
}) {
    return (
        <div
            aria-hidden={!dirty}
            className={`fixed z-40 bottom-4 left-1/2 lg:left-[calc(50%+8.5rem)] -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl transition-all duration-300 ${
                dirty ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
            }`}
        >
            <div className="flex items-center gap-3 rounded-lg bg-ink/95 backdrop-blur text-white pl-5 pr-2 py-2 shadow-[0_18px_40px_-12px_rgba(12,35,41,0.55)]">
                <span className="w-2 h-2 rounded-full bg-edge shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium flex-1 min-w-0">Alterações não salvas</p>
                <button
                    type="button"
                    onClick={onDiscard}
                    disabled={saving}
                    tabIndex={dirty ? 0 : -1}
                    className="px-3 py-2 text-sm font-medium text-white/75 hover:text-white rounded-md"
                >
                    Descartar
                </button>
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    tabIndex={dirty ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-md bg-edge px-4 py-2 text-sm font-semibold text-ink hover:bg-white disabled:opacity-60"
                >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                    {saving ? 'Salvando…' : 'Salvar e publicar'}
                </button>
            </div>
        </div>
    );
}

/** Shared flag so the sidebar can warn before leaving a page with unsaved edits. */
export const unsaved = { dirty: false };

/** Warns before closing the tab (or leaving via the sidebar) with unsaved changes. */
export function useUnsavedGuard(dirty: boolean) {
    useEffect(() => {
        unsaved.dirty = dirty;
        return () => {
            unsaved.dirty = false;
        };
    }, [dirty]);

    useEffect(() => {
        if (!dirty) return;
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [dirty]);
}

/* ============================== Feedback ============================== */

type Toast = { id: number; kind: 'success' | 'error'; text: string };
type ConfirmState = {
    title: string;
    description?: string;
    confirmLabel: string;
    resolve: (ok: boolean) => void;
} | null;

const FeedbackContext = createContext<{
    push: (kind: Toast['kind'], text: string) => void;
    confirm: (opts: { title: string; description?: string; confirmLabel?: string }) => Promise<boolean>;
} | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [dialog, setDialog] = useState<ConfirmState>(null);
    const confirmBtn = useRef<HTMLButtonElement>(null);

    const push = useCallback((kind: Toast['kind'], text: string) => {
        const id = Date.now() + Math.random();
        setToasts((t) => [...t, { id, kind, text }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500);
    }, []);

    const confirm = useCallback(
        (opts: { title: string; description?: string; confirmLabel?: string }) =>
            new Promise<boolean>((resolve) =>
                setDialog({ title: opts.title, description: opts.description, confirmLabel: opts.confirmLabel ?? 'Excluir', resolve }),
            ),
        [],
    );

    const close = (ok: boolean) => {
        dialog?.resolve(ok);
        setDialog(null);
    };

    useEffect(() => {
        if (!dialog) return;
        confirmBtn.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                dialog.resolve(false);
                setDialog(null);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [dialog]);

    return (
        <FeedbackContext.Provider value={{ push, confirm }}>
            {children}

            <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-[min(24rem,calc(100%-2rem))]" aria-live="polite">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        role={t.kind === 'error' ? 'alert' : 'status'}
                        className="flex items-start gap-3 rounded-lg bg-paper border border-line px-4 py-3 shadow-[0_12px_30px_-12px_rgba(12,35,41,0.35)] animate-[toast-in_.25s_ease-out]"
                    >
                        {t.kind === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-px" aria-hidden="true" />
                        ) : (
                            <AlertTriangle className="w-5 h-5 text-[#B42318] shrink-0 mt-px" aria-hidden="true" />
                        )}
                        <p className="text-sm text-ink flex-1">{t.text}</p>
                    </div>
                ))}
            </div>

            {dialog && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={() => close(false)} />
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="confirm-title"
                        className="relative w-full max-w-md rounded-lg bg-paper p-6 shadow-2xl"
                    >
                        <h2 id="confirm-title" className="text-lg font-semibold text-ink">
                            {dialog.title}
                        </h2>
                        {dialog.description && <p className="mt-2 text-sm text-muted leading-relaxed">{dialog.description}</p>}
                        <div className="mt-6 flex justify-end gap-2">
                            <Button variant="secondary" onClick={() => close(false)}>
                                Cancelar
                            </Button>
                            <button
                                ref={confirmBtn}
                                type="button"
                                onClick={() => close(true)}
                                className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold bg-[#B42318] text-white hover:bg-[#912018]"
                            >
                                {dialog.confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </FeedbackContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(FeedbackContext);
    return {
        success: (text: string) => ctx?.push('success', text),
        error: (text: string) => ctx?.push('error', text),
    };
}

export function useConfirm() {
    const ctx = useContext(FeedbackContext);
    return ctx?.confirm ?? (async () => window.confirm('Tem certeza?'));
}

/* ============================== Drawer ============================== */

export function Drawer({
    open,
    title,
    onClose,
    children,
    footer,
}: {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer: ReactNode;
}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <div className={`fixed inset-0 z-[120] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
            <div
                className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={`absolute inset-y-0 right-0 w-full max-w-xl bg-paper shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <header className="flex items-center justify-between gap-4 px-6 h-16 border-b border-line shrink-0">
                    <h2 className="text-lg font-semibold text-ink truncate">{title}</h2>
                    <IconButton label="Fechar" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </IconButton>
                </header>
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">{open && children}</div>
                <footer className="shrink-0 border-t border-line px-6 py-4 flex justify-end gap-2 bg-mist/60">{footer}</footer>
            </aside>
        </div>
    );
}

/* ============================== States ============================== */

export function LoadingState() {
    return (
        <div className="space-y-4" aria-busy="true" aria-label="Carregando">
            <div className="h-9 w-64 rounded-md bg-line/60 animate-pulse" />
            <div className="h-4 w-96 max-w-full rounded bg-line/50 animate-pulse" />
            <div className="mt-8 h-56 rounded-lg bg-line/40 animate-pulse" />
            <div className="h-40 rounded-lg bg-line/30 animate-pulse" />
        </div>
    );
}

export function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
    return (
        <div className="rounded-lg border border-dashed border-ink/20 bg-paper px-6 py-14 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-mist flex items-center justify-center text-teal">{icon}</div>
            <p className="mt-4 text-lg font-semibold text-ink">{title}</p>
            <p className="mt-1.5 text-sm text-muted max-w-sm mx-auto">{text}</p>
            {action && <div className="mt-6 flex justify-center">{action}</div>}
        </div>
    );
}

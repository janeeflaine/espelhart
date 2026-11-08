'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSettings, updateSettings } from '@/lib/firebaseAdmin';
import { mergeSettings, type SiteSettings } from '@/lib/siteSettings';
import { useToast, useUnsavedGuard } from './_ui';

/**
 * Loads `settings/general`, tracks edits to the given fields and saves only those
 * fields (merge), so two admin pages never overwrite each other's data.
 */
export function useSettingsEditor<K extends keyof SiteSettings>(fields: readonly K[]) {
    const toast = useToast();
    const [original, setOriginal] = useState<Pick<SiteSettings, K> | null>(null);
    const [values, setValues] = useState<Pick<SiteSettings, K> | null>(null);
    const [saving, setSaving] = useState(false);
    const fieldsKey = fields.join('|');

    const pick = useCallback(
        (s: SiteSettings) => Object.fromEntries(fields.map((f) => [f, structuredClone(s[f])])) as Pick<SiteSettings, K>,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [fieldsKey],
    );

    useEffect(() => {
        let active = true;
        getSettings()
            .then((data) => {
                if (!active) return;
                const merged = pick(mergeSettings(data));
                setOriginal(merged);
                setValues(structuredClone(merged));
            })
            .catch((error) => {
                console.error(error);
                const merged = pick(mergeSettings(null));
                setOriginal(merged);
                setValues(structuredClone(merged));
                toast.error('Não foi possível carregar os dados salvos. Mostrando os textos padrão.');
            });
        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pick]);

    const dirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(original), [values, original]);
    useUnsavedGuard(dirty);

    const set = useCallback(<F extends K>(field: F, value: SiteSettings[F]) => {
        setValues((v) => (v ? { ...v, [field]: value } : v));
    }, []);

    const save = useCallback(async () => {
        if (!values) return;
        setSaving(true);
        try {
            await updateSettings(values as Partial<SiteSettings>);
            setOriginal(structuredClone(values));
            toast.success('Alterações publicadas no site.');
        } catch (error) {
            console.error(error);
            toast.error('Não foi possível salvar. Verifique se você ainda está conectado e tente de novo.');
        } finally {
            setSaving(false);
        }
    }, [values, toast]);

    const discard = useCallback(() => {
        if (original) setValues(structuredClone(original));
    }, [original]);

    return { values, set, dirty, saving, save, discard, loading: values === null };
}

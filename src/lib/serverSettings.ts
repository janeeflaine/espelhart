// Server-side only: used from the root layout.
import { mergeSettings, type SiteSettings } from '@/lib/siteSettings';

type FirestoreValue = {
    stringValue?: string;
    integerValue?: string;
    doubleValue?: number;
    booleanValue?: boolean;
    nullValue?: null;
    arrayValue?: { values?: FirestoreValue[] };
    mapValue?: { fields?: Record<string, FirestoreValue> };
};

function decode(v: FirestoreValue): unknown {
    if ('stringValue' in v) return v.stringValue;
    if ('integerValue' in v) return Number(v.integerValue);
    if ('doubleValue' in v) return v.doubleValue;
    if ('booleanValue' in v) return v.booleanValue;
    if ('arrayValue' in v) return (v.arrayValue?.values ?? []).map(decode);
    if ('mapValue' in v) {
        return Object.fromEntries(Object.entries(v.mapValue?.fields ?? {}).map(([k, x]) => [k, decode(x)]));
    }
    return null;
}

/**
 * Reads `settings/general` on the server (public read via REST) so the first HTML
 * already carries the texts edited in the panel. Cached for 60 s; falls back to defaults.
 */
export async function getServerSettings(): Promise<SiteSettings> {
    const project = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!project) return mergeSettings(null);
    try {
        const res = await fetch(
            `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/settings/general`,
            { next: { revalidate: 60 } },
        );
        if (!res.ok) return mergeSettings(null);
        const json = (await res.json()) as { fields?: Record<string, FirestoreValue> };
        const data = Object.fromEntries(Object.entries(json.fields ?? {}).map(([k, v]) => [k, decode(v)]));
        return mergeSettings(data as Partial<SiteSettings>);
    } catch {
        return mergeSettings(null);
    }
}

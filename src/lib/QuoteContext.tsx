'use client';

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

interface QuoteContextValue {
    service: string | null;
    setService: (service: string | null) => void;
    /** Preselects a service and scrolls to the quote form. */
    requestQuote: (service?: string) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
    const [service, setService] = useState<string | null>(null);

    const requestQuote = useCallback((next?: string) => {
        if (next) setService(next);
        const form = document.getElementById('orcamento');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.href = '/#orcamento';
        }
    }, []);

    const value = useMemo(() => ({ service, setService, requestQuote }), [service, requestQuote]);

    return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

/** Works outside the provider too (legal pages): falls back to navigating home. */
export function useQuote(): QuoteContextValue {
    const ctx = useContext(QuoteContext);
    if (ctx) return ctx;
    return {
        service: null,
        setService: () => {},
        requestQuote: () => {
            window.location.href = '/#orcamento';
        },
    };
}

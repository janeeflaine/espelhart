import Link from 'next/link';

/** Wordmark with a glass-pane mark (two panes, one offset like a sliding window). */
export default function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
    const text = tone === 'dark' ? 'text-ink' : 'text-white';
    return (
        <Link href="/" className={`inline-flex items-center gap-2.5 ${text}`} aria-label="Espelhart, página inicial">
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                <rect x="2" y="3" width="15" height="24" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <rect x="11" y="3" width="15" height="24" rx="1.5" fill="#A9D3C8" fillOpacity="0.55" stroke="#237482" strokeWidth="2.2" />
            </svg>
            <span className="font-wide text-lg sm:text-xl font-bold tracking-[0.12em]">ESPELHART</span>
        </Link>
    );
}

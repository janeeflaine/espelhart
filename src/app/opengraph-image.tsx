import { ImageResponse } from 'next/og';

export const alt = 'Espelhart Vidros e Esquadrias';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 72,
                    background: '#0C2329',
                    color: '#FFFFFF',
                }}
            >
                <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>
                    ESPELHART
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
                        Vidros e esquadrias sob medida
                    </div>
                    <div style={{ fontSize: 32, marginTop: 24, color: '#8FD0DA' }}>
                        Box, guarda-corpo, esquadrias de alumínio e espelhos. Orçamento gratuito.
                    </div>
                </div>
                <div style={{ display: 'flex', height: 12, background: '#A9D3C8', borderRadius: 6 }} />
            </div>
        ),
        size,
    );
}

import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { SettingsProvider } from '@/lib/SettingsContext';
import { getServerSettings } from '@/lib/serverSettings';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://espelhart.com'),
  title: 'Espelhart | Vidraçaria de Alto Padrão — Vidros e Esquadrias em Valparaíso de Goiás e DF',
  description:
    'Espelhart: vidraçaria especializada em box para banheiro, esquadrias de alumínio, guarda-corpo de vidro e vidros temperados. Qualidade premium, instalação profissional e orçamento gratuito via WhatsApp em Valparaíso de Goiás, Entorno e Distrito Federal.',
  keywords: [
    'vidraçaria',
    'vidros e esquadrias',
    'box para banheiro',
    'guarda-corpo',
    'guarda-corpo de vidro',
    'esquadrias de alumínio',
    'vidros temperados',
    'espelhos decorativos',
    'vidraçaria em Valparaíso de Goiás',
    'vidraçaria no DF',
    'vidraçaria de alto padrão',
    'fechamento de sacada',
    'porta de vidro',
  ],
  authors: [{ name: 'Espelhart Vidros e Esquadrias' }],
  creator: 'Espelhart',
  publisher: 'Espelhart Vidros e Esquadrias',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://espelhart.com',
    siteName: 'Espelhart Vidros e Esquadrias',
    title: 'Espelhart | Vidraçaria de Alto Padrão — Vidros e Esquadrias',
    description:
      'Soluções completas em vidros e esquadrias de alto padrão. Box para banheiro, esquadrias de alumínio, guarda-corpo de vidro. Orçamento gratuito!',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espelhart | Vidraçaria de Alto Padrão',
    description:
      'Vidros e esquadrias premium em Valparaíso de Goiás e DF. Box para banheiro, guarda-corpo, esquadrias de alumínio. Solicite orçamento!',
  },
};

// JSON-LD Schema.org - LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Espelhart Vidros e Esquadrias',
  legalName: 'LUIZ FELIPE SOUZA 05403061185',
  taxID: '41.634.235/0001-12',
  image: 'https://espelhart.com/opengraph-image',
  '@id': 'https://espelhart.com',
  url: 'https://espelhart.com',
  telephone: '+55-61-99817-9760',
  description:
    'Vidraçaria de alto padrão especializada em box para banheiro, esquadrias de alumínio, guarda-corpo de vidro e vidros temperados em Valparaíso de Goiás e região.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua 9, Quadra 11, Lote G, Parque São Bernardo',
    addressLocality: 'Valparaíso de Goiás',
    postalCode: '72870-425',
    addressRegion: 'GO',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '12:00',
    },
  ],
  priceRange: '$$',
  sameAs: ['https://www.instagram.com/espelhartvidroseesquadrias/'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de Vidraçaria',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Box para Banheiro',
          description: 'Box de vidro temperado sob medida para banheiros.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Esquadrias de Alumínio',
          description: 'Esquadrias premium com vedação termoacústica superior.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Guarda-Corpo de Vidro',
          description: 'Guarda-corpo em vidro laminado ou temperado para sacadas e escadas.',
        },
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <head>
        <meta name="theme-color" content="#0C2329" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <SettingsProvider initial={await getServerSettings()}>
          <div className="relative min-h-screen flex flex-col overflow-x-hidden">
            {children}
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SettingsProvider } from '@/lib/SettingsContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://espelhart.com.br'),
  title: 'Espelhart | Vidraçaria de Alto Padrão — Vidros e Esquadrias em São Paulo',
  description:
    'Espelhart: vidraçaria especializada em box para banheiro, esquadrias de alumínio, guarda-corpo de vidro e vidros temperados. Qualidade premium, instalação profissional e orçamento gratuito via WhatsApp em São Paulo.',
  keywords: [
    'vidraçaria',
    'vidros e esquadrias',
    'box para banheiro',
    'guarda-corpo',
    'guarda-corpo de vidro',
    'esquadrias de alumínio',
    'vidros temperados',
    'espelhos decorativos',
    'vidraçaria em São Paulo',
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
    url: 'https://espelhart.com.br',
    siteName: 'Espelhart Vidros e Esquadrias',
    title: 'Espelhart | Vidraçaria de Alto Padrão — Vidros e Esquadrias',
    description:
      'Soluções completas em vidros e esquadrias de alto padrão. Box para banheiro, esquadrias de alumínio, guarda-corpo de vidro. Orçamento gratuito!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Espelhart Vidros e Esquadrias de Alto Padrão',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espelhart | Vidraçaria de Alto Padrão',
    description:
      'Vidros e esquadrias premium em São Paulo. Box para banheiro, guarda-corpo, esquadrias de alumínio. Solicite orçamento!',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://espelhart.com.br',
  },
  other: {
    'google-site-verification': 'YOUR_VERIFICATION_CODE',
  },
};

// JSON-LD Schema.org - LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Espelhart Vidros e Esquadrias',
  image: 'https://espelhart.com.br/og-image.jpg',
  '@id': 'https://espelhart.com.br',
  url: 'https://espelhart.com.br',
  telephone: '+55-00-0000-0000',
  description:
    'Vidraçaria de alto padrão especializada em box para banheiro, esquadrias de alumínio, guarda-corpo de vidro e vidros temperados em São Paulo.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Industrial, 1234',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '00000-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.5505,
    longitude: -46.6333,
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '187',
  },
  sameAs: [
    'https://www.instagram.com/espelhart',
    'https://www.facebook.com/espelhart',
  ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#011A23" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}

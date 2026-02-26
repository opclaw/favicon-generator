import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://favicon-generator.vercel.app'),
  alternates: {
    canonical: 'https://favicon-generator.vercel.app',
  },
  title: 'Favicon Generator — Create Favicons | Free Online Tool',
  description: 'Generate favicons from text or images. Create ICO, PNG favicons for your website.',
  keywords: ['favicon generator', 'favicon maker', 'create favicon', 'favicon creator'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://favicon-generator.vercel.app',
    siteName: 'Favicon Generator',
    title: 'Favicon Generator — Create Favicons',
    description: 'Generate favicons from text or images.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Favicon Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Favicon Generator',
    description: 'Generate favicons from text or images.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Favicon Generator',
              applicationCategory: 'GraphicsApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Text favicons, Image favicons, Multiple sizes, Download as ICO',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}

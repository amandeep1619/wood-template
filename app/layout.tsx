import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.tirath-wood-works.com";
const SITE_NAME = "Tirath Wood Works";
const OG_IMAGE = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop&q=90";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Master Carpentry & Custom Woodwork`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Premium custom furniture, kitchen cabinetry, and architectural woodwork handcrafted by master artisans. Quality craftsmanship you can see and feel.",
  keywords: [
    "custom furniture",
    "kitchen cabinets",
    "carpenter",
    "woodwork",
    "interior woodwork",
    "bespoke furniture",
    "master craftsman",
    "tirath wood works",
    "custom woodwork",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} | Master Carpentry & Custom Woodwork`,
    description:
      "Premium custom furniture, kitchen cabinetry, and architectural woodwork handcrafted by master artisans. Quality craftsmanship you can see and feel.",
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – Master Carpentry & Custom Woodwork`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Master Carpentry & Custom Woodwork`,
    description:
      "Premium custom furniture, kitchen cabinetry, and architectural woodwork handcrafted by master artisans.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_URL,
  name: SITE_NAME,
  description:
    "Master carpentry, custom furniture, and architectural woodwork — built to last generations.",
  url: SITE_URL,
  telephone: "+12125551234",
  email: "hello@tirath-wood-works.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "48 Craftsman Way",
    addressLocality: "White Plains",
    addressRegion: "NY",
    postalCode: "10601",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "41.0339",
    longitude: "-73.7629",
  },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-15:00"],
  priceRange: "$$$",
  image: OG_IMAGE,
  sameAs: [
    "https://instagram.com/tirathwoodworks",
    "https://linkedin.com/company/tirath-wood-works",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A TO Z Machines | Buy Industrial Machinery from Verified Manufacturers India",
  description:
    "India's #1 B2B industrial machinery platform. Find CNC machines, packaging machines, hydraulic systems & 50+ categories. Get quotes from 2,000+ verified manufacturers within 24 hours. Free RFQ.",
  keywords:
    "industrial machinery India, CNC machine manufacturers, packaging machine suppliers, B2B machinery marketplace, industrial equipment India, hydraulic systems manufacturers, lathe machine suppliers, RFQ industrial machinery",
  openGraph: {
    title: "A TO Z Machines | India's B2B Industrial Machinery Marketplace",
    description:
      "Connect with 2,000+ verified Indian manufacturers. Post your RFQ free and get multiple quotes within 24 hours.",
    type: "website",
    locale: "en_IN",
    siteName: "A TO Z Machines",
  },
  twitter: {
    card: "summary_large_image",
    title: "A TO Z Machines | Buy Industrial Machinery from Verified Manufacturers",
    description:
      "India's B2B marketplace for industrial machinery. 2,000+ verified vendors. Free RFQ. Quotes in 24 hrs.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://atozmachines.store" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://atozmachines.store/#organization",
      name: "A TO Z Machines",
      url: "https://atozmachines.store",
      description: "India's B2B industrial machinery marketplace connecting verified manufacturers with buyers across 50+ machine categories.",
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://atozmachines.store/#website",
      url: "https://atozmachines.store",
      name: "A TO Z Machines",
      publisher: { "@id": "https://atozmachines.store/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://atozmachines.store/categories?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

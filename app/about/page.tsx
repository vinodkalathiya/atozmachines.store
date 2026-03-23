import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "About A TO Z Machines — India's B2B Industrial Machinery Marketplace",
  description: "A TO Z Machines is India's trusted B2B marketplace connecting industrial machinery buyers with 2,000+ verified manufacturers. Learn about our mission, team, and values.",
  keywords: "about A TO Z Machines, India machinery marketplace, B2B industrial platform India, verified machinery suppliers",
  alternates: { canonical: "https://atozmachines.store/about" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About A TO Z Machines",
  url: "https://atozmachines.store/about",
  mainEntity: {
    "@type": "Organization",
    name: "A TO Z Machines",
    url: "https://atozmachines.store",
    foundingDate: "2025",
    description: "India's B2B industrial machinery marketplace connecting verified manufacturers with buyers across 50+ machine categories.",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
    areaServed: "IN",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10-50" },
  },
};

const STATS = [
  { value: "2,000+", label: "Verified Vendors" },
  { value: "50+", label: "Machine Categories" },
  { value: "17", label: "Industrial Cities" },
  { value: "24hr", label: "Quote Response" },
];

const VALUES = [
  { icon: "🔍", title: "Verified First", desc: "Every vendor is manually approved. We verify GST registration and business legitimacy before any listing goes live." },
  { icon: "⚡", title: "Speed Matters", desc: "Buyers receive structured quotes within 24 hours. No more waiting weeks for callbacks or chasing suppliers." },
  { icon: "🤝", title: "Structured RFQ", desc: "Our RFQ system lets buyers specify exactly what they need. Vendors respond with proper quotes — not just phone numbers." },
  { icon: "🌐", title: "India-First", desc: "Built specifically for India's industrial ecosystem — in Indian Rupees, with GST verification, and regional language support coming soon." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">About Us</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">India's Industrial Machinery Marketplace</h1>
            <p className="text-blue-200 text-base leading-relaxed max-w-2xl mx-auto">
              A TO Z Machines is building India's most trusted B2B platform for industrial machinery.
              We connect serious buyers with verified manufacturers — faster, transparently, and with real quotes.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

          {/* Stats */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-6">
                <p className="text-3xl font-bold text-blue-800 mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </section>

          {/* Mission */}
          <section className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sourcing industrial machinery in India has historically meant navigating unverified directories,
              endless phone calls, and opaque pricing. Buyers waste weeks getting quotes.
              Manufacturers struggle to reach serious buyers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              A TO Z Machines changes this. We built a structured RFQ engine that lets buyers post their exact
              requirement once — and receive multiple structured quotes from verified manufacturers within 24 hours.
              Every vendor on our platform is GST-verified and manually approved by our team.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We serve buyers across manufacturing, pharma, automotive, food processing, and 40+ other industries.
              Our goal: make sourcing industrial machinery as easy as booking a flight.
            </p>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Stand For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <span className="text-3xl block mb-3">{v.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who We Serve */}
          <section className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who We Serve</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">For Buyers</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Production managers sourcing new machinery</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Procurement teams comparing multiple suppliers</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Plant heads expanding capacity</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Entrepreneurs setting up new manufacturing units</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> International buyers importing Indian machinery</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">For Manufacturers</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Machine manufacturers wanting qualified leads</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Suppliers looking to expand their buyer base</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> Exporters targeting international markets</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">✓</span> SMB manufacturers competing with larger players</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Ready to get started?</h2>
            <p className="text-gray-500 mb-6">Post your requirement for free and receive quotes within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/post-rfq"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                Post RFQ — Free
              </Link>
              <Link href="/contact"
                className="border border-gray-300 hover:border-blue-800 text-gray-700 hover:text-blue-800 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

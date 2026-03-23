import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Contact A TO Z Machines — India's Industrial Machinery Marketplace",
  description: "Contact A TO Z Machines for vendor onboarding, buyer support, or partnership inquiries. We respond within 24 hours.",
  keywords: "contact A TO Z Machines, industrial machinery marketplace support, vendor onboarding India",
  alternates: { canonical: "https://atozmachines.store/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact A TO Z Machines",
  url: "https://atozmachines.store/contact",
  mainEntity: {
    "@type": "Organization",
    name: "A TO Z Machines",
    url: "https://atozmachines.store",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
        contactOption: "TollFree",
      },
    ],
  },
};

const CONTACT_OPTIONS = [
  {
    icon: "📋",
    title: "Post an RFQ",
    desc: "Need to source a machine? Post your requirement and receive quotes from verified manufacturers within 24 hours.",
    cta: "Post RFQ",
    href: "/post-rfq",
  },
  {
    icon: "🏭",
    title: "List Your Company",
    desc: "Are you a machine manufacturer or supplier? Get listed on India's fastest-growing B2B machinery platform.",
    cta: "Register as Vendor",
    href: "/vendor/register",
  },
  {
    icon: "🤝",
    title: "Partnership & Media",
    desc: "For trade association partnerships, media inquiries, or advertising opportunities on our platform.",
    cta: "Send Email",
    href: "mailto:partnerships@atozmachines.store",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-14 sm:py-18">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">Get In Touch</p>
            <h1 className="text-3xl font-bold mb-3">Contact A TO Z Machines</h1>
            <p className="text-blue-200">We respond to all inquiries within 24 hours on business days.</p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

          {/* Contact Options */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">How can we help?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {CONTACT_OPTIONS.map((opt) => (
                <div key={opt.title} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <span className="text-4xl block mb-3">{opt.icon}</span>
                  <h3 className="font-bold text-gray-900 mb-2">{opt.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{opt.desc}</p>
                  <Link href={opt.href}
                    className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                    {opt.cta}
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* General Contact */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">General Inquiries</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <p className="text-gray-500 text-sm">support@atozmachines.store</p>
                    <p className="text-xs text-gray-400">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Registered in</p>
                    <p className="text-gray-500 text-sm">India</p>
                    <p className="text-xs text-gray-400">Serving all of India and international buyers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Support Hours</p>
                    <p className="text-gray-500 text-sm">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Send a Message</h2>
              <p className="text-gray-500 text-sm mb-4">
                For general inquiries, email us at <strong>support@atozmachines.store</strong>.
                For buyer support, use the <Link href="/post-rfq" className="text-blue-700 hover:underline">Post RFQ</Link> form.
                For vendor registration, use the <Link href="/vendor/register" className="text-blue-700 hover:underline">Vendor Registration</Link> form.
              </p>
              <Link href="mailto:support@atozmachines.store"
                className="block text-center bg-blue-800 hover:bg-blue-900 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors">
                Email Us
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Common Questions</h2>
            <div className="space-y-3">
              {[
                { q: "How do I post an RFQ?", a: "Click 'Post RFQ' in the header or visit /post-rfq. Describe your machine requirement, quantity, and delivery location. Our system matches you with verified vendors who respond within 24 hours." },
                { q: "Is it free to post an RFQ?", a: "Yes — posting an RFQ is completely free for buyers. You receive structured quotes from multiple verified manufacturers at no cost." },
                { q: "How do I get my company listed?", a: "Register as a vendor at /vendor/register. Upload your GST certificate and company details. Our team reviews and approves your profile within 1–2 business days." },
                { q: "How are vendors verified?", a: "All vendors are manually reviewed by our team. We verify GST registration, check company legitimacy, and approve profiles before they go live. Verified vendors display a GST Verified badge." },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

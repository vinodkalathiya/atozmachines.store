import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/app/lib/data";
import { SEO_INDUSTRIES, getIndustryBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
  return SEO_INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustryBySlug(industry);
  if (!ind) return {};

  return {
    title: `Industrial Machinery for ${ind.name} Industry — Verified Suppliers India | A TO Z Machines`,
    description: `Find verified industrial machinery suppliers for the ${ind.name} sector in India. ${ind.description.slice(0, 120)}. Get free quotes from verified manufacturers.`,
    keywords: `${ind.name.toLowerCase()} machinery India, ${ind.name.toLowerCase()} equipment suppliers, industrial machines ${ind.name.toLowerCase()} sector India`,
    alternates: { canonical: `https://atozmachines.store/industry/${industry}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const ind = getIndustryBySlug(industry);
  if (!ind) notFound();

  const relevantCategories = CATEGORIES.filter((c) => ind.machineCategories.includes(c.slug));
  const otherIndustries = SEO_INDUSTRIES.filter((i) => i.slug !== industry);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Industrial Machinery for ${ind.name} Industry`,
    description: ind.description,
    url: `https://atozmachines.store/industry/${industry}`,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <span>Industries</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{ind.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-14 sm:py-18">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">Industrial Solutions · {ind.name}</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{ind.icon}</span>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Machinery for {ind.name} Industry
                </h1>
              </div>
              <p className="text-blue-200 text-sm mb-6 leading-relaxed">{ind.description}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {ind.topStates.map((s) => (
                  <span key={s} className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-lg">📍 {s}</span>
                ))}
              </div>
              <Link href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm">
                Get Quotes for {ind.name} Machinery
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

          {/* Machine Categories */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Key Machinery for {ind.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relevantCategories.map((cat) => (
                <Link key={cat.slug} href={`/industry/${industry}/${cat.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group">
                  <span className="text-3xl block mb-3">{cat.icon}</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">Verified manufacturers across India</p>
                  <span className="text-xs text-blue-700 font-semibold">View suppliers →</span>
                </Link>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenges */}
            <section className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Industry Challenges</h2>
              <ul className="space-y-3">
                {ind.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-500 font-bold mt-0.5">⚠</span>{c}
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">How the Right Machinery Helps</h2>
              <ul className="space-y-3">
                {ind.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>{b}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Top States */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Top Manufacturing States for {ind.name}</h2>
            <div className="flex flex-wrap gap-3">
              {ind.topStates.map((s) => {
                const stateSlug = s.toLowerCase().replace(/\s/g, "-");
                return (
                  <Link key={s} href={`/suppliers/state/${stateSlug}`}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md hover:border-blue-300 transition-all text-sm font-medium text-gray-800">
                    📍 {s}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Other Industries */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Other Industries</h2>
            <div className="flex flex-wrap gap-2">
              {otherIndustries.map((i) => (
                <Link key={i.slug} href={`/industry/${i.slug}`}
                  className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">
                  {i.icon} {i.name}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Need {ind.name} machinery?</h3>
              <p className="text-gray-500 text-sm mt-0.5">Post your requirement and get quotes from verified manufacturers within 24 hours.</p>
            </div>
            <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm">
              Post RFQ — Free
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

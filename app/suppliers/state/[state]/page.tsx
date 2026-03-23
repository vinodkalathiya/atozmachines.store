import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS } from "@/app/lib/data";
import { SEO_STATES, SEO_CITIES, getStateBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props { params: Promise<{ state: string }> }

export async function generateStaticParams() {
  return SEO_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return {};
  return {
    title: `Industrial Machine Suppliers in ${s.name} — Verified Manufacturers | A TO Z Machines`,
    description: `Find verified industrial machinery manufacturers & suppliers in ${s.name}. ${s.vendorCount}+ verified vendors across ${s.industrialCities.join(", ")}. Free RFQ, quotes in 24 hours.`,
    keywords: `machinery suppliers ${s.name}, industrial machine manufacturers ${s.name}, machinery ${s.name} India, ${s.industrialCities[0]} machine suppliers`,
    alternates: { canonical: `https://atozmachines.store/suppliers/state/${state}` },
  };
}

export default async function StateSupplierPage({ params }: Props) {
  const { state } = await params;
  const stateData = getStateBySlug(state);
  if (!stateData) notFound();

  const vendors = SEED_VENDORS.filter((v) => v.isApproved && v.state.toLowerCase().replace(/\s/g, "-") === state);
  const allVendors = vendors.length > 0 ? vendors : SEED_VENDORS.filter((v) => v.isApproved);
  const citiesInState = SEO_CITIES.filter((c) => c.state === stateData.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Industrial Machine Suppliers in ${stateData.name}`,
    description: `Verified machinery manufacturers in ${stateData.name}, India`,
    url: `https://atozmachines.store/suppliers/state/${state}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://atozmachines.store" },
        { "@type": "ListItem", position: 2, name: "Suppliers by State", item: "https://atozmachines.store/suppliers" },
        { "@type": "ListItem", position: 3, name: stateData.name },
      ],
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-blue-700">Home</Link><span>/</span>
              <span>Suppliers</span><span>/</span>
              <span className="text-gray-900 font-medium">{stateData.name}</span>
            </nav>
          </div>
        </div>

        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">Industrial Hub · {stateData.name}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">Industrial Machine Suppliers in {stateData.name}</h1>
              <p className="text-blue-200 text-sm mb-4">{stateData.name} is known for <strong className="text-white">{stateData.knownFor}</strong>. Major industrial cities: {stateData.industrialCities.join(", ")}.</p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2"><span className="font-bold">{stateData.vendorCount}+</span><span className="text-blue-200 ml-1">Verified Vendors</span></div>
                <div className="bg-white/10 rounded-lg px-4 py-2"><span className="font-bold">{stateData.industrialCities.length}</span><span className="text-blue-200 ml-1">Industrial Cities</span></div>
                <div className="bg-white/10 rounded-lg px-4 py-2"><span className="font-bold">24hr</span><span className="text-blue-200 ml-1">Quote Response</span></div>
              </div>
              <Link href="/post-rfq" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm">Get Quotes from {stateData.name} Manufacturers</Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Machine Categories */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Browse by Machine Category — {stateData.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/suppliers/state/${state}/${cat.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all text-center group">
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-700">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.count}+ vendors</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Cities in State */}
          {citiesInState.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Industrial Cities in {stateData.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {citiesInState.map((city) => (
                  <Link key={city.slug} href={`/suppliers/${city.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all">
                    <p className="font-semibold text-gray-900 text-sm">📍 {city.name}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{city.knownFor}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Vendors */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Verified Suppliers in {stateData.name}</h2>
            <div className="space-y-4">
              {allVendors.map((v) => (
                <Link key={v.id} href={`/vendors/${v.id}`}
                  className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>{v.initial}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-gray-900 text-sm">{v.companyName}</h3>
                        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">✓ GST Verified</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5 mb-2">📍 {v.city}, {v.state} · Est. {v.establishedYear}</p>
                      <p className="text-gray-600 text-xs line-clamp-2">{v.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {v.categories.map((c) => { const catObj = CATEGORIES.find((x) => x.slug === c); return catObj ? <span key={c} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{catObj.name}</span> : null; })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Other States */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Other Industrial States</h2>
            <div className="flex flex-wrap gap-2">
              {SEO_STATES.filter((s) => s.slug !== state).map((s) => (
                <Link key={s.slug} href={`/suppliers/state/${s.slug}`} className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">{s.name}</Link>
              ))}
            </div>
          </section>

          <section className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Need a machine from {stateData.name}?</h3>
              <p className="text-gray-500 text-sm mt-0.5">Post your requirement and get quotes from {stateData.vendorCount}+ verified {stateData.name} manufacturers within 24 hours.</p>
            </div>
            <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm">Post RFQ — Free</Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

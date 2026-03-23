import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS } from "@/app/lib/data";
import { SEO_CITIES, getCityBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return SEO_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) return {};
  return {
    title: `Industrial Machine Suppliers in ${cityData.name} — Verified Manufacturers | A TO Z Machines`,
    description: `Find verified industrial machinery suppliers and manufacturers in ${cityData.name}, ${cityData.state}. Browse all machine categories, get free quotes from local vendors within 24 hours.`,
    keywords: `machinery suppliers ${cityData.name}, industrial machine manufacturers ${cityData.name}, ${cityData.name} machinery, machine suppliers ${cityData.state}`,
    alternates: { canonical: `https://atozmachines.store/suppliers/${city}` },
    openGraph: {
      title: `Machinery Suppliers in ${cityData.name} | A TO Z Machines`,
      description: `Verified industrial machinery manufacturers in ${cityData.name}, ${cityData.state}. Free RFQ.`,
      type: "website",
    },
  };
}

export default async function SupplierCityPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) notFound();

  // Show vendors from this city, or fallback to all approved vendors
  const cityVendors = SEED_VENDORS.filter(
    (v) => v.isApproved && v.city.toLowerCase() === cityData.name.toLowerCase()
  );
  const vendors = cityVendors.length > 0 ? cityVendors : SEED_VENDORS.filter((v) => v.isApproved);

  const nearbyCity = SEO_CITIES.find(
    (c) => c.slug !== city && c.state === cityData.state
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Industrial Machine Suppliers in ${cityData.name}`,
    description: `Verified machinery manufacturers in ${cityData.name}, ${cityData.state}, India`,
    url: `https://atozmachines.store/suppliers/${city}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://atozmachines.store" },
        { "@type": "ListItem", position: 2, name: "Suppliers", item: "https://atozmachines.store/suppliers" },
        { "@type": "ListItem", position: 3, name: cityData.name, item: `https://atozmachines.store/suppliers/${city}` },
      ],
    },
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
              <span>Suppliers</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cityData.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-3">Industrial Machinery Hub</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                Industrial Machine Suppliers in {cityData.name}, {cityData.state}
              </h1>
              <p className="text-blue-200 text-sm sm:text-base mb-4 leading-relaxed">
                {cityData.name} is known for <strong className="text-white">{cityData.knownFor}</strong>.
                Find verified manufacturers and get free quotes within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{vendors.length}+</span>
                  <span className="text-blue-200 ml-1">Verified Vendors</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">12+</span>
                  <span className="text-blue-200 ml-1">Machine Categories</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">24hr</span>
                  <span className="text-blue-200 ml-1">Quote Response</span>
                </div>
              </div>
              <Link
                href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm"
              >
                Get Quotes from {cityData.name} Manufacturers
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* Machine Categories in this City */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Browse by Machine Category — {cityData.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/suppliers/${city}/${cat.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all text-center group"
                >
                  <span className="text-2xl block mb-2">{cat.icon}</span>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-700 leading-tight">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{cat.count}+ vendors</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Vendors in this City */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Verified Suppliers in {cityData.name}</h2>
            <div className="space-y-4">
              {vendors.map((v) => (
                <Link
                  key={v.id}
                  href={`/vendors/${v.id}`}
                  className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {v.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-gray-900 text-sm">{v.companyName}</h3>
                        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">✓ GST Verified</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5 mb-2">📍 {v.city}, {v.state} · Est. {v.establishedYear}</p>
                      <p className="text-gray-600 text-xs line-clamp-2">{v.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {v.categories.map((c) => {
                          const catObj = CATEGORIES.find((x) => x.slug === c);
                          return catObj ? (
                            <span key={c} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{catObj.name}</span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Nearby Cities */}
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Other Machinery Hubs Nearby</h2>
            <div className="flex flex-wrap gap-2">
              {SEO_CITIES.filter((c) => c.slug !== city).slice(0, 8).map((c) => (
                <Link key={c.slug} href={`/suppliers/${c.slug}`}
                  className="text-sm text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">
                  {c.name}, {c.state}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Need a machine from {cityData.name}?</h3>
              <p className="text-gray-500 text-sm mt-0.5">Post your requirement and get quotes from verified {cityData.name} manufacturers within 24 hours.</p>
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

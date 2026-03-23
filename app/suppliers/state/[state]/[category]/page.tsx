import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, SEED_VENDORS, SEED_LISTINGS } from "@/app/lib/data";
import { SEO_STATES, SEO_CITIES, CATEGORY_SEO, getStateBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ state: string; category: string }>;
}

export async function generateStaticParams() {
  return SEO_STATES.flatMap((s) =>
    CATEGORIES.map((cat) => ({ state: s.slug, category: cat.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, category } = await params;
  const stateData = getStateBySlug(state);
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!stateData || !cat) return {};

  return {
    title: `${cat.name} Manufacturers in ${stateData.name} — Verified Suppliers | A TO Z Machines`,
    description: `Find verified ${cat.name} manufacturers & suppliers across ${stateData.name}. ${stateData.vendorCount}+ vendors in ${stateData.industrialCities.join(", ")}. Get free quotes within 24 hours. GST verified.`,
    keywords: `${cat.name} manufacturers ${stateData.name}, ${cat.name} suppliers ${stateData.name}, ${cat.name} ${stateData.industrialCities[0]}, buy ${cat.name} ${stateData.name} India`,
    alternates: { canonical: `https://atozmachines.store/suppliers/state/${state}/${category}` },
    openGraph: {
      title: `${cat.name} Manufacturers in ${stateData.name} | A TO Z Machines`,
      description: `Verified ${cat.name} suppliers across ${stateData.name}. Get free quotes in 24 hours.`,
      type: "website",
    },
  };
}

const STATE_FAQS = (stateName: string, catName: string, cities: string[]) => [
  {
    q: `Which cities in ${stateName} have the most ${catName} manufacturers?`,
    a: `${cities.slice(0, 3).join(", ")} are the top industrial cities in ${stateName} for ${catName} manufacturing. ${cities[0]} in particular has a well-established cluster of verified manufacturers listed on A TO Z Machines.`,
  },
  {
    q: `How do I verify ${catName} suppliers in ${stateName}?`,
    a: `All vendors on A TO Z Machines are GST-verified and manually approved before listing. You can view each supplier's GST number, company profile, certifications, and machine listings. For large orders, we recommend requesting samples or arranging a factory visit.`,
  },
  {
    q: `What is the price range for ${catName} from ${stateName} manufacturers?`,
    a: `Prices vary by machine specifications and customization requirements. ${stateName} manufacturers are competitive due to low labor costs and established supply chains. Post an RFQ with your specifications to receive multiple quotes and compare pricing directly.`,
  },
  {
    q: `Can ${stateName} ${catName} manufacturers export internationally?`,
    a: `Yes. Many manufacturers in ${stateName} are export-ready with ISO certifications and experience shipping to UAE, USA, UK, and other markets. A TO Z Machines can connect you with export-capable vendors. Mention your destination in the RFQ notes.`,
  },
];

export default async function StateSupplierCategoryPage({ params }: Props) {
  const { state, category } = await params;
  const stateData = getStateBySlug(state);
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!stateData || !cat) notFound();

  const seoData = CATEGORY_SEO[category];
  const citiesInState = SEO_CITIES.filter((c) => c.state === stateData.name);

  // Filter vendors: state match + category; fallback to category; then all approved
  const stateVendors = SEED_VENDORS.filter(
    (v) => v.isApproved && v.categories.includes(category) &&
      v.state.toLowerCase().replace(/\s/g, "-") === state
  );
  const categoryVendors = SEED_VENDORS.filter(
    (v) => v.isApproved && v.categories.includes(category)
  );
  const vendors = stateVendors.length > 0
    ? stateVendors
    : categoryVendors.length > 0
    ? categoryVendors
    : SEED_VENDORS.filter((v) => v.isApproved);

  const listings = SEED_LISTINGS.filter((l) => l.categorySlug === category && l.isApproved);
  const relatedCategories = CATEGORIES.filter((c) => c.slug !== category).slice(0, 4);
  const otherStates = SEO_STATES.filter((s) => s.slug !== state).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.name} Manufacturers in ${stateData.name}`,
    description: `Verified ${cat.name} manufacturers and suppliers across ${stateData.name}, India`,
    url: `https://atozmachines.store/suppliers/state/${state}/${category}`,
    numberOfItems: vendors.length,
    itemListElement: vendors.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: v.companyName,
        address: {
          "@type": "PostalAddress",
          addressLocality: v.city,
          addressRegion: v.state,
          addressCountry: "IN",
        },
      },
    })),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://atozmachines.store" },
        { "@type": "ListItem", position: 2, name: "Suppliers", item: "https://atozmachines.store/suppliers" },
        { "@type": "ListItem", position: 3, name: stateData.name, item: `https://atozmachines.store/suppliers/state/${state}` },
        { "@type": "ListItem", position: 4, name: cat.name, item: `https://atozmachines.store/suppliers/state/${state}/${category}` },
      ],
    },
  };

  const faqs = STATE_FAQS(stateData.name, cat.name, stateData.industrialCities);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-blue-700">Home</Link>
              <span>/</span>
              <Link href={`/suppliers/state/${state}`} className="hover:text-blue-700">Suppliers in {stateData.name}</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{cat.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0f2460] to-[#1e40af] text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">{cat.icon}</span>
                <p className="text-blue-300 text-xs font-bold tracking-widest uppercase">{stateData.name} · Industrial Hub</p>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                {cat.name} Manufacturers in {stateData.name}
              </h1>
              <p className="text-blue-200 text-sm sm:text-base mb-4 leading-relaxed">
                {stateData.name} is home to {stateData.vendorCount}+ verified industrial manufacturers.
                Find {cat.name} suppliers across {stateData.industrialCities.slice(0, 3).join(", ")} and other industrial cities.
                All vendors are GST-verified and manually approved.
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{stateData.vendorCount}+</span>
                  <span className="text-blue-200 ml-1">State Vendors</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">{stateData.industrialCities.length}</span>
                  <span className="text-blue-200 ml-1">Industrial Cities</span>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <span className="font-bold text-white">24hr</span>
                  <span className="text-blue-200 ml-1">Response Time</span>
                </div>
                {seoData && (
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="font-bold text-white">{seoData.priceRange}</span>
                    <span className="text-blue-200 ml-1">Price Range</span>
                  </div>
                )}
              </div>
              <Link
                href="/post-rfq"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm"
              >
                Get Quotes from {stateData.name} {cat.name} Manufacturers
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main */}
            <div className="lg:col-span-2 space-y-8">

              {/* Cities in State with Category */}
              {citiesInState.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    {cat.name} Manufacturers by City — {stateData.name}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {citiesInState.map((city) => (
                      <Link key={city.slug} href={`/suppliers/${city.slug}/${category}`}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all">
                        <p className="font-semibold text-gray-900 text-sm">📍 {city.name}</p>
                        <p className="text-xs text-blue-700 mt-1">{cat.name} Suppliers →</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Vendor List */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Verified {cat.name} Manufacturers — {stateData.name}
                </h2>
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

              {/* Machine Listings */}
              {listings.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{cat.name} — Active Listings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listings.map((l) => (
                      <Link key={l.id} href={`/machines/${l.id}`}
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all block">
                        <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{l.categoryName}</span>
                        <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1">{l.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{l.description}</p>
                        <p className="text-xs text-gray-400">📍 {l.vendorCity}</p>
                        {l.priceMin && (
                          <p className="text-blue-800 font-bold text-sm mt-1">
                            ₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Buyer Checklist */}
              {seoData?.buyGuide && (
                <section className="bg-blue-50 rounded-2xl p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-3">Before Buying {cat.name} from {stateData.name}</h2>
                  <ul className="space-y-2">
                    {seoData.buyGuide.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 font-bold mt-0.5">✓</span>{tip}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4">{cat.name} Manufacturers in {stateData.name} — FAQs</h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.q}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Price */}
              {seoData && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{cat.name} Price Range</h3>
                  <p className="text-2xl font-bold text-blue-800 mb-3">{seoData.priceRange}</p>
                  <div className="space-y-2">
                    {seoData.priceTable.slice(0, 4).map((row) => (
                      <div key={row.spec} className="flex justify-between text-xs border-b border-gray-100 pb-1.5">
                        <span className="text-gray-600">{row.spec}</span>
                        <span className="font-semibold text-gray-900">{row.priceRange}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/price-guide/${category}`} className="text-xs text-blue-700 hover:underline mt-3 block">
                    Full price guide →
                  </Link>
                </div>
              )}

              {/* Other Categories in State */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Other Machines in {stateData.name}</h3>
                <div className="space-y-1.5">
                  {relatedCategories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/suppliers/state/${state}/${c.slug}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50"
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </Link>
                  ))}
                </div>
                <Link href={`/suppliers/state/${state}`} className="text-xs text-blue-700 hover:underline mt-2 block">
                  All categories in {stateData.name} →
                </Link>
              </div>

              {/* Same Category in Other States */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">{cat.name} in Other States</h3>
                <div className="space-y-1.5">
                  {otherStates.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/suppliers/state/${s.slug}/${category}`}
                      className="flex items-center justify-between text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50"
                    >
                      <span>🏭 {s.name}</span>
                      <span className="text-blue-600">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Get {stateData.name} {cat.name} Quotes</p>
                <p className="text-gray-500 text-xs mb-3">Post your requirement — free. Quotes in 24 hours from verified {stateData.name} manufacturers.</p>
                <Link href="/post-rfq" className="block bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                  Post RFQ — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

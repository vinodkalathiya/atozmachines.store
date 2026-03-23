"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getVendorById, getListingsByVendor } from "@/app/lib/store";
import { VendorProfile, MachineListing, CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function VendorProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [listings, setListings] = useState<MachineListing[]>([]);

  useEffect(() => {
    if (id) {
      const v = getVendorById(id);
      setVendor(v);
      if (v) setListings(getListingsByVendor(v.id).filter((l) => l.isApproved && l.isActive));
    }
  }, [id]);

  if (!vendor) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Vendor not found</p>
          <Link href="/vendors" className="text-blue-800 hover:underline text-sm mt-2 block">← Browse Vendors</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: vendor.companyName,
    description: vendor.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: vendor.city,
      addressRegion: vendor.state,
      addressCountry: "IN",
    },
    telephone: vendor.phone,
    url: vendor.website ? `https://${vendor.website}` : "https://atozmachines.store",
    foundingDate: vendor.establishedYear?.toString(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${vendor.companyName} Machine Listings`,
      numberOfItems: listings.length,
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/vendors" className="text-sm text-blue-800 hover:underline mb-5 block">← All Vendors</Link>

          {/* Vendor Header */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className={`${vendor.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0`}>
                {vendor.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-gray-900">{vendor.companyName}</h1>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">✓ Verified</span>
                </div>
                <p className="text-gray-500 text-sm mb-3">📍 {vendor.city}, {vendor.state}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{vendor.description}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 mb-4">
                  {vendor.establishedYear && <span>Est. {vendor.establishedYear}</span>}
                  {vendor.phone && <span>📞 {vendor.phone}</span>}
                  {vendor.gstNumber && <span>GST: {vendor.gstNumber}</span>}
                  {vendor.website && <span>🌐 {vendor.website}</span>}
                </div>
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {vendor.categories.map((slug) => {
                    const c = CATEGORIES.find((x) => x.slug === slug);
                    return c ? (
                      <span key={slug} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {c.icon} {c.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/post-rfq"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm text-center transition-colors whitespace-nowrap">
                  Send Inquiry
                </Link>
              </div>
            </div>
          </div>

          {/* Listings */}
          <h2 className="font-bold text-gray-900 mb-4">Machine Listings ({listings.length})</h2>
          {listings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 text-center py-10">
              <p className="text-gray-400 text-sm">No listings yet from this vendor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((l) => (
                <Link key={l.id} href={`/machines/${l.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all block">
                  <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{l.categoryName}</span>
                  <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1 leading-snug">{l.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{l.description}</p>
                  {l.leadTimeDays && <p className="text-xs text-gray-400 mb-2">⏱ Lead Time: {l.leadTimeDays} days</p>}
                  {l.priceMin && (
                    <p className="text-blue-800 font-bold text-sm">
                      ₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

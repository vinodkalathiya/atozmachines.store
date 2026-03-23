"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getListingById, getVendorById } from "@/app/lib/store";
import { MachineListing, VendorProfile } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function MachineDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [listing, setListing] = useState<MachineListing | null>(null);
  const [vendor, setVendor] = useState<VendorProfile | null>(null);

  useEffect(() => {
    if (id) {
      const l = getListingById(id);
      setListing(l);
      if (l) setVendor(getVendorById(l.vendorId));
    }
  }, [id]);

  if (!listing) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Machine listing not found</p>
          <Link href="/categories" className="text-blue-800 hover:underline text-sm mt-2 block">← Browse Categories</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    category: listing.categoryName,
    offers: listing.priceMin
      ? {
          "@type": "AggregateOffer",
          lowPrice: listing.priceMin,
          highPrice: listing.priceMax,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: listing.vendorName,
          },
        }
      : undefined,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/category/${listing.categorySlug}`} className="text-sm text-blue-800 hover:underline mb-5 block">
            ← Back to {listing.categoryName}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{listing.categoryName}</span>
                  <span className="text-green-600 text-xs font-semibold">✓ Verified Vendor</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{listing.title}</h1>

                {/* Machine Image Placeholder */}
                <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl h-48 flex items-center justify-center mb-5 border border-gray-200">
                  <div className="text-center">
                    <span className="text-5xl block mb-2">🏭</span>
                    <p className="text-gray-400 text-xs">Machine image</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">{listing.description}</p>

                {/* Price & Lead Time */}
                <div className="flex flex-wrap gap-4">
                  {listing.priceMin && (
                    <div className="bg-blue-50 rounded-xl px-4 py-3">
                      <p className="text-xs text-blue-600 font-medium mb-0.5">Price Range</p>
                      <p className="text-blue-800 font-bold text-lg">₹{listing.priceMin.toLocaleString()} – ₹{listing.priceMax?.toLocaleString()}</p>
                    </div>
                  )}
                  {listing.leadTimeDays && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Lead Time</p>
                      <p className="text-gray-800 font-bold text-lg">{listing.leadTimeDays} Days</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specs */}
              {Object.keys(listing.specs).length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h2 className="font-bold text-gray-900 mb-4">Technical Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(listing.specs).map(([key, val]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 font-medium">{key}</p>
                        <p className="text-gray-900 font-semibold text-sm mt-0.5">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Vendor Card */}
              {vendor && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Sold By</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${vendor.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {vendor.initial}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{vendor.companyName}</p>
                      <p className="text-gray-400 text-xs">📍 {vendor.city}, {vendor.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mb-4">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Verified Manufacturer
                  </div>
                  {vendor.establishedYear && (
                    <p className="text-xs text-gray-400 mb-1">Est. {vendor.establishedYear}</p>
                  )}
                  {vendor.phone && (
                    <p className="text-xs text-gray-400 mb-3">📞 {vendor.phone}</p>
                  )}
                  <Link href={`/vendors/${vendor.id}`}
                    className="block text-center border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold py-2 rounded-lg text-sm transition-colors">
                    View Profile
                  </Link>
                </div>
              )}

              {/* Inquiry CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Interested in this machine?</h3>
                <p className="text-gray-500 text-xs mb-4">Post an RFQ to get a custom quote from this vendor and others.</p>
                <Link href="/post-rfq"
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors mb-2">
                  Request a Quote
                </Link>
                <Link href={`/post-rfq?category=${listing.categorySlug}`}
                  className="block text-center text-blue-800 text-xs font-semibold hover:underline">
                  Get quotes from multiple vendors →
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getListingsByCategory } from "@/app/lib/store";
import { MachineListing, CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [listings, setListings] = useState<MachineListing[]>([]);
  const category = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    if (slug) setListings(getListingsByCategory(slug));
  }, [slug]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/categories" className="text-sm text-blue-800 hover:underline">← All Categories</Link>
            <div className="flex items-center gap-3 mt-3">
              {category && <span className="text-4xl">{category.icon}</span>}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{category?.name || slug}</h1>
                <p className="text-gray-500 text-sm">{listings.length} listings from verified manufacturers</p>
              </div>
            </div>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 mb-4">No listings in this category yet</p>
              <Link href="/post-rfq" className="bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
                Post an RFQ to Get Quotes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((l) => (
                <Link key={l.id} href={`/machines/${l.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all block">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{l.categoryName}</span>
                    <span className="text-xs text-green-600 font-semibold">✓ Verified</span>
                  </div>
                  <h2 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{l.title}</h2>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{l.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>🏭 {l.vendorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>📍 {l.vendorCity}</span>
                    {l.leadTimeDays && <span>• ⏱ {l.leadTimeDays} days</span>}
                  </div>
                  {l.priceMin && (
                    <p className="text-blue-800 font-bold text-sm">
                      ₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* RFQ CTA */}
          <div className="mt-10 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Need a specific {category?.name || "machine"}?</h3>
              <p className="text-gray-500 text-sm mt-0.5">Post your exact requirement and get quotes from verified manufacturers.</p>
            </div>
            <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap text-sm">
              Post RFQ — Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

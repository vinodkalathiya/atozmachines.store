"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApprovedListings } from "@/app/lib/store";
import { MachineListing } from "@/app/lib/data";

function formatPrice(n?: number) {
  if (!n) return null;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString()}`;
}

export default function FeaturedListings() {
  const [listings, setListings] = useState<MachineListing[]>([]);

  useEffect(() => {
    setListings(getApprovedListings().slice(0, 6));
  }, []);

  if (listings.length === 0) return null;

  return (
    <section className="bg-gray-50 py-14 sm:py-16" aria-labelledby="listings-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Machine Catalog</p>
            <h2 id="listings-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Machine Listings
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Latest machines from verified Indian manufacturers — ready to quote.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-blue-800 font-semibold text-sm hover:underline whitespace-nowrap"
          >
            Browse All Listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l) => (
            <Link
              key={l.id}
              href={`/machines/${l.id}`}
              className="card-hover bg-white rounded-2xl border border-gray-200 overflow-hidden block hover:border-blue-300 group"
              title={l.title}
            >
              {/* Image placeholder */}
              <div className="bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 h-40 flex items-center justify-center border-b border-gray-100 relative">
                <span className="text-5xl opacity-60" role="img" aria-label={l.categoryName}>🏭</span>
                <div className="absolute top-3 left-3">
                  <span className="bg-white text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                    {l.categoryName}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200">
                    ✓ Verified
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-blue-800 transition-colors line-clamp-2">
                  {l.title}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">{l.description}</p>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                  <span>🏭</span>
                  <span className="truncate">{l.vendorName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <span>📍</span>
                  <span>{l.vendorCity}</span>
                  {l.leadTimeDays && (
                    <>
                      <span>·</span>
                      <span>⏱ {l.leadTimeDays}d lead</span>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {l.priceMin ? (
                    <span className="text-blue-800 font-bold text-sm">
                      {formatPrice(l.priceMin)} – {formatPrice(l.priceMax)}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">Price on request</span>
                  )}
                  <span className="text-blue-800 text-xs font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/post-rfq"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow text-sm"
          >
            Need Something Specific? Post an RFQ — Free
          </Link>
        </div>
      </div>
    </section>
  );
}

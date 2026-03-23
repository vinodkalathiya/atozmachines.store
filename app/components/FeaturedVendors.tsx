"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getApprovedVendors } from "@/app/lib/store";
import { VendorProfile, CATEGORIES } from "@/app/lib/data";

export default function FeaturedVendors() {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);

  useEffect(() => {
    setVendors(getApprovedVendors().slice(0, 4));
  }, []);

  return (
    <section id="vendors" className="bg-gray-50 py-14 sm:py-16" aria-labelledby="vendors-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Verified Manufacturers</p>
            <h2 id="vendors-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Verified Vendors
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              GST-verified manufacturers with proven track records across India.
            </p>
          </div>
          <Link href="/vendors" className="text-blue-800 font-semibold text-sm hover:underline whitespace-nowrap">
            Browse All Vendors →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {vendors.map((v) => (
            <Link
              key={v.id}
              href={`/vendors/${v.id}`}
              className="card-hover bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 block group"
              title={`${v.companyName} — verified industrial machinery manufacturer`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`${v.color} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm`}>
                  {v.initial}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate group-hover:text-blue-800 transition-colors">
                    {v.companyName}
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5">📍 {v.city}, {v.state}</p>
                </div>
              </div>

              <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">{v.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {v.categories.slice(0, 2).map((slug) => {
                  const c = CATEGORIES.find((x) => x.slug === slug);
                  return c ? (
                    <span key={slug} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {c.name}
                    </span>
                  ) : null;
                })}
              </div>

              <div className="flex items-center justify-between text-xs">
                {v.establishedYear && <span className="text-gray-400">Est. {v.establishedYear}</span>}
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  GST Verified
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

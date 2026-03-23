"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getApprovedVendors } from "@/app/lib/store";
import { VendorProfile, CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");

  useEffect(() => {
    setVendors(getApprovedVendors());
  }, []);

  const filtered = vendors.filter((v) => {
    const matchSearch =
      !search ||
      v.companyName.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase()) ||
      v.state.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || v.categories.includes(catFilter);
    return matchSearch && matchCat;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Verified Vendors</h1>
            <p className="text-gray-500 text-sm mt-1">{vendors.length} verified manufacturers across India</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by company name, city, or state..."
            />
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 text-center py-12">
              <p className="text-gray-500">No vendors found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((v) => (
                <Link key={v.id} href={`/vendors/${v.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all block">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${v.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {v.initial}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-gray-900 text-sm truncate">{v.companyName}</h2>
                      <p className="text-gray-400 text-xs">📍 {v.city}, {v.state}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{v.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {v.categories.slice(0, 3).map((cat) => {
                      const c = CATEGORIES.find((x) => x.slug === cat);
                      return c ? (
                        <span key={cat} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {c.name}
                        </span>
                      ) : null;
                    })}
                    {v.categories.length > 3 && (
                      <span className="text-gray-400 text-xs px-1">+{v.categories.length - 3} more</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    {v.establishedYear && <span>Est. {v.establishedYear}</span>}
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Verified
                    </span>
                  </div>
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

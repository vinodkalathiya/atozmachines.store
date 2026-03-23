"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getVendors, getListings, getRFQs, getQuotes, getUsers } from "@/app/lib/store";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, vendors: 0, pendingVendors: 0, listings: 0, pendingListings: 0, rfqs: 0, quotes: 0 });

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      const vendors = getVendors();
      const listings = getListings();
      setStats({
        users: getUsers().length,
        vendors: vendors.length,
        pendingVendors: vendors.filter((v) => !v.isApproved).length,
        listings: listings.length,
        pendingListings: listings.filter((l) => !l.isApproved).length,
        rfqs: getRFQs().length,
        quotes: getQuotes().length,
      });
    }
  }, [user]);

  if (loading || !user || user.role !== "admin") return null;

  const cards = [
    { label: "Total Users", value: stats.users, href: null, color: "text-blue-800" },
    { label: "Vendors", value: stats.vendors, href: "/admin/vendors", color: "text-purple-700", alert: stats.pendingVendors > 0 ? `${stats.pendingVendors} pending` : null },
    { label: "Machine Listings", value: stats.listings, href: "/admin/listings", color: "text-green-700", alert: stats.pendingListings > 0 ? `${stats.pendingListings} pending` : null },
    { label: "RFQs Posted", value: stats.rfqs, href: null, color: "text-orange-600" },
    { label: "Quotes Submitted", value: stats.quotes, href: null, color: "text-teal-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Platform overview and management</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {cards.map((c) => (
              <div key={c.label} className={`bg-white rounded-xl border border-gray-200 p-4 text-center ${c.href ? "hover:border-blue-300 hover:shadow-sm" : ""}`}>
                {c.href ? (
                  <Link href={c.href} className="block">
                    <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{c.label}</p>
                    {c.alert && <p className="text-orange-600 text-xs font-semibold mt-1 bg-orange-50 px-1 py-0.5 rounded">{c.alert}</p>}
                  </Link>
                ) : (
                  <>
                    <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{c.label}</p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-1">Vendor Approvals</h2>
              <p className="text-gray-500 text-sm mb-4">{stats.pendingVendors} vendor(s) waiting for approval</p>
              <Link href="/admin/vendors" className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-4 py-2.5 rounded-lg text-sm inline-block transition-colors">
                Review Vendors →
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-1">Listing Moderation</h2>
              <p className="text-gray-500 text-sm mb-4">{stats.pendingListings} listing(s) pending review</p>
              <Link href="/admin/listings" className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-4 py-2.5 rounded-lg text-sm inline-block transition-colors">
                Review Listings →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

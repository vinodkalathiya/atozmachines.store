"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getListings, approveListing, deleteListing } from "@/app/lib/store";
import { MachineListing } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AdminListingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<MachineListing[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "admin") setListings(getListings());
  }, [user]);

  function handleApprove(id: string) {
    approveListing(id);
    setListings(getListings());
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this listing?")) return;
    deleteListing(id);
    setListings(getListings());
  }

  if (loading || !user || user.role !== "admin") return null;

  const filtered = listings.filter((l) =>
    filter === "all" ? true : filter === "pending" ? !l.isApproved : l.isApproved
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/admin" className="text-sm text-blue-800 hover:underline">← Admin</Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-xl font-bold text-gray-900">Listing Moderation</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-gray-200 p-1 rounded-xl mb-5 w-fit">
            {([["pending", "Pending"], ["approved", "Approved"], ["all", "All"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === val ? "bg-white text-blue-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {label} ({listings.filter((l) => val === "all" ? true : val === "pending" ? !l.isApproved : l.isApproved).length})
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No listings in this category</p>
              </div>
            ) : (
              filtered.map((l) => (
                <div key={l.id} className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${l.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {l.isApproved ? "APPROVED" : "PENDING"}
                        </span>
                        <span className="text-xs text-gray-400">{l.categoryName}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{l.title}</h3>
                      <p className="text-gray-500 text-xs">By: {l.vendorName} — {l.vendorCity}</p>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">{l.description}</p>
                      {l.priceMin && (
                        <p className="text-blue-800 font-semibold text-xs mt-1">
                          ₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2">
                      {!l.isApproved && (
                        <button onClick={() => handleApprove(l.id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                          ✓ Approve
                        </button>
                      )}
                      {l.isApproved && (
                        <Link href={`/machines/${l.id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg text-center">
                          View
                        </Link>
                      )}
                      <button onClick={() => handleDelete(l.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

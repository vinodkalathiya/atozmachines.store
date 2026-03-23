"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getVendors, approveVendor, rejectVendor, getUserById } from "@/app/lib/store";
import { VendorProfile, CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AdminVendorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "admin") setVendors(getVendors());
  }, [user]);

  function handleApprove(id: string) {
    approveVendor(id);
    setVendors(getVendors());
  }

  function handleReject(id: string) {
    if (!confirm("Are you sure you want to reject and remove this vendor?")) return;
    rejectVendor(id);
    setVendors(getVendors());
  }

  if (loading || !user || user.role !== "admin") return null;

  const filtered = vendors.filter((v) =>
    filter === "all" ? true : filter === "pending" ? !v.isApproved : v.isApproved
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/admin" className="text-sm text-blue-800 hover:underline">← Admin</Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-xl font-bold text-gray-900">Vendor Management</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-gray-200 p-1 rounded-xl mb-5 w-fit">
            {([["pending", "Pending"], ["approved", "Approved"], ["all", "All"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === val ? "bg-white text-blue-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {label} ({vendors.filter((v) => val === "all" ? true : val === "pending" ? !v.isApproved : v.isApproved).length})
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm">No vendors in this category</p>
              </div>
            ) : (
              filtered.map((v) => {
                const ownerUser = getUserById(v.userId);
                return (
                  <div key={v.id} className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`${v.color} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                          {v.initial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-gray-900">{v.companyName}</h3>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${v.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {v.isApproved ? "APPROVED" : "PENDING"}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs">📍 {v.city}, {v.state}</p>
                          {ownerUser && <p className="text-gray-400 text-xs">👤 {ownerUser.name} — {ownerUser.email}</p>}
                          {v.gstNumber && <p className="text-gray-400 text-xs">GST: {v.gstNumber}</p>}
                          <p className="text-gray-600 text-xs mt-1 line-clamp-2 max-w-md">{v.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {v.categories.slice(0, 4).map((cat) => {
                              const c = CATEGORIES.find((x) => x.slug === cat);
                              return c ? (
                                <span key={cat} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{c.name}</span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col gap-2">
                        {!v.isApproved && (
                          <button onClick={() => handleApprove(v.id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                            ✓ Approve
                          </button>
                        )}
                        <button onClick={() => handleReject(v.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                          ✕ {v.isApproved ? "Remove" : "Reject"}
                        </button>
                        {v.isApproved && (
                          <Link href={`/vendors/${v.id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg transition-colors text-center">
                            View Profile
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

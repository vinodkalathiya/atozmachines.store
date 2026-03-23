"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getVendorByUserId, getQuotesByVendor, getRFQById, getListingsByVendor, getRFQsByCategory } from "@/app/lib/store";
import { VendorProfile, Quote, RFQ, MachineListing } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function VendorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [vendor, setVendor] = useState<VendorProfile | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [openLeads, setOpenLeads] = useState<RFQ[]>([]);
  const [listings, setListings] = useState<MachineListing[]>([]);
  const [tab, setTab] = useState<"leads" | "listings">("leads");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "vendor") router.push("/");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const v = getVendorByUserId(user.id);
      setVendor(v);
      if (v) {
        const myQuotes = getQuotesByVendor(v.id);
        setQuotes(myQuotes);
        const quotedIds = new Set(myQuotes.map((q) => q.rfqId));
        const leads: RFQ[] = [];
        v.categories.forEach((cat) => {
          getRFQsByCategory(cat).forEach((r) => {
            if (!quotedIds.has(r.id) && !leads.find((l) => l.id === r.id)) leads.push(r);
          });
        });
        setOpenLeads(leads);
        setListings(getListingsByVendor(v.id));
      }
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-500 text-sm">{user.companyName || vendor?.companyName}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/vendor/listings/new" className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
                + Add Listing
              </Link>
            </div>
          </div>

          {/* Approval Banner */}
          {vendor && !vendor.isApproved && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <span className="text-xl">⏳</span>
                <div>
                  <p className="font-semibold text-yellow-800 text-sm">Pending Approval</p>
                  <p className="text-yellow-700 text-xs mt-0.5">Your vendor profile is under review. Admin will approve within 1-2 business days. You can still set up your listings.</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Open Leads", value: openLeads.length },
              { label: "Quotes Sent", value: quotes.length },
              { label: "Shortlisted", value: quotes.filter((q) => q.status === "shortlisted").length },
              { label: "Won", value: quotes.filter((q) => q.status === "accepted").length },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-blue-800">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-200 p-1 rounded-xl mb-4 w-fit">
            {(["leads", "listings"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors capitalize ${tab === t ? "bg-white text-blue-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {t} {t === "leads" ? `(${openLeads.length})` : `(${listings.length})`}
              </button>
            ))}
          </div>

          {/* Leads Tab */}
          {tab === "leads" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Open RFQ Leads Matching Your Categories</h2>
                <p className="text-gray-500 text-xs mt-0.5">These buyers are looking for machines in your categories</p>
              </div>
              {openLeads.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-3xl mb-2">✅</p>
                  <p className="text-gray-500 text-sm">You&apos;ve responded to all current leads!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {openLeads.map((rfq) => (
                    <div key={rfq.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">NEW LEAD</span>
                            <span className="text-xs text-gray-400">{rfq.categoryName}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{rfq.title}</h3>
                          <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{rfq.description}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                            <span>Qty: {rfq.quantity} {rfq.unit}</span>
                            {rfq.budgetMax && <span>Budget: ₹{rfq.budgetMin?.toLocaleString()} – ₹{rfq.budgetMax?.toLocaleString()}</span>}
                            <span>📍 {rfq.deliveryCity}</span>
                          </div>
                        </div>
                        <Link href={`/vendor/leads/${rfq.id}`}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                          Submit Quote →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quoted leads */}
              {quotes.length > 0 && (
                <>
                  <div className="p-4 border-t border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-700 text-sm">Quotes Sent ({quotes.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {quotes.map((q) => {
                      const rfq = getRFQById(q.rfqId);
                      return rfq ? (
                        <div key={q.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{rfq.title}</p>
                            <p className="text-gray-400 text-xs">{rfq.categoryName} • {rfq.deliveryCity}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-blue-800">₹{q.price.toLocaleString()}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${q.status === "accepted" ? "bg-green-100 text-green-700" : q.status === "shortlisted" ? "bg-yellow-100 text-yellow-700" : q.status === "rejected" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-700"}`}>
                              {q.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Listings Tab */}
          {tab === "listings" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">My Machine Listings</h2>
                <Link href="/vendor/listings/new" className="text-blue-800 text-sm font-semibold hover:underline">+ Add New</Link>
              </div>
              {listings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-3xl mb-2">🏭</p>
                  <p className="text-gray-500 text-sm mb-4">No listings yet</p>
                  <Link href="/vendor/listings/new" className="bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-900 transition-colors text-sm">
                    Add Your First Machine
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {listings.map((l) => (
                    <div key={l.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${l.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {l.isApproved ? "LIVE" : "PENDING APPROVAL"}
                          </span>
                          <span className="text-xs text-gray-400">{l.categoryName}</span>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">{l.title}</p>
                        {l.priceMin && <p className="text-xs text-gray-400">₹{l.priceMin.toLocaleString()} – ₹{l.priceMax?.toLocaleString()}</p>}
                      </div>
                      <Link href={`/machines/${l.id}`} className="text-blue-800 text-xs font-semibold hover:underline whitespace-nowrap">
                        View →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

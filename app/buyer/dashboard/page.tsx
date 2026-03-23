"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getRFQsByBuyer, getQuotesByRFQ } from "@/app/lib/store";
import { RFQ } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function BuyerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [quoteCounts, setQuoteCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && user.role !== "buyer") router.push("/");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const list = getRFQsByBuyer(user.id).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRfqs(list);
      const counts: Record<string, number> = {};
      list.forEach((r) => { counts[r.id] = getQuotesByRFQ(r.id).length; });
      setQuoteCounts(counts);
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name.split(" ")[0]} 👋</h1>
              <p className="text-gray-500 text-sm mt-0.5">{user.companyName || "Buyer Account"}</p>
            </div>
            <Link href="/post-rfq"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
              + Post New RFQ
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total RFQs", value: rfqs.length },
              { label: "Open", value: rfqs.filter((r) => r.status === "open").length },
              { label: "Quotes Received", value: Object.values(quoteCounts).reduce((a, b) => a + b, 0) },
              { label: "Closed", value: rfqs.filter((r) => r.status === "closed").length },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-blue-800">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* RFQ List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">My RFQs</h2>
            </div>
            {rfqs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">📋</p>
                <p className="text-gray-500 text-sm mb-4">No RFQs posted yet</p>
                <Link href="/post-rfq" className="bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-colors text-sm">
                  Post Your First RFQ
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {rfqs.map((rfq) => (
                  <div key={rfq.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[rfq.status]}`}>
                            {rfq.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">{rfq.categoryName}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 truncate">{rfq.title}</h3>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{rfq.description}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-400">
                          <span>Qty: {rfq.quantity} {rfq.unit}</span>
                          {rfq.budgetMax && <span>Budget: ₹{rfq.budgetMin?.toLocaleString()} – ₹{rfq.budgetMax?.toLocaleString()}</span>}
                          <span>📍 {rfq.deliveryCity}</span>
                          <span>Posted: {new Date(rfq.createdAt).toLocaleDateString("en-IN")}</span>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3">
                        <div className="text-center">
                          <p className="text-xl font-bold text-blue-800">{quoteCounts[rfq.id] || 0}</p>
                          <p className="text-xs text-gray-400">Quotes</p>
                        </div>
                        <Link href={`/buyer/rfqs/${rfq.id}`}
                          className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                          View Quotes →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

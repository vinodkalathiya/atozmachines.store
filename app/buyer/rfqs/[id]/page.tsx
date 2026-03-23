"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getRFQById, getQuotesByRFQ, updateQuoteStatus, updateRFQStatus } from "@/app/lib/store";
import { RFQ, Quote } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RFQDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (id) {
      setRfq(getRFQById(id));
      setQuotes(getQuotesByRFQ(id));
    }
  }, [id]);

  function handleShortlist(quoteId: string) {
    updateQuoteStatus(quoteId, "shortlisted");
    setQuotes(getQuotesByRFQ(id));
  }

  function handleAccept(quoteId: string) {
    updateQuoteStatus(quoteId, "accepted");
    updateRFQStatus(id, "closed");
    setRfq(getRFQById(id));
    setQuotes(getQuotesByRFQ(id));
  }

  function handleReject(quoteId: string) {
    updateQuoteStatus(quoteId, "rejected");
    setQuotes(getQuotesByRFQ(id));
  }

  if (loading || !user) return null;
  if (!rfq) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">RFQ not found</p>
          <Link href="/buyer/dashboard" className="text-blue-800 hover:underline text-sm mt-2 block">← Back to Dashboard</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  const STATUS_Q: Record<string, string> = {
    submitted: "bg-blue-100 text-blue-700",
    shortlisted: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/buyer/dashboard" className="text-sm text-blue-800 hover:underline flex items-center gap-1 mb-5">
            ← Back to Dashboard
          </Link>

          {/* RFQ Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rfq.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {rfq.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">{rfq.categoryName}</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">{rfq.title}</h1>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-2xl font-bold text-blue-800">{quotes.length}</p>
                <p className="text-xs text-gray-400">Quotes Received</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{rfq.description}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
              <span>Qty: <strong>{rfq.quantity} {rfq.unit}</strong></span>
              {rfq.budgetMax && <span>Budget: <strong>₹{rfq.budgetMin?.toLocaleString()} – ₹{rfq.budgetMax?.toLocaleString()}</strong></span>}
              <span>Delivery: <strong>{rfq.deliveryCity}</strong></span>
              {rfq.deliveryDeadline && <span>By: <strong>{new Date(rfq.deliveryDeadline).toLocaleDateString("en-IN")}</strong></span>}
              <span>Posted: <strong>{new Date(rfq.createdAt).toLocaleDateString("en-IN")}</strong></span>
            </div>
          </div>

          {/* Quotes */}
          <h2 className="font-bold text-gray-900 mb-4">Quotes ({quotes.length})</h2>
          {quotes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 text-center py-12">
              <p className="text-3xl mb-2">⏳</p>
              <p className="text-gray-500 text-sm">No quotes yet. Vendors are reviewing your requirement.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((q) => (
                <div key={q.id} className={`bg-white rounded-2xl border p-5 ${q.status === "accepted" ? "border-green-300 bg-green-50" : q.status === "shortlisted" ? "border-yellow-300" : "border-gray-200"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_Q[q.status]}`}>
                          {q.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-green-600 font-semibold">✓ Verified Vendor</span>
                      </div>
                      <h3 className="font-bold text-gray-900">{q.vendorName}</h3>
                      <p className="text-gray-400 text-xs">📍 {q.vendorCity}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl font-bold text-blue-800">₹{q.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">{q.currency} • Valid {q.validityDays} days</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                    <span>⏱ Lead Time: <strong>{q.leadTimeDays} days</strong></span>
                    <span>📅 Submitted: {new Date(q.submittedAt).toLocaleDateString("en-IN")}</span>
                  </div>

                  {q.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">{q.notes}</p>
                  )}

                  {rfq.status === "open" && q.status !== "accepted" && q.status !== "rejected" && (
                    <div className="flex flex-wrap gap-2">
                      {q.status !== "shortlisted" && (
                        <button onClick={() => handleShortlist(q.id)}
                          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                          ⭐ Shortlist
                        </button>
                      )}
                      <button onClick={() => handleAccept(q.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                        ✓ Accept & Contact
                      </button>
                      <button onClick={() => handleReject(q.id)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
                        ✕ Decline
                      </button>
                    </div>
                  )}

                  {q.status === "accepted" && (
                    <div className="bg-green-100 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-green-800 mb-1">Quote Accepted! Contact Details:</p>
                      <p className="text-green-700 text-xs">Vendor: {q.vendorName} — {q.vendorCity}</p>
                      <p className="text-green-700 text-xs">Contact via platform messaging or call directly to proceed.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

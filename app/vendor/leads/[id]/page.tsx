"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getRFQById, getVendorByUserId, createQuote, hasVendorQuoted } from "@/app/lib/store";
import { RFQ } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function VendorLeadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [alreadyQuoted, setAlreadyQuoted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ price: "", leadTimeDays: "", validityDays: "30", notes: "" });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "vendor") router.push("/");
  }, [user, loading, router]);

  useEffect(() => {
    if (id && user) {
      const r = getRFQById(id);
      setRfq(r);
      const v = getVendorByUserId(user.id);
      if (v) setAlreadyQuoted(hasVendorQuoted(id, v.id));
    }
  }, [id, user]);

  function set(field: string, value: string) { setForm((p) => ({ ...p, [field]: value })); }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    const v = getVendorByUserId(user.id);
    if (!v || !rfq) return;
    setSubmitting(true);
    createQuote({
      rfqId: id,
      vendorId: v.id,
      vendorName: v.companyName,
      vendorCity: `${v.city}, ${v.state}`,
      price: parseInt(form.price),
      currency: "INR",
      leadTimeDays: parseInt(form.leadTimeDays),
      validityDays: parseInt(form.validityDays),
      notes: form.notes,
      status: "submitted",
    });
    setSubmitting(false);
    setSubmitted(true);
  }

  if (loading || !user) return null;

  if (submitted || alreadyQuoted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {alreadyQuoted && !submitted ? "Already Quoted" : "Quote Submitted!"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {alreadyQuoted && !submitted
                ? "You have already submitted a quote for this RFQ."
                : "Your quote has been sent to the buyer. You'll be notified if they shortlist or accept it."}
            </p>
            <Link href="/vendor/dashboard" className="bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!rfq) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Link href="/vendor/dashboard" className="text-sm text-blue-800 hover:underline flex items-center gap-1 mb-5">
            ← Back to Dashboard
          </Link>

          {/* RFQ Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">OPEN RFQ</span>
              <span className="text-xs text-gray-400">{rfq.categoryName}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">{rfq.title}</h1>
            <p className="text-gray-600 text-sm mb-4">{rfq.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-gray-400">Quantity</p>
                <p className="font-semibold text-gray-800">{rfq.quantity} {rfq.unit}</p>
              </div>
              {rfq.budgetMax && (
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-gray-400">Budget</p>
                  <p className="font-semibold text-gray-800">₹{(rfq.budgetMax / 100000).toFixed(1)}L max</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-gray-400">Delivery</p>
                <p className="font-semibold text-gray-800">{rfq.deliveryCity}</p>
              </div>
              {rfq.deliveryDeadline && (
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-gray-400">Required By</p>
                  <p className="font-semibold text-gray-800">{new Date(rfq.deliveryDeadline).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Submit Your Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Price (₹) *</label>
                <input required type="number" min="1" value={form.price} onChange={(e) => set("price", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 1500000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days) *</label>
                  <input required type="number" min="1" value={form.leadTimeDays} onChange={(e) => set("leadTimeDays", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 45" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Validity (days)</label>
                  <select value={form.validityDays} onChange={(e) => set("validityDays", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {["7", "14", "15", "30", "45", "60"].map((d) => <option key={d} value={d}>{d} days</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Terms</label>
                <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Include: what's included in price, payment terms, warranty, installation details, GST applicability..." />
              </div>
              <div className="flex gap-3 pt-2">
                <Link href="/vendor/dashboard" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center hover:bg-gray-50 text-sm">
                  Cancel
                </Link>
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors">
                  {submitting ? "Submitting..." : "Submit Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

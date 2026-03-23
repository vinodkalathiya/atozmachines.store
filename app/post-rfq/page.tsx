"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { createRFQ } from "@/app/lib/store";
import { CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function PostRFQPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    categorySlug: "", title: "", description: "",
    quantity: "", unit: "units", budgetMin: "", budgetMax: "",
    deliveryCity: "", deliveryDeadline: "",
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role === "vendor") router.push("/vendor/dashboard");
  }, [user, loading, router]);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const cat = CATEGORIES.find((c) => c.slug === form.categorySlug);
    createRFQ({
      buyerId: user.id,
      buyerName: user.name,
      categorySlug: form.categorySlug,
      categoryName: cat?.name || "",
      title: form.title,
      description: form.description,
      quantity: parseInt(form.quantity) || 1,
      unit: form.unit,
      budgetMin: form.budgetMin ? parseInt(form.budgetMin) : undefined,
      budgetMax: form.budgetMax ? parseInt(form.budgetMax) : undefined,
      deliveryCity: form.deliveryCity,
      deliveryDeadline: form.deliveryDeadline || undefined,
      status: "open",
    });
    setSubmitting(false);
    setSubmitted(true);
  }

  if (loading || !user) return null;

  if (submitted) {
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">RFQ Submitted!</h2>
            <p className="text-gray-500 mb-6">Your requirement has been posted. Matched vendors will receive notifications and respond within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/buyer/dashboard" className="bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors">
                View My RFQs
              </Link>
              <button onClick={() => { setSubmitted(false); setForm({ categorySlug: "", title: "", description: "", quantity: "", unit: "units", budgetMin: "", budgetMax: "", deliveryCity: "", deliveryDeadline: "" }); }}
                className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                Post Another
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Post a Requirement (RFQ)</h1>
            <p className="text-gray-500 text-sm mt-1">Describe what you need — matched vendors will send you quotes within 24 hours.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine Category *</label>
                <select required value={form.categorySlug} onChange={(e) => set("categorySlug", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirement Title *</label>
                <input required value={form.title} onChange={(e) => set("title", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., CNC VMC Machine for Mold Making" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description *</label>
                <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the machine specifications, capacity, features required, application, etc." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input required type="number" min="1" value={form.quantity} onChange={(e) => set("quantity", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select value={form.unit} onChange={(e) => set("unit", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {["units", "sets", "pieces", "system", "line", "kg", "ton", "meters"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (₹) <span className="text-gray-400 font-normal">(optional)</span></label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" value={form.budgetMin} onChange={(e) => set("budgetMin", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min (e.g. 500000)" />
                  <input type="number" value={form.budgetMax} onChange={(e) => set("budgetMax", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max (e.g. 1500000)" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery City *</label>
                  <input required value={form.deliveryCity} onChange={(e) => set("deliveryCity", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ahmedabad" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required By <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input type="date" value={form.deliveryDeadline} onChange={(e) => set("deliveryDeadline", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Link href="/" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </Link>
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-xl transition-colors">
                  {submitting ? "Submitting..." : "Submit RFQ — Free"}
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

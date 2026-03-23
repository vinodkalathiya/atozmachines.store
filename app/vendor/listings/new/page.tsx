"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { getVendorByUserId, createListing } from "@/app/lib/store";
import { CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function NewListingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    categorySlug: "", title: "", description: "",
    priceMin: "", priceMax: "", leadTimeDays: "",
    spec1Key: "", spec1Val: "", spec2Key: "", spec2Val: "",
    spec3Key: "", spec3Val: "", spec4Key: "", spec4Val: "",
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "vendor") router.push("/");
  }, [user, loading, router]);

  function set(field: string, value: string) { setForm((p) => ({ ...p, [field]: value })); }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    const v = getVendorByUserId(user.id);
    if (!v) return;
    const cat = CATEGORIES.find((c) => c.slug === form.categorySlug);
    const specs: Record<string, string> = {};
    for (let i = 1; i <= 4; i++) {
      const k = form[`spec${i}Key` as keyof typeof form];
      const v2 = form[`spec${i}Val` as keyof typeof form];
      if (k && v2) specs[k] = v2;
    }
    createListing({
      vendorId: v.id,
      vendorName: v.companyName,
      vendorCity: `${v.city}, ${v.state}`,
      categorySlug: form.categorySlug,
      categoryName: cat?.name || "",
      title: form.title,
      description: form.description,
      priceMin: form.priceMin ? parseInt(form.priceMin) : undefined,
      priceMax: form.priceMax ? parseInt(form.priceMax) : undefined,
      leadTimeDays: form.leadTimeDays ? parseInt(form.leadTimeDays) : undefined,
      specs,
      isApproved: false,
      isActive: true,
    });
    setSubmitted(true);
  }

  if (loading || !user) return null;

  if (submitted) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">Your machine listing is pending admin approval and will go live within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/vendor/dashboard" className="bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors">
              Go to Dashboard
            </Link>
            <button onClick={() => { setSubmitted(false); setForm({ categorySlug: "", title: "", description: "", priceMin: "", priceMax: "", leadTimeDays: "", spec1Key: "", spec1Val: "", spec2Key: "", spec2Val: "", spec3Key: "", spec3Val: "", spec4Key: "", spec4Val: "" }); }}
              className="border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Add Another
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Link href="/vendor/dashboard" className="text-sm text-blue-800 hover:underline mb-5 block">← Back to Dashboard</Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Machine Listing</h1>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select required value={form.categorySlug} onChange={(e) => set("categorySlug", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select category...</option>
                  {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine Title *</label>
                <input required value={form.title} onChange={(e) => set("title", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. CNC Vertical Machining Center VMC-850" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the machine, its capabilities, applications, and any features that make it stand out..." />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₹)</label>
                  <input type="number" value={form.priceMin} onChange={(e) => set("priceMin", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="800000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹)</label>
                  <input type="number" value={form.priceMax} onChange={(e) => set("priceMax", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1500000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
                  <input type="number" value={form.leadTimeDays} onChange={(e) => set("leadTimeDays", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30" />
                </div>
              </div>

              {/* Specs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Technical Specifications (up to 4)</label>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <input value={form[`spec${i}Key` as keyof typeof form]} onChange={(e) => set(`spec${i}Key`, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={i === 1 ? "e.g. Table Size" : `Spec ${i} Name`} />
                      <input value={form[`spec${i}Val` as keyof typeof form]} onChange={(e) => set(`spec${i}Val`, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={i === 1 ? "e.g. 850 x 450 mm" : `Spec ${i} Value`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href="/vendor/dashboard" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-center hover:bg-gray-50 text-sm">
                  Cancel
                </Link>
                <button type="submit" className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-xl transition-colors">
                  Submit Listing
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

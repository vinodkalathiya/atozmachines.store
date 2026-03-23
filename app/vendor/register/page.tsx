"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { createUser, createVendor, getUserByEmail, seedIfNeeded } from "@/app/lib/store";
import { CATEGORIES } from "@/app/lib/data";

const COLORS = ["bg-blue-800", "bg-green-700", "bg-orange-500", "bg-purple-700", "bg-red-600", "bg-teal-600"];

export default function VendorRegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
    companyName: "", description: "", city: "", state: "",
    website: "", gstNumber: "", establishedYear: "",
    categories: [] as string[],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleCategory(slug: string) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    if (form.categories.length === 0) { setError("Select at least one category"); return; }
    setError("");
    setLoading(true);
    seedIfNeeded();
    const existing = getUserByEmail(form.email);
    if (existing) { setError("Email already registered."); setLoading(false); return; }

    const initial = form.companyName.charAt(0).toUpperCase();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    const user = createUser({
      email: form.email, password: form.password, name: form.name,
      role: "vendor", companyName: form.companyName, phone: form.phone,
    });

    createVendor({
      userId: user.id,
      companyName: form.companyName,
      description: form.description,
      city: form.city, state: form.state,
      phone: form.phone, website: form.website,
      gstNumber: form.gstNumber,
      establishedYear: form.establishedYear ? parseInt(form.establishedYear) : undefined,
      categories: form.categories,
      isApproved: false,
      initial, color,
    });

    await login(form.email, form.password);
    router.push("/vendor/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-800 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">AZ</span>
            </div>
            <span className="text-blue-900 font-bold text-xl">A TO Z Machines</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Register as Vendor</h1>
          <p className="text-gray-500 text-sm mt-1">
            Step {step} of 2 — {step === 1 ? "Account Details" : "Company Details & Categories"}
          </p>
          {/* Progress */}
          <div className="flex gap-2 justify-center mt-3">
            <div className={`h-1.5 w-20 rounded-full ${step >= 1 ? "bg-blue-800" : "bg-gray-200"}`} />
            <div className={`h-1.5 w-20 rounded-full ${step >= 2 ? "bg-blue-800" : "bg-gray-200"}`} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input required value={form.name} onChange={(e) => set("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Suresh Kumar" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input required value={form.companyName} onChange={(e) => set("companyName", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rajkot Engineering Works Pvt Ltd" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input required type="password" minLength={6} value={form.password} onChange={(e) => set("password", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Minimum 6 characters" />
                </div>
                <button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition-colors">
                  Continue →
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Description *</label>
                  <textarea required rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your manufacturing capabilities, experience, certifications..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input required value={form.city} onChange={(e) => set("city", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Rajkot" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <input required value={form.state} onChange={(e) => set("state", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Gujarat" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input value={form.gstNumber} onChange={(e) => set("gstNumber", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="24AAAAA0000A1Z5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Est. Year</label>
                    <input type="number" value={form.establishedYear} onChange={(e) => set("establishedYear", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="2005" min="1900" max="2025" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Machine Categories * (select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.slug} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-xs transition-colors ${form.categories.includes(cat.slug) ? "border-blue-800 bg-blue-50 text-blue-800" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="checkbox" className="sr-only" checked={form.categories.includes(cat.slug)} onChange={() => toggleCategory(cat.slug)} />
                        <span>{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors hover:bg-gray-50">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-colors">
                    {loading ? "Registering..." : "Submit for Approval"}
                  </button>
                </div>
              </>
            )}
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-800 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

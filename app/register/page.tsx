"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { createUser, getUserByEmail, seedIfNeeded } from "@/app/lib/store";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", companyName: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    seedIfNeeded();
    const existing = getUserByEmail(form.email);
    if (existing) { setError("An account with this email already exists."); setLoading(false); return; }
    createUser({
      email: form.email,
      password: form.password,
      name: form.name,
      role: "buyer",
      companyName: form.companyName,
      phone: form.phone,
    });
    await login(form.email, form.password);
    router.push("/buyer/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-800 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">AZ</span>
            </div>
            <span className="text-blue-900 font-bold text-xl">A TO Z Machines</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Buyer Account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-800 font-semibold hover:underline">Sign in</Link>
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Are you a vendor?{" "}
            <Link href="/vendor/register" className="text-blue-800 font-semibold hover:underline">Register as Vendor →</Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required value={form.name} onChange={(e) => set("name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Amit Patel" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input value={form.companyName} onChange={(e) => set("companyName", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Patel Engineering Pvt Ltd" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input required type="password" minLength={6} value={form.password} onChange={(e) => set("password", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 6 characters" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-colors">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

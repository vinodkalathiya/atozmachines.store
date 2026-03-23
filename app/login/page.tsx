"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    if (user.role === "buyer") router.replace("/buyer/dashboard");
    else if (user.role === "vendor") router.replace("/vendor/dashboard");
    else router.replace("/admin");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Login failed");
      return;
    }
    // Redirect based on role
    const fresh = JSON.parse(localStorage.getItem("atoz_current_user") || "{}");
    if (fresh.role === "vendor") router.push("/vendor/dashboard");
    else if (fresh.role === "admin") router.push("/admin");
    else router.push("/buyer/dashboard");
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
          <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-800 font-semibold hover:underline">Register as Buyer</Link>
            {" "}or{" "}
            <Link href="/vendor/register" className="text-blue-800 font-semibold hover:underline">Vendor</Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Demo accounts */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-xs text-blue-800">
            <p className="font-semibold mb-1">Demo Accounts (password: demo123)</p>
            <p>Buyer: buyer@demo.com</p>
            <p>Vendor: vendor@demo.com</p>
            <p>Admin: admin@demo.com</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

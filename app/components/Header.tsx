"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/");
    setMobileOpen(false);
  }

  function getDashboardLink() {
    if (!user) return "/login";
    if (user.role === "buyer") return "/buyer/dashboard";
    if (user.role === "vendor") return "/vendor/dashboard";
    return "/admin";
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-800 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">AZ</span>
            </div>
            <span className="text-blue-900 font-bold text-lg leading-tight hidden sm:block">
              A TO Z<br />
              <span className="text-orange-500 text-xs font-semibold tracking-wide">MACHINES</span>
            </span>
            <span className="text-blue-900 font-bold text-base sm:hidden">AtoZ Machines</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/categories" className="hover:text-blue-800 transition-colors">Categories</Link>
            <Link href="/vendors" className="hover:text-blue-800 transition-colors">Vendors</Link>
            <Link href="/pricing" className="hover:text-blue-800 transition-colors">Pricing</Link>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors hidden sm:block"
                >
                  {user.name.split(" ")[0]}&apos;s Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors hidden sm:block"
                >
                  Sign In
                </Link>
                <Link
                  href="/vendor/register"
                  className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap hidden sm:block"
                >
                  Get Listed
                </Link>
              </>
            )}
            <Link
              href="/post-rfq"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Post RFQ
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-800"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            <Link href="/categories" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Categories</Link>
            <Link href="/vendors" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Vendors</Link>
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Pricing</Link>
            {user ? (
              <>
                <Link href={getDashboardLink()} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-blue-800 font-semibold hover:bg-blue-50 rounded-lg">My Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Sign In</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Register as Buyer</Link>
                <Link href="/vendor/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-blue-800 font-semibold hover:bg-blue-50 rounded-lg">Get Listed as Vendor</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

import Link from "next/link";
import { CATEGORIES } from "@/app/lib/data";

const COMPANY_LINKS = [
  ["/", "About Us"],
  ["/#how-it-works", "How It Works"],
  ["/pricing", "Pricing"],
  ["/#", "Blog"],
  ["/#", "Careers"],
  ["/#", "Contact Us"],
];

const BUYER_LINKS = [
  ["/register", "Register as Buyer"],
  ["/post-rfq", "Post an RFQ"],
  ["/categories", "Browse Categories"],
  ["/vendors", "Find Vendors"],
  ["/login", "Sign In"],
];

const VENDOR_LINKS = [
  ["/vendor/register", "Register as Vendor"],
  ["/pricing", "Pricing Plans"],
  ["/vendor/dashboard", "Vendor Dashboard"],
  ["/vendor/listings/new", "Add Machine Listing"],
  ["/vendors", "Browse Vendors"],
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400" aria-label="Site footer">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AZ</span>
              </div>
              <div>
                <span className="text-white font-bold text-sm block leading-none">A TO Z Machines</span>
                <span className="text-blue-400 text-xs">Industrial Marketplace</span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed mb-4">
              India&apos;s specialized B2B marketplace for industrial machinery. Connecting buyers with 2,000+ verified manufacturers across 50+ machine categories.
            </p>
            <div className="flex gap-2">
              {["LinkedIn", "Twitter", "YouTube"].map((s) => (
                <a key={s} href="#" className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center text-xs transition-colors" aria-label={s}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Machine Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-xs hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buyers */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">For Buyers</h3>
            <ul className="space-y-2">
              {BUYER_LINKS.map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendors */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">For Vendors</h3>
            <ul className="space-y-2">
              {VENDOR_LINKS.map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 py-6 border-y border-gray-800 mb-6">
          {[
            "✅ GST Verified Vendors",
            "🔒 Secure Platform",
            "🆓 Free for Buyers",
            "⚡ 24hr Response",
            "🇮🇳 Made in India",
          ].map((t) => (
            <span key={t} className="text-xs text-gray-400">{t}</span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2025 A TO Z Machines | atozmachines.store | All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

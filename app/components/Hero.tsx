import Link from "next/link";
import SearchBar from "./SearchBar";

const POPULAR_SEARCHES = [
  "CNC Machines", "Packaging Machines", "Lathe Machines",
  "Hydraulic Press", "Compressors", "Conveyor Systems",
];

export default function Hero() {
  return (
    <section
      className="relative bg-gradient-to-br from-[#0f2460] via-[#1e3a8a] to-[#1e40af] text-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold tracking-wide text-blue-100">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            India&apos;s Fastest Growing Industrial Machinery Marketplace
          </div>

          {/* H1 — SEO-optimized headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-tight mb-4 tracking-tight">
            Find &amp; Source{" "}
            <span className="text-orange-400">Industrial Machines</span>
            <br className="hidden sm:block" /> from Verified{" "}
            <span className="text-orange-400">Indian Manufacturers</span>
          </h1>

          <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Post your requirement for free. Get quotes from{" "}
            <strong className="text-white">2,000+ verified manufacturers</strong> within{" "}
            <strong className="text-white">24 hours</strong>. Compare, shortlist, and connect — all in one place.
          </p>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar />
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
            <span className="text-blue-300 text-xs font-medium">Popular:</span>
            {POPULAR_SEARCHES.map((s) => (
              <Link
                key={s}
                href={`/categories?q=${encodeURIComponent(s)}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 text-xs px-3 py-1 rounded-full transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <Link
              href="/post-rfq"
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-7 py-3.5 rounded-xl text-center transition-colors shadow-lg text-sm sm:text-base"
            >
              📋 Post Your Requirement — Free
            </Link>
            <Link
              href="/vendor/register"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl text-center transition-colors text-sm sm:text-base"
            >
              🏭 List Your Company as Vendor
            </Link>
          </div>

          {/* Trust Signals Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { icon: "✅", label: "Verified Vendors Only" },
              { icon: "⚡", label: "24hr Quote Response" },
              { icon: "🔒", label: "GST Verified Companies" },
              { icon: "🆓", label: "Free for Buyers" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-3 py-2"
              >
                <span className="text-base leading-none">{t.icon}</span>
                <span className="text-blue-100 text-xs font-medium leading-tight">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

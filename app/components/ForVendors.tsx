import Link from "next/link";

const BENEFITS = [
  { icon: "🎯", title: "Qualified Leads Only", desc: "Buyers with real specs and budgets — not random visitors" },
  { icon: "📊", title: "Lead Pipeline Dashboard", desc: "Track every RFQ, quote, and conversion in one place" },
  { icon: "🏅", title: "Verified Vendor Badge", desc: "GST verification builds instant buyer trust" },
  { icon: "💰", title: "Reach 10,000+ Buyers", desc: "Pan-India buyer network across all industries" },
];

const PLAN_HIGHLIGHTS = [
  { plan: "Free", leads: "5 leads/month", listings: "1 listing", price: "₹0" },
  { plan: "Starter", leads: "20 leads/month", listings: "5 listings", price: "₹999/mo" },
  { plan: "Growth", leads: "60 leads/month", listings: "15 listings", price: "₹2,499/mo" },
];

export default function ForVendors() {
  return (
    <section className="bg-gradient-to-br from-[#0f2460] via-[#1e3a8a] to-[#1e40af] text-white py-14 sm:py-16" aria-labelledby="vendor-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-3">For Manufacturers &amp; Vendors</p>
            <h2 id="vendor-heading" className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Grow Your Manufacturing Business With Qualified Machine Leads
            </h2>
            <p className="text-blue-200 text-sm sm:text-base mb-6 leading-relaxed">
              Stop paying for cold calls that go nowhere. Get RFQ leads from verified buyers who already know what machine they want, their budget, and delivery timeline.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-3.5 transition-colors">
                  <span className="text-xl leading-none flex-shrink-0">{b.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-xs">{b.title}</p>
                    <p className="text-blue-200 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/vendor/register"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-6 py-3.5 rounded-xl text-center transition-colors shadow-lg text-sm"
              >
                🏭 List Your Company — Free
              </Link>
              <Link
                href="/pricing"
                className="border border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3.5 rounded-xl text-center transition-colors text-sm"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>

          {/* Right — Pricing Preview */}
          <div>
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-4">Plan Comparison</p>
            <div className="space-y-3">
              {PLAN_HIGHLIGHTS.map((p, i) => (
                <div
                  key={p.plan}
                  className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
                    i === 1
                      ? "bg-white/15 border-orange-400/50 ring-1 ring-orange-400/30"
                      : "bg-white/8 border-white/15"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{p.plan}</span>
                      {i === 1 && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <p className="text-blue-300 text-xs mt-0.5">{p.leads} · {p.listings}</p>
                  </div>
                  <span className="text-white font-bold text-sm">{p.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-white/10 rounded-xl border border-white/15 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-white font-semibold text-sm">Free Beta Access</p>
                  <p className="text-blue-200 text-xs mt-0.5">All plans are free during our beta phase. Upgrade when we launch paid plans — early vendors get 3 months free.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

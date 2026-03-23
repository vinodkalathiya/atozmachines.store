const STATS = [
  { value: "2,000+", label: "Verified Vendors", icon: "🏭", sub: "Across 18 states" },
  { value: "10,000+", label: "Machine Listings", icon: "⚙️", sub: "50+ categories" },
  { value: "5,000+", label: "RFQs Processed", icon: "📋", sub: "₹500Cr+ in value" },
  { value: "24 hrs", label: "Avg Response Time", icon: "⚡", sub: "Fastest in India" },
];

const TESTIMONIALS = [
  {
    quote:
      "Posted my CNC requirement at 10 PM, had 6 competitive quotes by morning. Found the perfect vendor in Rajkot within 3 days. Saved 18% vs the vendor I was talking to earlier.",
    name: "Amit Patel",
    company: "Patel Engineering Pvt Ltd",
    role: "Founder",
    location: "Ahmedabad, Gujarat",
    initial: "A",
    color: "bg-blue-800",
    category: "CNC Machines",
  },
  {
    quote:
      "As a manufacturer, the lead quality here is far better than IndiaMART. Buyers come with proper specifications and budgets. Our quote-to-order conversion is 3x better.",
    name: "Suresh Kumar",
    company: "Rajkot Engineering Works",
    role: "Director",
    location: "Rajkot, Gujarat",
    initial: "S",
    color: "bg-green-700",
    category: "Vendor",
  },
  {
    quote:
      "We needed a custom hydraulic power pack for our press line. No other platform let us upload our drawings. Here, 4 vendors quoted with exact specs. Exceptional experience.",
    name: "Rajan Mehta",
    company: "Mehta Industries",
    role: "Plant Head",
    location: "Surat, Gujarat",
    initial: "R",
    color: "bg-orange-500",
    category: "Hydraulic Systems",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby="proof-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5 text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-800 leading-none">{s.value}</p>
              <p className="text-gray-700 text-xs sm:text-sm font-semibold mt-1">{s.label}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Testimonials</p>
          <h2 id="proof-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
            Trusted by Buyers &amp; Manufacturers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <div className={`${t.color} w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.initial}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{t.name}</p>
                  <p className="text-gray-500 text-xs truncate">{t.role}, {t.company}</p>
                  <p className="text-gray-400 text-xs">📍 {t.location}</p>
                </div>
                <span className="ml-auto flex-shrink-0 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full border border-blue-100">
                  {t.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const COMPARISON = [
  {
    feature: "Buyer gets spam calls",
    indiamart: "Yes — sellers call immediately",
    atoz: "No — buyer controls who contacts them",
    atozWin: true,
  },
  {
    feature: "Quote comparison",
    indiamart: "Not available",
    atoz: "Side-by-side comparison dashboard",
    atozWin: true,
  },
  {
    feature: "Custom machinery RFQ",
    indiamart: "Generic inquiry only",
    atoz: "Structured RFQ with file uploads",
    atozWin: true,
  },
  {
    feature: "Vendor verification",
    indiamart: "Self-declared listings",
    atoz: "GST + admin manual verification",
    atozWin: true,
  },
  {
    feature: "Machinery specialization",
    indiamart: "All B2B categories mixed",
    atoz: "Industrial machinery only — deeper search",
    atozWin: true,
  },
  {
    feature: "Response tracking",
    indiamart: "No structured tracking",
    atoz: "Full RFQ lifecycle in dashboard",
    atozWin: true,
  },
];

const ADVANTAGES = [
  {
    icon: "🔇",
    title: "No Spam Calls",
    desc: "Unlike IndiaMART, buyers control who gets their contact. You reveal details only when you're interested in a quote.",
  },
  {
    icon: "⚖️",
    title: "Compare Quotes Side-by-Side",
    desc: "See all vendor quotes in one dashboard — price, lead time, terms — and choose the best fit without confusion.",
  },
  {
    icon: "📐",
    title: "Custom Machinery RFQ",
    desc: "Upload drawings, PDFs, and technical specs. Get quotes for custom-built machines — not just standard catalog items.",
  },
  {
    icon: "🏅",
    title: "GST-Verified Manufacturers",
    desc: "Every vendor undergoes admin verification with GST, certificates, and company credentials before going live.",
  },
  {
    icon: "🎯",
    title: "Machinery-Only Focus",
    desc: "Not mixed with stationery or FMCG. Deep category intelligence for industrial equipment — better matching for buyers and vendors.",
  },
  {
    icon: "📊",
    title: "Full RFQ Lifecycle",
    desc: "Track every RFQ from submission to quote acceptance. Know exactly where each requirement stands at all times.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Why A TO Z Machines?</p>
          <h2 id="why-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Better Than IndiaMART for Industrial Machinery
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            We built specifically for machinery buyers and manufacturers — not a generic directory where you&apos;re one listing among millions.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ADVANTAGES.map((a) => (
            <div key={a.title} className="card-hover flex gap-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl p-5 transition-colors">
              <div className="text-2xl leading-none flex-shrink-0 mt-0.5">{a.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{a.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-bold text-center border-b border-gray-200">
            <div className="py-3 px-4 text-left text-gray-600 bg-gray-100">Feature</div>
            <div className="py-3 px-4 text-gray-500 bg-gray-100 border-x border-gray-200">IndiaMART</div>
            <div className="py-3 px-4 text-blue-800 bg-blue-50">A TO Z Machines</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 text-xs border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "" : "bg-white"}`}
            >
              <div className="py-3 px-4 text-gray-700 font-medium self-center">{row.feature}</div>
              <div className="py-3 px-4 text-center text-gray-500 border-x border-gray-100 self-center">{row.indiamart}</div>
              <div className={`py-3 px-4 text-center font-semibold self-center ${row.atozWin ? "text-green-700" : "text-gray-500"}`}>
                {row.atozWin && <span className="text-green-500 mr-1">✓</span>}
                {row.atoz}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

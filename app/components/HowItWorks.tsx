import Link from "next/link";

const BUYER_STEPS = [
  {
    step: "01",
    icon: "📋",
    title: "Post Your Requirement",
    desc: "Describe the machine you need — type, quantity, specs, budget, and delivery location. Upload drawings or PDFs if available. Takes less than 3 minutes.",
    color: "bg-blue-800",
    badge: "3 min",
  },
  {
    step: "02",
    icon: "🎯",
    title: "Get Matched to Vendors",
    desc: "Our system matches your RFQ to verified manufacturers in the right category. Up to 15 vendors review your requirement and prepare quotes.",
    color: "bg-orange-500",
    badge: "Auto-matched",
  },
  {
    step: "03",
    icon: "📊",
    title: "Compare & Connect",
    desc: "Receive multiple quotes in your dashboard. Compare price, lead time, and vendor profile side by side. Shortlist and connect with your chosen vendor.",
    color: "bg-green-600",
    badge: "Within 24hrs",
  },
];

const VENDOR_STEPS = [
  { icon: "🏭", title: "Register & Get Approved", desc: "Create your vendor profile with GST details, certifications, and capabilities. Admin-verified within 24 hrs." },
  { icon: "📦", title: "List Your Machines", desc: "Upload your machine catalog with specs, pricing, and lead times. Listings go live after quick moderation." },
  { icon: "💰", title: "Receive Qualified Leads", desc: "Get notified about RFQs matching your category. Submit competitive quotes and win orders." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-14 sm:py-16" aria-labelledby="hiw-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Simple Process</p>
          <h2 id="hiw-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Source Any Industrial Machine in 3 Steps
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            No spam calls. No middlemen. Direct connection between buyer and verified manufacturer.
          </p>
        </div>

        {/* Buyer Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden sm:block absolute top-10 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-green-200" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
            {BUYER_STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative">
                {/* Step badge */}
                <div className={`${s.color} text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
                  {s.step}
                </div>
                <div className="absolute top-4 right-4 bg-gray-50 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-200">
                  {s.badge}
                </div>
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/post-rfq"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl inline-block transition-colors shadow"
          >
            Post Your First RFQ — It&apos;s Free
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">For Vendors</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Vendor Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {VENDOR_STEPS.map((s, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all">
              <div className="text-2xl leading-none flex-shrink-0 mt-0.5">{s.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{i + 1}</span>
                  <h4 className="font-bold text-gray-900 text-sm">{s.title}</h4>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/vendor/register" className="text-blue-800 text-sm font-semibold hover:underline">
            Register as Vendor — Free during Beta →
          </Link>
        </div>
      </div>
    </section>
  );
}

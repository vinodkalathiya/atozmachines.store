import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-white py-12 sm:py-14" aria-label="Call to action">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative">
            <p className="text-orange-100 text-xs font-bold tracking-widest uppercase mb-3">Get Started Today</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
              Ready to Source Industrial Machinery?
            </h2>
            <p className="text-orange-100 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Join 2,000+ verified vendors and 5,000+ buyers on India&apos;s specialized industrial machinery marketplace.
              Post your first RFQ free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/post-rfq"
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow text-sm"
              >
                📋 Post Your Requirement — Free
              </Link>
              <Link
                href="/vendor/register"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
              >
                🏭 Register as Vendor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

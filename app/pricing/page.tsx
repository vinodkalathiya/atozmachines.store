import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    tag: "Forever free",
    color: "border-gray-200",
    btn: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    features: ["5 leads/month", "1 machine listing", "Basic vendor profile", "Email support"],
    notIncluded: ["Priority matching", "Featured listing", "Verified badge"],
  },
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    tag: "Best for growing vendors",
    color: "border-blue-300",
    btn: "bg-blue-800 text-white hover:bg-blue-900",
    highlight: true,
    features: ["20 leads/month", "5 machine listings", "Enhanced vendor profile", "Category search visibility", "Email + Phone support"],
    notIncluded: ["Priority matching", "Verified badge"],
  },
  {
    name: "Growth",
    price: "₹2,499",
    period: "/month",
    tag: "For established manufacturers",
    color: "border-orange-300",
    btn: "bg-orange-500 text-white hover:bg-orange-600",
    features: ["60 leads/month", "15 machine listings", "Priority placement in search", "Featured vendor badge", "Dedicated account manager", "All support channels"],
    notIncluded: [],
  },
  {
    name: "Pro",
    price: "₹5,999",
    period: "/month",
    tag: "For large manufacturers",
    color: "border-purple-300",
    btn: "bg-purple-700 text-white hover:bg-purple-800",
    features: ["Unlimited leads", "Unlimited listings", "Top priority matching", "Verified vendor badge", "Analytics dashboard", "Custom company showcase", "Dedicated account manager"],
    notIncluded: [],
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple, Transparent Pricing</h1>
            <p className="text-gray-500">Start free — upgrade when you need more leads and visibility</p>
            <div className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full inline-block mt-3">
              🎉 All plans free during beta — upgrade after launch
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl border-2 ${plan.color} p-6 flex flex-col ${plan.highlight ? "shadow-lg" : ""}`}>
                {plan.highlight && (
                  <div className="bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full text-center mb-3 -mt-2 self-start">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-lg mb-0.5">{plan.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{plan.tag}</p>
                <div className="mb-5">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded?.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-gray-300 font-bold flex-shrink-0 mt-0.5">✕</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/vendor/register"
                  className={`block text-center font-bold py-3 rounded-xl text-sm transition-colors ${plan.btn}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Buyer pricing */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">For Buyers — Always Free</h2>
            <p className="text-gray-500 text-sm mb-4">Post unlimited RFQs, receive quotes, and compare vendors at no cost.</p>
            <Link href="/register" className="bg-blue-800 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors inline-block text-sm">
              Register as Buyer — Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

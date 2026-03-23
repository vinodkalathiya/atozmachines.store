const STATS = [
  { value: "2,000+", label: "Verified Vendors" },
  { value: "10,000+", label: "Machine Listings" },
  { value: "5,000+", label: "RFQs Processed" },
  { value: "24 hrs", label: "Avg Response Time" },
  { value: "50+", label: "Machine Categories" },
  { value: "18 States", label: "Pan-India Coverage" },
  { value: "98%", label: "Buyer Satisfaction" },
  { value: "₹0", label: "Cost for Buyers" },
];

export default function StatsTicker() {
  const doubled = [...STATS, ...STATS];
  return (
    <div className="bg-blue-900 border-y border-blue-800 py-3 overflow-hidden" aria-hidden="true">
      <div className="ticker-track inline-flex gap-0">
        {doubled.map((s, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-8 border-r border-blue-700/50 last:border-0 flex-shrink-0"
          >
            <span className="text-orange-400 font-bold text-sm">{s.value}</span>
            <span className="text-blue-300 text-xs">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";

const INDUSTRIES = [
  {
    icon: "🚗",
    name: "Automotive",
    desc: "CNC machining centers, press machines, welding equipment, and material handling for auto part manufacturing.",
    tags: ["CNC Machines", "Press Machines", "Welding Equipment"],
    slug: "cnc-machines",
  },
  {
    icon: "💊",
    name: "Pharmaceuticals",
    desc: "Packaging machines, tablet press, blister packing, and clean-room-compatible conveyors for pharma units.",
    tags: ["Packaging Machines", "Conveyor Systems", "Testing Equipment"],
    slug: "packaging-machines",
  },
  {
    icon: "🍪",
    name: "Food & FMCG",
    desc: "Food-grade packaging lines, weighing systems, shrink wrap machines, and conveyor systems for FMCG.",
    tags: ["Packaging Machines", "Conveyor Systems", "Material Handling"],
    slug: "packaging-machines",
  },
  {
    icon: "⚙️",
    name: "General Engineering",
    desc: "Lathe machines, VMC, milling, grinding machines for job shops and precision component manufacturers.",
    tags: ["Lathe Machines", "CNC Machines", "Sheet Metal"],
    slug: "lathe-machines",
  },
  {
    icon: "🏗️",
    name: "Infrastructure",
    desc: "Material handling equipment, compressors, hydraulic systems for construction and infrastructure projects.",
    tags: ["Material Handling", "Compressors", "Hydraulic Systems"],
    slug: "material-handling",
  },
  {
    icon: "🔋",
    name: "Energy & Power",
    desc: "Industrial compressors, hydraulic power packs, testing equipment for power and energy sector.",
    tags: ["Compressors", "Hydraulic Systems", "Testing Equipment"],
    slug: "compressors",
  },
];

export default function Industries() {
  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby="industries-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Industries We Serve</p>
          <h2 id="industries-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Industrial Machinery for Every Sector
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            From automotive to pharma to FMCG — find the right machinery manufacturer for your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.name}
              href={`/category/${ind.slug}`}
              className="card-hover group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl p-5 block transition-colors"
              title={`Industrial machines for ${ind.name} sector`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                  {ind.icon}
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-800 transition-colors">{ind.name}</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{ind.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {ind.tags.map((tag) => (
                  <span key={tag} className="bg-white text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

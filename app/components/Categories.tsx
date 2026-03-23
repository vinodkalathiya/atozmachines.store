import Link from "next/link";
import { CATEGORIES } from "@/app/lib/data";

export default function Categories() {
  return (
    <section id="categories" className="bg-white py-14 sm:py-16" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Browse by Category</p>
          <h2 id="categories-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            50+ Industrial Machine Categories
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            From CNC machining to packaging lines — find verified manufacturers for every type of industrial equipment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="card-hover group bg-white rounded-xl border border-gray-200 p-3 sm:p-4 flex flex-col items-center text-center hover:border-blue-400 hover:bg-blue-50/30"
              title={`Browse ${cat.name} from verified manufacturers`}
            >
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-2.5 transition-colors flex-shrink-0">
                <span className="text-2xl leading-none" role="img" aria-label={cat.name}>{cat.icon}</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-800 leading-tight mb-1 transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.count}+ listings</span>
            </Link>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Don&apos;t see your category?{" "}
            <Link href="/post-rfq" className="text-blue-800 font-semibold hover:underline">
              Post a custom RFQ →
            </Link>
          </p>
          <Link
            href="/categories"
            className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            View All 50+ Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}

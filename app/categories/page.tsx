import Link from "next/link";
import { CATEGORIES } from "@/app/lib/data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Machine Categories</h1>
            <p className="text-gray-500 mt-1">Browse {CATEGORIES.length}+ industrial machine categories from verified Indian manufacturers</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center hover:border-blue-400 hover:shadow-md transition-all group">
                <span className="text-4xl mb-3 leading-none">{cat.icon}</span>
                <h2 className="font-bold text-gray-900 text-sm group-hover:text-blue-800 mb-1">{cat.name}</h2>
                <p className="text-gray-400 text-xs">{cat.count}+ listings</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 bg-blue-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Can&apos;t find what you need?</h2>
            <p className="text-blue-200 text-sm mb-4">Post a custom requirement and let verified vendors come to you.</p>
            <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl inline-block transition-colors">
              Post Your Requirement — Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

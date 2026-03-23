"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/app/lib/data";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (category) {
      router.push(`/category/${category}`);
    } else if (query.trim()) {
      router.push(`/categories?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/categories");
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto w-full"
      role="search"
      aria-label="Search industrial machinery"
    >
      {/* Category select */}
      <div className="flex-shrink-0 sm:w-48">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-full border-0 rounded-xl bg-gray-50 px-3 py-3 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label="Select machine category"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px bg-gray-200 self-stretch" />

      {/* Text input */}
      <div className="flex-1 flex items-center gap-2 px-3">
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search "CNC machine", "packaging", "hydraulic press"...'
          className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
          aria-label="Search machinery"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap text-sm shadow-sm"
        aria-label="Search"
      >
        Search Machines
      </button>
    </form>
  );
}

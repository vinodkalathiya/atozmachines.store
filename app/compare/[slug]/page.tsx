import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/app/lib/data";
import { COMPARISONS, getComparisonBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) return {};

  return {
    title: `${comp.title} | A TO Z Machines`,
    description: `${comp.shortDesc} Detailed comparison to help you make the right purchase decision.`,
    keywords: `${comp.machineA} vs ${comp.machineB}, ${comp.machineA.toLowerCase()} ${comp.machineB.toLowerCase()} comparison India, which is better ${comp.machineA.toLowerCase()} or ${comp.machineB.toLowerCase()}`,
    alternates: { canonical: `https://atozmachines.store/compare/${slug}` },
  };
}

function renderContent(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      nodes.push(<h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      nodes.push(<h3 key={i} className="text-base font-bold text-gray-900 mt-5 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      nodes.push(
        <ul key={i} className="list-disc pl-5 space-y-1 mb-4">
          {items.map((item, j) => (
            <li key={j} className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].match(/^\|[-\s|]+\|$/)) tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length > 0) {
        const headers = tableLines[0].split("|").filter(Boolean).map((h) => h.trim());
        const rows = tableLines.slice(1).map((row) => row.split("|").filter(Boolean).map((c) => c.trim()));
        nodes.push(
          <div key={i} className="overflow-x-auto mb-6">
            <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>{headers.map((h, j) => <th key={j} className="text-left p-3 font-semibold text-gray-700">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-gray-50">
                    {row.map((cell, ci) => <td key={ci} className="p-3 text-gray-600">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    } else if (line.trim() !== "") {
      const html = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      nodes.push(<p key={i} className="text-gray-600 text-sm leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: html }} />);
    }

    i++;
  }

  return nodes;
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) notFound();

  const catA = CATEGORIES.find((c) => c.slug === comp.categoryA);
  const catB = CATEGORIES.find((c) => c.slug === comp.categoryB);
  const otherComps = COMPARISONS.filter((c) => c.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comp.title,
    description: comp.shortDesc,
    url: `https://atozmachines.store/compare/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "A TO Z Machines",
      url: "https://atozmachines.store",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <span>/</span>
            <span>Compare</span>
            <span>/</span>
            <span className="text-gray-900">{comp.machineA} vs {comp.machineB}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Vs Header */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-5 gap-4 items-center text-center">
                  <div className="col-span-2">
                    {catA && <span className="text-3xl block mb-2">{catA.icon}</span>}
                    <h2 className="font-bold text-gray-900 text-sm">{comp.machineA}</h2>
                    {catA && (
                      <Link href={`/manufacturers/${comp.categoryA}`} className="text-xs text-blue-700 hover:underline">
                        View suppliers →
                      </Link>
                    )}
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="text-2xl font-bold text-gray-300">VS</span>
                  </div>
                  <div className="col-span-2">
                    {catB && <span className="text-3xl block mb-2">{catB.icon}</span>}
                    <h2 className="font-bold text-gray-900 text-sm">{comp.machineB}</h2>
                    {catB && (
                      <Link href={`/manufacturers/${comp.categoryB}`} className="text-xs text-blue-700 hover:underline">
                        View suppliers →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Article */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{comp.title}</h1>
                <p className="text-gray-500 text-sm italic mb-6 pb-6 border-b border-gray-100">{comp.shortDesc}</p>
                <div>{renderContent(comp.content)}</div>
              </div>

              {/* CTA Banner */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900">Need quotes for {comp.machineA} or {comp.machineB}?</h3>
                  <p className="text-gray-500 text-sm mt-0.5">Post your requirement and get multiple quotes from verified manufacturers.</p>
                </div>
                <Link href="/post-rfq" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap">
                  Post RFQ — Free
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick Links */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">View Suppliers</h3>
                <div className="space-y-2">
                  {catA && (
                    <Link href={`/manufacturers/${comp.categoryA}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1.5 border-b border-gray-50">
                      <span>{catA.icon}</span>
                      <span>{comp.machineA} Suppliers</span>
                    </Link>
                  )}
                  {catB && comp.categoryB !== comp.categoryA && (
                    <Link href={`/manufacturers/${comp.categoryB}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1.5 border-b border-gray-50">
                      <span>{catB.icon}</span>
                      <span>{comp.machineB} Suppliers</span>
                    </Link>
                  )}
                  {catA && (
                    <Link href={`/price-guide/${comp.categoryA}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1.5">
                      <span>💰</span>
                      <span>{comp.machineA} Price Guide</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Other Comparisons */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">More Comparisons</h3>
                <div className="space-y-2">
                  {otherComps.map((c) => (
                    <Link key={c.slug} href={`/compare/${c.slug}`}
                      className="block text-xs text-blue-700 hover:underline py-0.5 border-b border-gray-50">
                      {c.machineA} vs {c.machineB}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Still unsure?</p>
                <p className="text-gray-500 text-xs mb-3">Post your requirement and ask vendors directly which machine suits your application best.</p>
                <Link href="/post-rfq" className="block bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                  Post RFQ — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

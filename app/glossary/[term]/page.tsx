import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/app/lib/data";
import { GLOSSARY_TERMS, getGlossaryTermBySlug } from "@/app/lib/seo-data";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Props {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTermBySlug(term);
  if (!t) return {};

  return {
    title: `${t.term} — Definition & Meaning | Industrial Machinery Glossary | A TO Z Machines`,
    description: `${t.shortDef} Learn what ${t.term} means in industrial procurement and machinery sourcing.`,
    keywords: `${t.term.toLowerCase()} meaning, ${t.term.toLowerCase()} definition, industrial machinery terms, ${t.category.toLowerCase()} terminology`,
    alternates: { canonical: `https://atozmachines.store/glossary/${term}` },
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
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      nodes.push(
        <ol key={i} className="list-decimal pl-5 space-y-1 mb-4">
          {items.map((item, j) => <li key={j} className="text-gray-600 text-sm">{item}</li>)}
        </ol>
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
          <div key={i} className="overflow-x-auto mb-4">
            <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>{headers.map((h, j) => <th key={j} className="text-left p-3 font-semibold text-gray-700">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="p-3 text-gray-600">{cell}</td>)}</tr>)}
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

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params;
  const termData = getGlossaryTermBySlug(term);
  if (!termData) notFound();

  const otherTerms = GLOSSARY_TERMS.filter((t) => t.slug !== term);
  const relatedCats = CATEGORIES.filter((c) => termData.relatedCategories.includes(c.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: termData.term,
    description: termData.shortDef,
    url: `https://atozmachines.store/glossary/${term}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Industrial Machinery Glossary",
      url: "https://atozmachines.store/glossary",
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
            <span>Glossary</span>
            <span>/</span>
            <span className="text-gray-900">{termData.term}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{termData.category}</span>
                <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{termData.term}</h1>
                <p className="text-gray-500 text-sm italic mb-6 pb-6 border-b border-gray-100">{termData.shortDef}</p>
                <div>{renderContent(termData.content)}</div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Related Categories */}
              {relatedCats.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Related Machine Categories</h3>
                  <div className="space-y-2">
                    {relatedCats.map((c) => (
                      <Link key={c.slug} href={`/manufacturers/${c.slug}`}
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-700 py-1 border-b border-gray-50">
                        <span>{c.icon}</span><span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Terms */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Other Glossary Terms</h3>
                <div className="space-y-1.5">
                  {otherTerms.slice(0, 8).map((t) => (
                    <Link key={t.slug} href={`/glossary/${t.slug}`}
                      className="block text-xs text-blue-700 hover:underline py-0.5">
                      {t.term}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">Ready to source machinery?</p>
                <p className="text-gray-500 text-xs mb-3">Post an RFQ and get quotes from verified manufacturers within 24 hours.</p>
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

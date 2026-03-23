import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — A TO Z Machines",
  description: "Terms of Service for A TO Z Machines B2B industrial machinery marketplace. Rules for buyers, vendors, and platform usage.",
  alternates: { canonical: "https://atozmachines.store/terms-of-service" },
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "January 2025";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using A TO Z Machines (atozmachines.store), you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.

These terms apply to all users, including buyers, vendors, and visitors.`,
  },
  {
    title: "2. Platform Description",
    content: `A TO Z Machines is a B2B marketplace that connects industrial machinery buyers with verified manufacturers and suppliers in India. We provide:

- A directory of verified industrial machinery vendors
- An RFQ (Request for Quotation) system for buyers to receive multiple quotes
- Machine listing pages for vendors to showcase their products
- Tools for buyers and vendors to connect and transact

A TO Z Machines is a facilitator — we do not manufacture, sell, or ship machinery. All transactions are directly between buyers and vendors.`,
  },
  {
    title: "3. User Accounts",
    content: `**Registration:** You must register to post RFQs (as a buyer) or list machines (as a vendor). You agree to provide accurate, complete information.

**Account security:** You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately at support@atozmachines.store if you suspect unauthorized access.

**One account per entity:** Each individual or company may maintain one account. Creating multiple accounts to circumvent platform rules is prohibited.`,
  },
  {
    title: "4. Buyer Terms",
    content: `As a buyer on A TO Z Machines, you agree to:

- Post genuine RFQs for real procurement needs — not for market research, competitor intelligence, or spam
- Provide accurate specifications in your RFQ to enable vendors to quote correctly
- Respond promptly to vendor quotes (within 7 days is recommended)
- Not share vendor contact information or quotes with competitors
- Conduct due diligence before finalizing any purchase

A TO Z Machines does not guarantee the accuracy of vendor information or the quality of machines supplied. Buyers are responsible for verifying vendor credentials and machine specifications before purchase.`,
  },
  {
    title: "5. Vendor Terms",
    content: `As a vendor on A TO Z Machines, you agree to:

- Provide accurate, complete, and up-to-date company and machine information
- Hold a valid GST registration (mandatory for listing)
- Respond to RFQs in your category within 24–48 hours where possible
- Provide honest, competitive quotes — not bait-and-switch pricing
- Not post machines you do not manufacture or are not authorized to sell
- Maintain professional conduct with buyers

Vendors who receive consistent negative feedback, fail to respond to RFQs, or violate these terms may have their listings suspended or removed.`,
  },
  {
    title: "6. Prohibited Activities",
    content: `You agree not to:

- Post false, misleading, or fraudulent information
- Spam buyers or vendors with unsolicited communications
- Scrape, copy, or redistribute platform data without permission
- Attempt to circumvent the platform by taking transactions off-platform to avoid fees
- Post listings for illegal products, counterfeit goods, or prohibited items
- Interfere with platform security or functionality
- Create fake reviews, ratings, or vendor profiles`,
  },
  {
    title: "7. Intellectual Property",
    content: `All content on A TO Z Machines — including text, logos, design, and software — is owned by A TO Z Machines or its licensors. You may not copy, reproduce, or distribute platform content without written permission.

Vendors grant A TO Z Machines a non-exclusive license to display their submitted content (company details, machine listings, images) on the platform.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `A TO Z Machines is a marketplace facilitator. We are not responsible for:

- The quality, safety, legality, or accuracy of machines listed by vendors
- Disputes between buyers and vendors
- Losses arising from transactions made through the platform
- Downtime, errors, or data loss

To the maximum extent permitted by law, our total liability shall not exceed the fees paid by you to A TO Z Machines in the 3 months preceding the claim.`,
  },
  {
    title: "9. Dispute Resolution",
    content: `Disputes between buyers and vendors should be resolved directly between the parties. A TO Z Machines may assist in mediation but is not obligated to do so.

Disputes related to A TO Z Machines' services shall be governed by the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of courts in India.`,
  },
  {
    title: "10. Termination",
    content: `We reserve the right to suspend or terminate any account that violates these Terms of Service, at our sole discretion, without prior notice.

You may close your account at any time by contacting support@atozmachines.store.`,
  },
  {
    title: "11. Changes to Terms",
    content: `We may update these Terms of Service. We will notify registered users of significant changes. Continued use of the platform after changes constitutes acceptance of the updated terms.`,
  },
  {
    title: "12. Contact",
    content: `For questions about these Terms, contact:

**A TO Z Machines**
Email: legal@atozmachines.store
Website: https://atozmachines.store`,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-400 text-sm mb-8">Last updated: {LAST_UPDATED}</p>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              These Terms of Service (&quot;Terms&quot;) govern your use of A TO Z Machines and its marketplace services.
              Please read these terms carefully before using our platform.
            </p>

            <div className="space-y-8">
              {SECTIONS.map((section) => (
                <section key={section.title}>
                  <h2 className="text-base font-bold text-gray-900 mb-3">{section.title}</h2>
                  {section.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("- ")) {
                      const items = para.split("\n").filter(l => l.startsWith("- "));
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1 mb-3">
                          {items.map((item, j) => (
                            <li key={j} className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                          ))}
                        </ul>
                      );
                    }
                    const html = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
                    return <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: html }} />;
                  })}
                </section>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Link href="/privacy-policy" className="text-sm text-blue-700 hover:underline">Privacy Policy</Link>
              <Link href="/contact" className="text-sm text-blue-700 hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

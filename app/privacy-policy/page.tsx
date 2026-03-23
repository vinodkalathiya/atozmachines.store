import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — A TO Z Machines",
  description: "Privacy Policy for A TO Z Machines. Learn how we collect, use, and protect your personal data.",
  alternates: { canonical: "https://atozmachines.store/privacy-policy" },
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "January 2025";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, post an RFQ, register as a vendor, or contact us for support.

**Information collected includes:**
- Name, email address, phone number
- Company name, GST number, business address
- Machine requirements and RFQ details
- Usage data and analytics (via cookies and web analytics tools)
- Device and browser information

We do not collect payment card information directly — payments are processed by third-party payment processors.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

- Provide, operate, and improve the A TO Z Machines platform
- Match buyers with relevant verified vendors
- Send RFQ notifications to matched vendors
- Communicate with you about your account, transactions, and platform updates
- Verify vendor GST registration and business legitimacy
- Detect and prevent fraud or misuse
- Comply with legal obligations`,
  },
  {
    title: "3. Information Sharing",
    content: `**We share your information only in the following circumstances:**

- **Between buyers and vendors:** When a buyer posts an RFQ, it is shared with matched vendors. When a buyer shows interest in a quote, contact details may be shared with the relevant vendor.
- **Service providers:** We work with third-party services for email delivery, analytics, and payment processing.
- **Legal compliance:** We may disclose information when required by law, court order, or government authority.
- **Business transfers:** If A TO Z Machines is acquired or merged, your information may be transferred as part of that transaction.

We do not sell your personal information to third parties.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by contacting us at support@atozmachines.store.

RFQ data and transaction records may be retained for up to 3 years for business and legal compliance purposes.`,
  },
  {
    title: "5. Cookies",
    content: `We use cookies and similar technologies to:

- Keep you logged in to your account
- Understand how users interact with our platform (analytics)
- Improve performance and functionality

You can disable cookies in your browser settings, but this may affect platform functionality.`,
  },
  {
    title: "6. Security",
    content: `We implement industry-standard security measures to protect your information, including HTTPS encryption, secure data storage, and access controls.

However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to protecting your data to the best of our ability.`,
  },
  {
    title: "7. Your Rights",
    content: `You have the right to:

- Access the personal information we hold about you
- Correct inaccurate information
- Request deletion of your account and data
- Opt out of marketing communications

To exercise these rights, contact us at support@atozmachines.store.`,
  },
  {
    title: "8. Third-Party Links",
    content: `Our platform may contain links to third-party websites (vendor websites, payment processors). We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies before sharing any information.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify registered users of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `For privacy-related questions or requests, contact:

**A TO Z Machines**
Email: privacy@atozmachines.store
Website: https://atozmachines.store`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-400 text-sm mb-8">Last updated: {LAST_UPDATED}</p>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              A TO Z Machines (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we
              collect, use, and share information when you use our B2B industrial machinery marketplace at{" "}
              <Link href="/" className="text-blue-700 hover:underline">atozmachines.store</Link>.
            </p>

            <div className="space-y-8">
              {SECTIONS.map((section) => (
                <section key={section.title}>
                  <h2 className="text-base font-bold text-gray-900 mb-3">{section.title}</h2>
                  {section.content.split("\n\n").map((para, i) => {
                    const html = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
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
                    return <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: html }} />;
                  })}
                </section>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Link href="/terms-of-service" className="text-sm text-blue-700 hover:underline">Terms of Service</Link>
              <Link href="/contact" className="text-sm text-blue-700 hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is A TO Z Machines and how is it different from IndiaMART?",
    a: "A TO Z Machines is a specialized B2B marketplace exclusively for industrial machinery. Unlike IndiaMART, which lists all products, we focus only on machinery — giving buyers better search results and vendors better-qualified leads. Buyers also don't get spam calls; you control who contacts you through our structured RFQ system.",
  },
  {
    q: "How does the RFQ (Request for Quote) system work?",
    a: "As a buyer, you fill out an RFQ form with your machine requirements, quantity, budget, and delivery location. You can also upload technical drawings or spec sheets. Our system matches your RFQ to relevant verified vendors who then submit detailed quotes. You compare all quotes in one dashboard and only share your contact with vendors you're interested in.",
  },
  {
    q: "Is it free to post a requirement on A TO Z Machines?",
    a: "Yes, posting an RFQ is completely free for buyers. You can post unlimited requirements, receive multiple quotes, and compare vendors at no cost. We're also free during our beta phase.",
  },
  {
    q: "How are vendors verified on your platform?",
    a: "Every vendor goes through a manual verification process before going live. We verify their GST number, company registration, contact details, and manufacturing capabilities. Admin approval is required before a vendor profile or listing becomes visible to buyers.",
  },
  {
    q: "How quickly will I receive quotes after posting an RFQ?",
    a: "Most buyers receive their first quote within 4–8 hours. We target a 24-hour response window for all RFQs. You'll get email notifications as each vendor submits a quote.",
  },
  {
    q: "Can I post an RFQ for custom-built machinery?",
    a: "Absolutely. Our RFQ system is designed for custom machinery requests. You can describe your exact specifications, upload CAD drawings, PDFs, or reference images. This is one of our key advantages over generic B2B platforms.",
  },
  {
    q: "How do I register as a vendor/manufacturer?",
    a: "Click 'Get Listed' and fill out the 2-step registration form with your company details, machine categories, and GST information. After submission, our admin team reviews and approves your profile within 24 business hours.",
  },
  {
    q: "What types of industrial machines are listed on A TO Z Machines?",
    a: "We cover 50+ industrial machine categories including CNC Machines, Packaging Machines, Material Handling Equipment, Hydraulic Systems, Lathe Machines, Welding Equipment, Sheet Metal Machines, Compressors, Press Machines, Conveyor Systems, Water Treatment Equipment, and Testing Equipment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-14 sm:py-16" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">FAQs</p>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm">
            Everything you need to know about buying and selling industrial machinery on A TO Z Machines.
          </p>
        </div>

        <div className="space-y-2" role="list">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              role="listitem"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 text-sm" itemProp="name">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div
                  className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text" className="pt-3">{faq.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

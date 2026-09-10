'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Accordion from '@/components/ui/Accordion';
import { faqsData } from '@/data/faqsData';
import { companyData } from '@/data/companyData';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqsData.map((f) => f.category)));
    return ['All', ...cats];
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const accordionItems = filteredFaqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
    category: faq.category,
  }));

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Insights', href: '/insights' },
          { label: 'Buyer FAQ', href: '/insights/faq' },
        ]}
      />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Commercial Clarifications"
          title="Frequently Asked Questions"
          description="Find clear answers to key B2B procurement questions regarding Psyllium Husk purity grades, particle sizing, sample dispatches, MOQs, testing documentation, and export logistics."
          align="left"
        />

        {/* Search & Filter Controls */}
        <div className="space-y-4 pt-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. sample, purity, MOQ, mesh, COA)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest shadow-2xs"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-forest text-ivory'
                    : 'bg-white border border-cream-dark text-charcoal hover:bg-cream/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="pt-8">
          {accordionItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-cream-dark">
              <HelpCircle className="w-8 h-8 text-sage mx-auto mb-2" />
              <h3 className="font-editorial text-lg font-bold text-forest">No questions match your query</h3>
              <p className="text-xs text-charcoal-muted mt-1">
                Try searching with different terms or contact our export desk directly.
              </p>
            </div>
          ) : (
            <Accordion items={accordionItems} allowMultiple={false} />
          )}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-10 text-center space-y-4">
          <h3 className="font-editorial text-2xl font-bold text-forest">
            Have a Specific Commercial or Technical Question?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto">
            Divyanshu Patel and Neel Patel in Surat are available via WhatsApp and email to review custom specifications and provide prompt answers.
          </p>
          <div className="pt-2 flex items-center justify-center">
            <Link
              href="/contact#rfq"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-sm"
            >
              <span>SUBMIT ENQUIRY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Export Desk Contacts */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
            {companyData.contacts.map((contact) => (
              <div key={contact.phone} className="p-3 rounded-xl bg-white border border-cream-dark shadow-xs space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-forest">{contact.name}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <a href={`tel:${contact.phone}`} className="font-semibold text-charcoal hover:text-forest whitespace-nowrap">
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest bg-sage-light hover:bg-sage px-2 py-0.5 rounded transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-charcoal-muted">
            <span>Sales: <a href={`mailto:${companyData.salesEmail}`} className="font-medium text-forest hover:underline">{companyData.salesEmail}</a></span>
            <span>&bull;</span>
            <span>Admin: <a href={`mailto:${companyData.adminEmail}`} className="font-medium text-forest hover:underline">{companyData.adminEmail}</a></span>
            <span>&bull;</span>
            <span>Info: <a href={`mailto:${companyData.infoEmail}`} className="font-medium text-forest hover:underline">{companyData.infoEmail}</a></span>
          </div>
        </div>
      </section>
    </div>
  );
}

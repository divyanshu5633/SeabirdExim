import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  Calendar, 
  Clock 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { articlesData } from '@/data/articlesData';
import { faqsData } from '@/data/faqsData';

export const metadata: Metadata = {
  title: 'Insights & Buyer Resources | Psyllium Husk Export Knowledge',
  description:
    'Comprehensive procurement guides, technical specifications, purity comparisons, and FAQs for international buyers importing Psyllium Husk from India.',
};

export default function InsightsPage() {
  const featuredArticles = articlesData.slice(0, 3);
  const featuredFaqs = faqsData.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Knowledge &amp; Intelligence"
          title="Insights &amp; Buyer Resources"
          description="Technical white papers, procurement checklists, and answers to common B2B export questions to help international procurement teams make specification-first decisions."
          align="left"
        />

        {/* 3 Quick Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Link
            href="/insights/blog"
            className="bg-white rounded-3xl border border-cream-dark p-8 shadow-xs hover:border-sage hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sage-light text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-ivory transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-forest mb-2">
              Technical Blog
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
              In-depth procurement guides comparing purity grades, whole husk vs powder milling, and container ocean freight packaging.
            </p>
            <span className="text-xs font-semibold text-forest group-hover:underline flex items-center gap-1">
              <span>Read Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/insights/faq"
            className="bg-white rounded-3xl border border-cream-dark p-8 shadow-xs hover:border-sage hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sage-light text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-ivory transition-colors">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-forest mb-2">
              Buyer FAQ
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
              Clear answers regarding MOQs, payment terms, sample dispatches, COA parameters, and Indian export procedures.
            </p>
            <span className="text-xs font-semibold text-forest group-hover:underline flex items-center gap-1">
              <span>Explore FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/company/certifications"
            className="bg-white rounded-3xl border border-cream-dark p-8 shadow-xs hover:border-sage hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sage-light text-forest flex items-center justify-center mb-4 group-hover:bg-forest group-hover:text-ivory transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-forest mb-2">
              Quality &amp; Testing
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
              Analytical laboratory parameters, microbiological thresholds, heavy metal screening, and export documentation standards.
            </p>
            <span className="text-xs font-semibold text-forest group-hover:underline flex items-center gap-1">
              <span>View Testing Standards</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-sage-dark block mb-1">
              Featured Analysis
            </span>
            <h2 className="font-editorial text-3xl font-bold text-forest">
              Latest Technical Guides
            </h2>
          </div>
          <Link
            href="/insights/blog"
            className="text-xs font-semibold text-forest hover:text-forest-dark flex items-center gap-1"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs flex flex-col justify-between group hover:border-sage transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-charcoal-muted">
                  <span className="px-2 py-0.5 rounded bg-sage-light text-forest font-semibold uppercase tracking-wider">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sage" />
                    <span>{art.readingTime}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-forest group-hover:text-forest-dark transition-colors leading-snug">
                  <Link href={`/insights/blog/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-charcoal-muted">
                  <Calendar className="w-3 h-3 text-sage" />
                  <span>{art.date}</span>
                </div>
                <Link
                  href={`/insights/blog/${art.slug}`}
                  className="font-semibold text-forest group-hover:underline flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Preview Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-sage-dark block mb-1">
                Frequently Asked
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                Commercial Procurement FAQ
              </h2>
            </div>
            <Link
              href="/insights/faq"
              className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-dark bg-white px-4 py-2 rounded-xl border border-cream-dark"
            >
              <span>View All 15+ Questions</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white p-5 rounded-xl border border-cream-dark space-y-2"
              >
                <div className="text-[10px] font-bold uppercase text-sage-dark tracking-wider">
                  {faq.category}
                </div>
                <h3 className="font-editorial text-base font-bold text-forest">
                  {faq.question}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

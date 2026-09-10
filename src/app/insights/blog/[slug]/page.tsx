import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { articlesData } from '@/data/articlesData';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | Seabird EXIM',
    };
  }

  return {
    title: `${article.title} | Seabird EXIM`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.date,
      authors: ['Seabird EXIM Export Desk'],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articlesData.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: 'Seabird EXIM',
      url: 'https://seabirdexim.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Seabird EXIM',
      logo: {
        '@type': 'ImageObject',
        url: 'https://seabirdexim.com/images/psyllium_husk_hero.jpg',
      },
    },
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Insights', href: '/insights' },
          { label: 'Blog', href: '/insights/blog' },
          { label: article.title, href: `/insights/blog/${article.slug}` },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="space-y-6 pb-8 border-b border-cream-dark">
          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-muted">
            <span className="px-3 py-1 rounded-full bg-sage-light text-forest font-semibold uppercase tracking-wider text-[11px]">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sage" />
              <span>Published: {article.date}</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sage" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal font-medium leading-relaxed bg-cream/40 p-5 sm:p-6 rounded-2xl border border-cream-dark">
            {article.summary}
          </p>
        </header>

        {/* Article Body */}
        <div className="py-10 space-y-10 text-charcoal text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg text-charcoal leading-relaxed font-editorial italic">
            {article.content.intro}
          </p>

          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                {section.heading}
              </h2>

              <div className="space-y-4 text-charcoal-muted">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {section.keyTakeaway && (
                <div className="p-4 rounded-xl bg-sage-light/30 border border-sage/40 text-xs sm:text-sm text-forest font-medium flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[10px] block text-sage-dark mb-0.5">
                      Key Takeaway
                    </span>
                    {section.keyTakeaway}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="pt-6 border-t border-cream space-y-3">
            <h3 className="font-editorial text-xl font-bold text-forest">
              Procurement Summary
            </h3>
            <p className="text-charcoal-muted">{article.content.conclusion}</p>
          </div>
        </div>

        {/* In-Article Conversion Card */}
        <div className="bg-forest text-ivory rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-4">
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
            Consult Our Sourcing Desk on This Topic
          </h3>
          <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto">
            Have questions about grade selection, swell volume verification, or export packaging? Connect directly with our trade team in Surat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact#rfq"
              className="px-8 py-3.5 rounded-xl bg-ivory text-forest font-semibold text-xs sm:text-sm hover:bg-white transition-colors"
            >
              REQUEST A QUOTE
            </Link>
            <Link
              href="/insights/blog"
              className="px-6 py-3.5 rounded-xl border border-sage/40 text-ivory font-semibold text-xs sm:text-sm hover:bg-forest-soft transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-16 border-t border-cream-dark mt-16 space-y-6">
            <h3 className="font-editorial text-2xl font-bold text-forest">
              Related Buyer Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs flex flex-col justify-between hover:border-sage transition-colors"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sage-dark">
                      {rel.category}
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-forest">
                      <Link href={`/insights/blog/${rel.slug}`} className="hover:underline">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-charcoal-muted line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-cream">
                    <Link
                      href={`/insights/blog/${rel.slug}`}
                      className="text-xs font-semibold text-forest hover:text-forest-dark flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

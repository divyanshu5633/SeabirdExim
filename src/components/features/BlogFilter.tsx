'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { articlesData } from '@/data/articlesData';

export default function BlogFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(articlesData.map((a) => a.category)));
    return ['All', ...cats];
  }, []);

  const filteredArticles = useMemo(() => {
    return articlesData.filter((art) => {
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-cream-dark shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guides by keyword (e.g. purity, mesh, export, testing)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-dark text-xs sm:text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-forest focus:ring-1 focus:ring-forest"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-forest text-ivory'
                  : 'bg-cream/40 text-charcoal hover:bg-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-cream-dark p-8">
          <BookOpen className="w-10 h-10 text-sage mx-auto mb-3" />
          <h3 className="font-editorial text-xl font-bold text-forest">No articles found</h3>
          <p className="text-xs text-charcoal-muted mt-1">
            Try adjusting your search keywords or clearing the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-forest text-ivory text-xs font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs hover:shadow-md hover:border-sage transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-charcoal-muted">
                  <span className="px-2 py-0.5 rounded bg-sage-light text-forest font-semibold uppercase tracking-wider text-[10px]">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sage-dark" />
                    <span>{art.readingTime}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-forest group-hover:text-forest-dark transition-colors leading-snug">
                  <Link href={`/insights/blog/${art.slug}`} className="hover:underline">
                    {art.title}
                  </Link>
                </h3>

                <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-cream flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-charcoal-muted text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-sage" />
                  <span>{art.date}</span>
                </div>

                <Link
                  href={`/insights/blog/${art.slug}`}
                  className="font-semibold text-forest group-hover:text-forest-dark flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

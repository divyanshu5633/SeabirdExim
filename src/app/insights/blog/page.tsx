import React from 'react';
import { Metadata } from 'next';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BlogFilter from '@/components/features/BlogFilter';

export const metadata: Metadata = {
  title: 'Technical Blog & Buyer Guides | Psyllium Sourcing Intelligence',
  description:
    'Technical articles, procurement checklists, and specification guides for overseas importers procuring Psyllium Husk and agricultural commodities from India.',
};

export default function BlogIndexPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Insights', href: '/insights' },
          { label: 'Technical Blog', href: '/insights/blog' },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Export Intelligence"
          title="Technical Blog &amp; Procurement Guides"
          description="In-depth analysis written for international buyers, food scientists, and procurement managers evaluating Indian Psyllium Husk specifications, packaging, and regulatory requirements."
          align="left"
        />

        <div className="pt-4">
          <BlogFilter />
        </div>
      </section>
    </div>
  );
}

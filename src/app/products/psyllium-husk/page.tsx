import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  Leaf, 
  CheckCircle2, 
  FileCheck, 
  Package 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import PurityGradeCards from '@/components/features/PurityGradeCards';
import SpecTable from '@/components/features/SpecTable';
import Accordion from '@/components/ui/Accordion';
import { faqsData } from '@/data/faqsData';

export const metadata: Metadata = {
  title: 'Psyllium Husk Exporter from India | Plantago Ovata Supply',
  description:
    'Specification-focused Psyllium Husk (Plantago ovata) export from India. 85% to 99% purity grades for food, nutraceutical, and pharmaceutical formulations. Standard 25 KG Export Bags.',
};

export default function PsylliumHuskPage() {
  const productFaqs = faqsData.filter((f) => 
    ['Product', 'Purity', 'Mesh & Sizing', 'Packaging', 'Samples', 'Documentation'].includes(f.category)
  ).map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer,
    category: f.category,
  }));

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: 'Psyllium Husk', href: '/products/psyllium-husk' },
        ]}
      />

      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 text-xs font-semibold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Plantago ovata &bull; India Origin</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                PSYLLIUM HUSK
              </h1>
              <div className="text-xl sm:text-2xl text-charcoal font-editorial italic">
                Bulk Export from India
              </div>
              <p className="text-base text-charcoal-muted max-w-xl leading-relaxed">
                Specification-focused Psyllium Husk for food, nutraceutical, and pharmaceutical applications. Meticulously cleaned, aspirated, and graded according to your confirmed purity thresholds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/contact?product=Psyllium+Husk#rfq"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact?product=Psyllium+Husk&message=Sample+Evaluation+Request#rfq"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm font-semibold hover:bg-cream/40 transition-colors"
              >
                <span>REQUEST A SAMPLE</span>
              </Link>
            </div>

            {/* Quick Specs Strip */}
            <div className="pt-6 border-t border-cream-dark/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-charcoal-muted uppercase text-[10px] font-bold block">Purity Grades</span>
                <span className="font-semibold text-forest">85% to 99%</span>
              </div>
              <div>
                <span className="text-charcoal-muted uppercase text-[10px] font-bold block">Standard Form</span>
                <span className="font-semibold text-charcoal">Whole Husk</span>
              </div>
              <div>
                <span className="text-charcoal-muted uppercase text-[10px] font-bold block">Packaging</span>
                <span className="font-semibold text-charcoal text-xs">25 KG Export Bags</span>
              </div>
              <div>
                <span className="text-charcoal-muted uppercase text-[10px] font-bold block">Origin</span>
                <span className="font-semibold text-charcoal">Gujarat, India</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-cream-dark shadow-xl bg-cream/30 shimmer-sweep">
              <Image
                src="/images/psyllium_cleaning_process.jpg"
                alt="Psyllium Husk sortex aspiration and pneumatic cleaning line"
                fill
                priority
                className="object-cover object-center img-hover-zoom"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest text-ivory text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Cleaned Botanical Flakes
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-charcoal-muted italic">
              All visual representation reflects natural Plantago ovata botanical flakes.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Specifications & Comparative Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical Thresholds"
          title="Purity Grades &amp; Lab Parameters"
          description="Psyllium Husk is graded primarily by purity percentage, directly governing swell volume and lightness. Review typical commercial export thresholds below."
        />

        <SpecTable />
      </section>

      {/* 3. Detailed Purity Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Commercial Positioning"
          title="Selecting the Right Grade"
          description="Explore the application focus of each purity grade from economical 85% bulk up to ultra-refined 99% pharmaceutical quality."
        />

        <PurityGradeCards compact={false} />
      </section>

      {/* 4. Swell Volume & Purity Dynamics with Visual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-cream-dark p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-hover">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
              Mucilage &amp; Swell Dynamics
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
              Whole Husk Purity &amp; Swell Capacity
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Psyllium Husk is valued across international markets for its pure botanical origin and high swell volume. Sourced as whole flakes from Gujarat, India, every batch is graded from 85% to 99% purity to match your exact viscosity, clarity, and dietary fiber targets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-cream/30 border border-cream-dark space-y-1">
                <div className="font-bold text-forest text-sm">Commercial Grades (85% &ndash; 95%)</div>
                <p className="text-charcoal-muted leading-relaxed">
                  Robust whole husk flakes delivering strong moisture binding (≥ 35 to ≥ 40 ml/g) for bakery blends, cereals, and industrial fiber formulations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cream/30 border border-cream-dark space-y-1">
                <div className="font-bold text-forest text-sm">Ultra-Pure Grades (98% &ndash; 99%)</div>
                <p className="text-charcoal-muted leading-relaxed">
                  Pristine ivory botanical flakes delivering maximum swell volume (≥ 50 to ≥ 60 ml/g) for pharmaceutical OTC and premium dietary supplements.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-cream/40 rounded-2xl p-6 border border-cream-dark space-y-4">
            <h3 className="font-editorial text-lg font-bold text-forest">
              Batch Specification Review
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Have specific testing protocols, swell volume benchmarks, or heavy metal limits? Our export desk provides batch-specific Certificate of Analysis documentation tailored to your import criteria.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?product=Psyllium+Husk&message=Discuss+Purity+and+Specification+Requirements#rfq"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
              >
                <span>Discuss Specification Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-hover">
          <div className="lg:col-span-6 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-cream/40 border border-cream-dark text-center space-y-2 card-hover">
                <div className="w-10 h-10 mx-auto rounded-xl bg-forest text-ivory font-bold text-xs flex items-center justify-center shadow-xs">
                  85–95%
                </div>
                <div className="font-editorial font-bold text-sm text-forest">Standard Flakes</div>
                <p className="text-[11px] text-charcoal-muted leading-tight">Coarse translucent flakes with natural fiber density</p>
                <div className="text-[10px] font-semibold text-sage-dark bg-white/70 py-1 rounded-md">
                  ≥ 40 ml/g Swell
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream/40 border border-cream-dark text-center space-y-2 card-hover">
                <div className="w-10 h-10 mx-auto rounded-xl bg-forest text-ivory font-bold text-xs flex items-center justify-center shadow-xs">
                  98–99%
                </div>
                <div className="font-editorial font-bold text-sm text-forest">Pure Flakes</div>
                <p className="text-[11px] text-charcoal-muted leading-tight">Pristine ivory botanical flakes with minimal seed residue</p>
                <div className="text-[10px] font-semibold text-sage-dark bg-white/70 py-1 rounded-md">
                  ≥ 60 ml/g Swell
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest text-ivory text-center space-y-2 card-hover shadow-sm">
                <div className="w-10 h-10 mx-auto rounded-xl bg-gold text-forest-dark font-bold text-xs flex items-center justify-center shadow-xs">
                  Mucilage
                </div>
                <div className="font-editorial font-bold text-sm text-ivory">Active Gel</div>
                <p className="text-[11px] text-cream/80 leading-tight">High-viscosity hydrophilic colloidal matrix</p>
                <div className="text-[10px] font-semibold text-forest bg-gold-light py-1 rounded-md">
                  Hydrated Matrix
                </div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark text-center text-[11px] text-charcoal-muted italic">
              Whole Husk Flakes &bull; Multi-Stage Aspiration Grading &bull; Hydrated Soluble Mucilage
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
              Hydration Dynamics
            </span>
            <h3 className="font-editorial text-2xl font-bold text-forest">
              Natural Swelling &amp; Mucilage Formation
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Upon addition to aqueous solution, the mucilaginous polysaccharide envelope hydrates rapidly to create a stable, non-Newtonian gel matrix. Whole husk retains its structural integrity while absorbing up to 60 times its dry volume in water, creating a powerful functional fiber base for food and health products.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?product=Psyllium+Husk&message=Request+Lab+Sample+For+Evaluation#rfq"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
              >
                <span>Request Sample For Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Export Packaging & Documentation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Packaging Box */}
          <div className="bg-white rounded-3xl border border-cream-dark p-8 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sage-light text-forest flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-forest">
              Seaworthy Export Packaging
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Our current export standard is engineered to safeguard natural botanical soluble fiber across humid maritime voyages:
            </p>
            <ul className="space-y-2 text-xs text-charcoal">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span><strong>25 KG Export Bags:</strong> Seaworthy protective multi-barrier export packaging with internal moisture-barrier liners.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span><strong>Private Labeled Option:</strong> Customized branding, labeling, and bulk export specifications aligned with buyer brand guidelines.</span>
              </li>
            </ul>
          </div>

          {/* Documentation Box */}
          <div className="bg-white rounded-3xl border border-cream-dark p-8 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sage-light text-forest flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-forest">
              Quality &amp; Regulatory Documentation
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Export consignments are accompanied by transparent verification documents aligned with product specifications, shipment terms, and destination requirements:
            </p>
            <ul className="space-y-2 text-xs text-charcoal">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>Batch-specific <strong>Certificate of Analysis (COA)</strong> covering physical parameters, where applicable.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span><strong>Microbiological screening &amp; heavy metal reports</strong> coordinated with accredited laboratories when required.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>Official <strong>Phytosanitary Certificate</strong> (when required) &amp; <strong>Certificate of Origin (COO)</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Product FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Common Inquiries"
          title="Psyllium Husk FAQs"
          description="Key procurement answers regarding grades, testing, packaging, and sampling."
        />

        <Accordion items={productFaqs} />
      </section>

      {/* 7. Bottom Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-3xl text-ivory p-8 sm:p-12 text-center space-y-4 shadow-lg">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
            Ready to Confirm Your Psyllium Specification?
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto">
            Submit your target grade, required volume, and destination port. Our Surat export desk will coordinate a prompt commercial proposal.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact?product=Psyllium+Husk#rfq"
              className="px-8 py-3.5 rounded-xl bg-ivory text-forest font-semibold text-sm hover:bg-white transition-colors"
            >
              REQUEST A QUOTE
            </Link>
            <Link
              href="/contact?product=Psyllium+Husk&message=Pre-shipment+Sample+Request#rfq"
              className="px-6 py-3.5 rounded-xl border border-sage/40 text-ivory font-semibold text-sm hover:bg-forest-soft transition-colors"
            >
              REQUEST A SAMPLE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

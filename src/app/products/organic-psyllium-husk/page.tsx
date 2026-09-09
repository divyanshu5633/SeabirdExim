import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Search, 
  AlertCircle, 
  Leaf, 
  Layers 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Organic Psyllium Husk | Certified India Export Supply',
  description:
    'Organic Psyllium Husk export solutions from India. Sourced subject to verified supplier certification, full lot traceability, and batch pesticide residue screening.',
};

export default function OrganicPsylliumPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: 'Organic Psyllium Husk', href: '/products/organic-psyllium-husk' },
        ]}
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Supply Chain Sourcing</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                Organic Psyllium Husk
              </h1>
              <p className="text-lg text-charcoal font-editorial italic">
                Organic Psyllium solutions for buyers seeking certified supply.
              </p>
              <p className="text-sm sm:text-base text-charcoal-muted max-w-xl leading-relaxed">
                For brands requiring verified clean-label and certified organic dietary fiber, Seabird EXIM coordinates organically cultivated Psyllium Husk from audited agricultural supplier networks in India.
              </p>
            </div>

            {/* Crucial Credibility & Compliance Callout */}
            <div className="p-4 rounded-xl bg-cream/50 border border-cream-dark text-xs text-charcoal-muted flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-charcoal block mb-0.5">
                  Certification Availability Statement
                </span>
                Organic grades can be sourced subject to certification, supplier documentation, and destination market requirements. Certification availability is subject to the selected supplier, harvest batch, and destination regulations (e.g. EU Organic, USDA NOP, NPOP).
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact?product=Organic+Psyllium+Husk#rfq"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>REQUEST ORGANIC QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-cream-dark shadow-xl bg-cream/30">
              <Image
                src="/images/psyllium_quality_lab.jpg"
                alt="Organic psyllium laboratory verification and pesticide testing"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Organic vs Conventional Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Agronomic &amp; Audit Rigor"
          title="Organic vs Conventional: The Distinction"
          description="Understanding the structural differences in cultivation, segregation, and analytical testing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-cream-dark p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-forest font-editorial text-xl font-bold">
              <Leaf className="w-5 h-5 text-sage" />
              <span>Conventional Psyllium</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Cultivated in standard commercial farming belts of Gujarat and Rajasthan. Tested for compliance with standard international food safety maximum residue limits (MRLs).
            </p>
            <ul className="space-y-2 text-xs text-charcoal pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Standard commercial purity grades (85% to 99%)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Standard food-grade export documentation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Broad commercial volume availability</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-forest/40 ring-1 ring-forest/20 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-forest font-editorial text-xl font-bold">
              <ShieldCheck className="w-5 h-5 text-forest" />
              <span>Organic Psyllium</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Cultivated on certified acreage with biological inputs and no synthetic chemical fertilizers or pesticides. Subject to strict batch-level laboratory screening.
            </p>
            <ul className="space-y-2 text-xs text-charcoal pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Complete lot traceability from verified grower clusters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Multi-residue pesticide screening by accredited NABL laboratories</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Segregated milling, dedicated poly-lined packing &amp; organic labeling</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quality Verification Pillars for Organic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Verification Safeguards"
          title="How We Coordinate Organic Supply"
          description="Transparent, documented controls to protect your brand from supply chain contamination."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-cream-dark p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-sage-light text-forest flex items-center justify-center font-editorial font-bold">
              01
            </div>
            <h3 className="font-editorial text-lg font-bold text-forest">
              Supplier Certificate Validation
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Before confirming an organic contract, our trade desk validates the active scope certificate and transaction certificates of the originating processor and farming cluster.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-sage-light text-forest flex items-center justify-center font-editorial font-bold">
              02
            </div>
            <h3 className="font-editorial text-lg font-bold text-forest">
              Pesticide Residue Analysis
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every export batch is screened by an independent accredited testing lab via GC-MS/MS and LC-MS/MS covering extensive multi-class pesticide screens.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-cream-dark p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-sage-light text-forest flex items-center justify-center font-editorial font-bold">
              03
            </div>
            <h3 className="font-editorial text-lg font-bold text-forest">
              Export Traceability Packaging
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Organic lots are packed in clean, food-grade 25 KG multi-wall bags with explicit organic traceability lot numbering to ensure seamless import customs validation.
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Requirements Action Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-10 space-y-6 text-center">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
            Ready to Discuss Your Organic Requirement?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto leading-relaxed">
            Please share your destination country, required organic standard (EU, NOP, or domestic), purity grade (e.g. 95% or 99%), and volume.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?product=Organic+Psyllium+Husk#rfq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
            >
              <span>REQUEST ORGANIC QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

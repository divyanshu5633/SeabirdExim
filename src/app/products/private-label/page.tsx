import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Package, 
  ArrowRight, 
  CheckCircle2, 
  FileEdit, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Private Label Psyllium Husk | Contract Export Sourcing',
  description:
    'Private Label Psyllium solutions from India. Sourcing, specification matching, customized packaging, and export coordination for global brand owners and distributors.',
};

export default function PrivateLabelPage() {
  const privateLabelSteps = [
    {
      step: '01',
      title: 'Share Your Concept',
      description: 'Discuss your target brand positioning, end-use application (dietary supplement, bakery blend, or retail fiber), and estimated launch timeline.',
    },
    {
      step: '02',
      title: 'Select Product & Specification',
      description: 'Select purity grade (85% to 99%), form (whole husk or milled powder mesh), and organic vs conventional supply matching your market claims.',
    },
    {
      step: '03',
      title: 'Sample & Commercial Quotation',
      description: 'Review physical evaluation samples and receive a transparent FOB or CIF export price proposal aligned with your project requirements.',
    },
    {
      step: '04',
      title: 'Packaging & Artwork Coordination',
      description: 'Coordinate custom branded packaging specifications, labeling text, mandatory allergen statements, and export compliance markings.',
    },
    {
      step: '05',
      title: 'Packaging & Quality Control',
      description: 'Sourcing and packaging proceed under systematic quality oversight, backed by batch COA testing and pre-shipment inspection.',
    },
    {
      step: '06',
      title: 'Export & Maritime Dispatch',
      description: 'Customs clearance is executed at Indian gateway ports and full export documentation packages are dispatched for rapid destination clearance.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Products', href: '/products' },
          { label: 'Private Label', href: '/products/private-label' },
        ]}
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 text-xs font-semibold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              <span>Brand Development Support</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                Private Label Psyllium
              </h1>
              <p className="text-lg text-charcoal font-editorial italic">
                Build your own Psyllium product with sourcing, packaging and export support.
              </p>
              <p className="text-sm sm:text-base text-charcoal-muted max-w-xl leading-relaxed">
                Whether you are launching a new consumer fiber supplement, expanding an institutional food service line, or creating a distributor brand, Seabird EXIM coordinates specification selection, packaging compliance, and international logistics from India.
              </p>
            </div>

            {/* Realistic B2B Service Boundary Statement */}
            <div className="p-4 rounded-xl bg-cream/50 border border-cream-dark text-xs text-charcoal-muted flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-charcoal block mb-0.5">
                  Private Label Project Parameters
                </span>
                Available packaging formats, MOQs, and lead times depend on the selected supplier, product specification, destination market regulations, and confirmed order volume.
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact?product=Private+Label+Psyllium#rfq"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>START YOUR PRIVATE LABEL PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-cream-dark shadow-xl bg-cream/30">
              <Image
                src="/images/psyllium_packaging_export.jpg"
                alt="Seaworthy B2B Psyllium export packaging and warehouse pallets"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Private Label Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workflow Framework"
          title="From Brand Vision to Export Container"
          description="How we coordinate private-label contracts systematically from preliminary concept to port arrival."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateLabelSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs hover:border-sage hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="font-editorial text-3xl font-bold text-forest/30 block">
                  {step.step}
                </span>
                <h3 className="font-editorial text-lg font-bold text-forest">
                  {step.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-cream text-[10px] font-bold uppercase tracking-wider text-sage-dark">
                Coordination Phase
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Capabilities Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-dark p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
              Scope of Coordination
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
              What Seabird Coordinates for Your Brand
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              We bridge the gap between Indian processing capabilities and international brand requirements:
            </p>

            <ul className="space-y-3 text-xs text-charcoal pt-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <strong>Specification Tailoring:</strong> Matching purity, swell volume, and particle size to your formulation claims.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <strong>Packaging Execution:</strong> Coordinating custom printed bags, food-contact compliant liners, and palletization.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <strong>Quality &amp; Lab Audits:</strong> Sourcing batch COAs and microbiological testing to safeguard brand reputation.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <strong>Export Clearance:</strong> Phytosanitary certificates, origin certification, and prompt shipping docs.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-cream/40 rounded-2xl p-8 border border-cream-dark space-y-6 text-center">
            <h3 className="font-editorial text-2xl font-bold text-forest">
              Initiate a Project Discussion
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed max-w-sm mx-auto">
              Tell us about your brand concept, volume expectations, and target market. Our trade desk will evaluate feasible options.
            </p>
            <Link
              href="/contact?product=Private+Label+Psyllium#rfq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-xs"
            >
              <span>DISCUSS PRIVATE LABEL REQUIREMENTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

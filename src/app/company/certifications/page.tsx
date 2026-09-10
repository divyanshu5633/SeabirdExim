import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  FileCheck, 
  ArrowRight, 
  Microscope, 
  FileSpreadsheet, 
  AlertCircle, 
  FileBadge 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Quality & Certifications | Testing Standards & Export Verification',
  description:
    'Review Seabird EXIM’s quality assurance protocols, Certificate of Analysis (COA) parameters, microbiological testing, and destination documentation standards.',
};

export default function CertificationsPage() {
  const testingProtocols = [
    {
      title: 'Physical & Swell Volume Testing',
      parameter: 'Swell Volume & Foreign Matter',
      method: 'USP / EP Swell Index Methodology',
      description: 'Quantifies milliliters of hydrated mucilage per gram of husk after 24 hours. Validates purity grade and absence of excessive seed extraneous matter.',
    },
    {
      title: 'Chemical Purity & Ash Limits',
      parameter: 'Total Ash & Acid-Insoluble Ash',
      method: 'Muffle Furnace Gravimetric Incineration',
      description: 'Acid-insoluble ash testing specifically verifies that mineral sand and siliceous dust have been thoroughly separated during mechanical cleaning.',
    },
    {
      title: 'Microbiological Screening',
      parameter: 'TAMC, TYMC, Coliforms, Salmonella',
      method: 'Standard Food & Pharmacopeial Plate Culture',
      description: 'Ensures total aerobic microbial count and yeast/mold counts comply with destination safety thresholds. Salmonella and E. coli tested negative.',
    },
    {
      title: 'Heavy Metal Analysis',
      parameter: 'Lead (Pb), Arsenic (As), Cadmium (Cd), Mercury (Hg)',
      method: 'ICP-MS / Atomic Absorption Spectrometry',
      description: 'Conducted through accredited third-party laboratories to guarantee heavy metals reside well below international maximum allowable limits.',
    },
    {
      title: 'Pesticide Residue Analysis',
      parameter: 'Multi-Residue Pesticide Screen',
      method: 'GC-MS/MS and LC-MS/MS Screening',
      description: 'Coordinated especially for organic and clean-label consignments, confirming compliance with destination MRLs (Maximum Residue Limits).',
    },
    {
      title: 'Official Quarantine & Origin Docs',
      parameter: 'Phytosanitary & Certificate of Origin',
      method: 'Issued by Authorized National Authorities',
      description: 'Government inspection by Indian plant quarantine authorities ensures consignments are free from quarantine pests before container sealing.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Company', href: '/company' },
          { label: 'Quality & Certifications', href: '/company/certifications' },
        ]}
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Analytical Integrity</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                Quality You Can Verify
              </h1>
              <p className="text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed">
                In agricultural commodity trading, trust is proven through verifiable data. Seabird EXIM coordinates comprehensive analytical testing and export documentation tailored to your destination market.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cream/40 border border-cream-dark text-xs text-charcoal-muted flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-charcoal block mb-0.5">
                  Certification &amp; Documentation Transparency
                </span>
                Documentation is coordinated according to product, shipment, supplier partner, and destination port requirements. We do not display unverified certification badges.
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact#rfq"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>REQUEST SPECIFICATION &amp; COA</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-forest-soft bg-forest-dark p-6 sm:p-8 text-ivory flex flex-col justify-between shadow-xl card-hover group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-forest text-ivory text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                  <span>ISO 17025 Accredited Protocols</span>
                </span>
                <span className="text-xs font-bold text-gold">USP &bull; BP &bull; EP</span>
              </div>

              <div className="space-y-3 my-auto py-4">
                <div className="w-12 h-12 rounded-2xl bg-forest/40 border border-forest-light/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  <Microscope className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-ivory">
                  Comprehensive Analytical Oversight
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed">
                  Every lot is analyzed under strict laboratory methods. Verification encompasses swell volume, purity assay, micro-panel, heavy metals, and residual moisture.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-forest/40 text-[11px]">
                <div className="flex items-center gap-1.5 text-cream/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Swell Index (USP up to &ge; 60 ml/g)</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Heavy Metals (ICP-MS)</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Salmonella / E. coli Neg.</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Moisture &le; 10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Analytical Testing Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testing Architecture"
          title="Analytical Parameters &amp; Lab Methods"
          description="Every export consignment is evaluated against documented physical, chemical, and microbiological thresholds."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testingProtocols.map((proto, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs space-y-3 hover:border-sage transition-colors"
            >
              <div className="flex items-center justify-between border-b border-cream pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sage-dark">
                  Protocol 0{idx + 1}
                </span>
                <Microscope className="w-4 h-4 text-forest" />
              </div>

              <h3 className="font-editorial text-lg font-bold text-forest">
                {proto.title}
              </h3>

              <div className="text-xs space-y-1">
                <div className="text-charcoal font-semibold">{proto.parameter}</div>
                <div className="text-[11px] text-sage-dark font-medium">{proto.method}</div>
              </div>

              <p className="text-xs text-charcoal-muted leading-relaxed pt-1">
                {proto.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reusable Certificate Architecture Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-12 space-y-6">
          <SectionHeader
            eyebrow="Compliance Framework"
            title="Export Documentation Package"
            description="We coordinate complete shipping and quarantine portfolios to facilitate prompt customs clearance."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-white p-5 rounded-xl border border-cream-dark space-y-2">
              <FileCheck className="w-5 h-5 text-forest" />
              <div className="font-editorial text-base font-bold text-forest">Certificate of Analysis</div>
              <p className="text-xs text-charcoal-muted">Batch test report verifying confirmed physical &amp; chemical limits.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-cream-dark space-y-2">
              <ShieldCheck className="w-5 h-5 text-forest" />
              <div className="font-editorial text-base font-bold text-forest">Phytosanitary Certificate</div>
              <p className="text-xs text-charcoal-muted">Official plant quarantine clearance issued by Indian authorities.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-cream-dark space-y-2">
              <FileBadge className="w-5 h-5 text-forest" />
              <div className="font-editorial text-base font-bold text-forest">Certificate of Origin</div>
              <p className="text-xs text-charcoal-muted">Authenticating Indian origin for international customs duty assessment.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-cream-dark space-y-2">
              <FileSpreadsheet className="w-5 h-5 text-forest" />
              <div className="font-editorial text-base font-bold text-forest">Shipping Documentation</div>
              <p className="text-xs text-charcoal-muted">Commercial Invoice, Packing List, and Seaworthy Bill of Lading (B/L).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Action Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-3xl text-ivory p-8 sm:p-12 text-center space-y-4 shadow-md">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
            Have Specific Laboratory Testing Requirements?
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto leading-relaxed">
            Send us your company specification sheet or target Pharmacopeial standard. Our team will review batch testing feasibility.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?message=Review+Technical+Specification+Sheet#rfq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-ivory text-forest font-semibold text-sm hover:bg-white transition-colors"
            >
              <span>SUBMIT SPEC SHEET FOR REVIEW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  FileCheck, 
  ArrowRight, 
  FileSpreadsheet, 
  AlertCircle, 
  FileBadge,
  FileText,
  ClipboardCheck,
  CheckCircle2,
  Building2,
  ExternalLink
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Quality & Documentation | Product Records & Export Documentation',
  description:
    'We support international buyers with product documentation, shipment-specific quality records, and export documentation aligned with applicable buyer and destination requirements.',
};

export default function CertificationsPage() {
  const productDocs = [
    {
      title: 'Certificate of Analysis (COA)',
      subtitle: 'Where applicable',
      description: 'Batch-specific laboratory analysis reports reflecting confirmed physical and chemical parameters, provided where applicable to confirmed commercial shipments.',
      icon: FileCheck,
    },
    {
      title: 'Product Specifications',
      subtitle: 'Technical benchmarks',
      description: 'Clear specification sheets detailing confirmed purity grades (85% to 99%), swell volume benchmarks, moisture thresholds, and physical appearance.',
      icon: FileText,
    },
    {
      title: 'Shipment-Specific Quality Records',
      subtitle: 'Batch verification',
      description: 'Verified lot documentation, packing reports, and container dispatch records aligned with confirmed buyer order specifications.',
      icon: ClipboardCheck,
    },
    {
      title: 'Supplier & Manufacturer Documentation',
      subtitle: 'Supporting records',
      description: 'Relevant supplier or manufacturer supporting documentation, batch tracings, and processing records coordinated where applicable.',
      icon: Building2,
    },
  ];

  const exportDocs = [
    {
      title: 'Commercial Invoice',
      tag: 'Trade Document',
      description: 'Itemized commercial invoice detailing agreed Incoterms (FOB / CFR / CIF), batch volumes, grade specifications, and payment terms.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Packing List',
      tag: 'Logistics Manifest',
      description: 'Comprehensive shipment packing manifest detailing bag counts, net and gross weights, tare weights, and palletization specifications.',
      icon: FileText,
    },
    {
      title: 'Certificate of Origin (COO)',
      tag: 'Customs Clearance',
      description: 'Chamber of Commerce origin documentation verifying Indian agricultural production for destination customs assessment.',
      icon: FileBadge,
    },
    {
      title: 'Phytosanitary Documentation',
      tag: 'When required',
      description: 'Official plant health inspection certificate issued by authorized Indian plant quarantine authorities, when required by the destination country.',
      icon: ShieldCheck,
    },
    {
      title: 'Bill of Lading (B/L)',
      tag: 'Ocean Freight',
      description: 'Seaworthy multi-modal ocean bill of lading from Indian gateway ports (Mundra / Nhava Sheva) to your nominated destination port.',
      icon: ExternalLink,
    },
  ];

  const coordinationPillars = [
    {
      title: 'Buyer Specification Alignment',
      description: 'We review buyer specification sheets and technical data sheets upfront to confirm lot feasibility and contractual alignment before dispatch.',
    },
    {
      title: 'Supply & Processing Oversight',
      description: 'We work closely with vetted processing partners across Gujarat, India to ensure that material preparation conforms to confirmed grade requirements.',
    },
    {
      title: 'Statutory & Port Coordination',
      description: 'We liaise with authorized inspection agencies, fumigation providers, and port agents to ensure orderly clearance at Indian export gateways.',
    },
  ];

  const testingWhenRequired = [
    {
      name: 'Microbiological Testing',
      scope: 'TAMC, TYMC, Coliforms, Salmonella, E. coli',
      note: 'Coordinated when required by buyer specifications or destination food safety regulations.',
    },
    {
      name: 'Pesticide Residue Analysis',
      scope: 'Multi-residue screening panels',
      note: 'Arranged through accredited third-party laboratories when required for specific markets.',
    },
    {
      name: 'Heavy Metal Analysis',
      scope: 'Lead (Pb), Arsenic (As), Cadmium (Cd), Mercury (Hg)',
      note: 'Coordinated against destination pharmacopeial or food-grade regulatory thresholds.',
    },
    {
      name: 'Custom Buyer-Specific Testing',
      scope: 'Independent inspection (e.g., SGS, Intertek)',
      note: 'Pre-shipment third-party sampling and verification can be arranged by commercial agreement.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs
        items={[
          { label: 'Company', href: '/company' },
          { label: 'Quality & Documentation', href: '/company/certifications' },
        ]}
      />

      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Quality &amp; Documentation</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                Quality You Can Verify
              </h1>
              <p className="text-base sm:text-lg text-charcoal leading-relaxed font-medium">
                We support international buyers with product documentation, shipment-specific quality records, and export documentation aligned with applicable buyer and destination requirements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cream/40 border border-cream-dark text-xs text-charcoal-muted flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-charcoal block mb-0.5">
                  Documentation Transparency
                </span>
                Documentation is coordinated according to buyer, product grade, supplier partner, and destination port requirements. We provide factual, verifiable records without making unsupported certification claims.
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact#rfq"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>REQUEST DOCUMENTATION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-forest-soft bg-forest-dark p-6 sm:p-8 text-ivory flex flex-col justify-between shadow-xl card-hover group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-forest text-ivory text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Verified Trade Documentation</span>
                </span>
                <span className="text-xs font-bold text-gold">Shipment-Specific</span>
              </div>

              <div className="space-y-3 my-auto py-4">
                <div className="w-12 h-12 rounded-2xl bg-forest/40 border border-forest-light/40 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-ivory">
                  Transparent Quality Records
                </h3>
                <p className="text-xs text-cream/80 leading-relaxed">
                  We coordinate shipment-specific quality documentation with vetted processing partners, accredited third-party testing laboratories, and statutory export authorities.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-forest/40 text-[11px]">
                <div className="flex items-center gap-1.5 text-cream/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Product Specifications</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Certificate of Analysis (COA)</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Export Quarantine &amp; COO</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Traceable Lot Marking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Documentation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Specification Records"
          title="Product Documentation"
          description="Accurate product and batch records coordinated for transparent international procurement."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productDocs.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs space-y-3 hover:border-sage transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-sage-light text-forest flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-forest">
                    {doc.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-sage-dark uppercase tracking-wider">
                    {doc.subtitle}
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {doc.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Export Documentation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-12 space-y-6">
          <SectionHeader
            eyebrow="Shipping Compliance"
            title="Export Documentation"
            description="We coordinate shipment documentation according to buyer, product, and destination-market requirements."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {exportDocs.map((doc, idx) => {
              const Icon = doc.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-xl border border-cream-dark space-y-2">
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5 text-forest" />
                    <span className="text-[10px] uppercase font-bold text-sage-dark bg-cream/40 px-2 py-0.5 rounded">
                      {doc.tag}
                    </span>
                  </div>
                  <div className="font-editorial text-base font-bold text-forest">
                    {doc.title}
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quality Coordination Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-dark p-8 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
              Trade Partner Role
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
              Quality Coordination
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Quality requirements can vary by buyer, product grade, and destination market. We coordinate with relevant suppliers, laboratories, and authorities when additional documentation or testing is required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {coordinationPillars.map((pillar, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-cream/30 border border-cream-dark space-y-2">
                <div className="text-[11px] font-bold text-sage-dark uppercase tracking-wider">
                  0{idx + 1} &bull; Coordination
                </div>
                <h3 className="font-editorial text-lg font-bold text-forest">
                  {pillar.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testing When Required Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-dark p-8 sm:p-12 shadow-xs space-y-6">
          <SectionHeader
            eyebrow="On-Demand Analysis"
            title="Testing When Required"
            description="Additional laboratory testing can be coordinated when requested by the buyer or required by the destination market."
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {testingWhenRequired.map((test, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-cream/20 border border-cream space-y-2">
                <div className="font-editorial text-base font-bold text-forest">
                  {test.name}
                </div>
                <div className="text-[11px] font-semibold text-sage-dark">
                  {test.scope}
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {test.note}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-charcoal-muted italic border-t border-cream">
            * Note: Testing is coordinated on request through accredited third-party analytical laboratories based on buyer and destination market requirements.
          </div>
        </div>
      </section>

      {/* 6. Need Specific Documentation CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-3xl text-ivory p-8 sm:p-12 text-center space-y-4 shadow-md">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-ivory border border-white/20 inline-block">
            Procurement Assistance
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
            Need Specific Documentation?
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto leading-relaxed">
            Tell us your destination market and product requirements. We’ll confirm the documentation available for your shipment.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?message=Documentation+Requirements+Inquiry#rfq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-ivory text-forest font-semibold text-sm hover:bg-white transition-colors"
            >
              <span>REQUEST DOCUMENTATION &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

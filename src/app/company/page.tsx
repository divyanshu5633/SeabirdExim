import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageSquare
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ExportTimeline from '@/components/features/ExportTimeline';
import { companyData } from '@/data/companyData';

export const metadata: Metadata = {
  title: 'About Seabird EXIM | Agricultural Commodity Exporter Surat India',
  description:
    'Learn about Seabird EXIM, an India-based export and trade partner in Surat, Gujarat. Specification-focused agricultural commodity sourcing connecting Indian supply with global buyers.',
};

export default function CompanyPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs items={[{ label: 'Company', href: '/company' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Trade &amp; Sourcing Partner &bull; Surat, Gujarat</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                Connecting Indian Supply With Global Demand
              </h1>
              <p className="text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed">
                Seabird EXIM is an India-based export and trade company operating from Surat, Gujarat. We specialize in connecting international B2B buyers with verified, specification-aligned agricultural commodities from India.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact#rfq"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
              >
                <span>CONTACT EXPORT TEAM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/company/certifications"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-cream-dark bg-white text-charcoal text-sm font-semibold hover:bg-cream/40 transition-colors"
              >
                <span>QUALITY PROTOCOLS</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-forest/20 via-gold/15 to-sage/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-cream-dark shadow-xl bg-cream/30 shimmer-sweep animate-float-slow">
              <Image
                src="/images/company_surat_desk.jpg"
                alt="Seabird EXIM corporate trade operations desk in Surat, Gujarat"
                fill
                priority
                className="object-cover object-center img-hover-zoom"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-cream-dark shadow-md flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-sage-dark">
                    Trade Headquarters
                  </div>
                  <div className="font-editorial text-sm font-bold text-forest">
                    Surat, Gujarat &bull; India
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-forest text-ivory">
                  Global Desk
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Seabird Story Lineup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          eyebrow="Our Journey &amp; Lineup"
          title="The Seabird Story: From Gujarat Heartland to Global Seaports"
          description="Founded at the mercantile crossroads of Surat, Seabird EXIM bridges multigenerational farming belts with high-precision international supply chains."
        />

        <div className="space-y-12 sm:space-y-16">
          {/* Milestone 01: Origins & Soil */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center card-hover">
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>Chapter 01 &bull; Roots in the Agricultural Belt</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                Grounded in the Heart of India&apos;s Psyllium Capital
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Gujarat and southwestern Rajasthan yield over 85% of the planet&apos;s commercial Psyllium (Plantago ovata). Having our operating headquarters in Surat places Seabird EXIM directly adjacent to the key cultivation tracts, auction mandis, and multi-generational grower clusters.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">Direct Mandi Relations</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Direct crop intelligence during seasonal arrivals</div>
                </div>
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">Authentic Traceability</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Farm-to-consignment origin integrity</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-md bg-cream/20 shimmer-sweep">
                <Image
                  src="/images/story_roots_gujarat.jpg"
                  alt="Rural agricultural heritage and Psyllium harvest fields in Gujarat"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-md text-ivory text-[10px] font-bold tracking-wider uppercase">
                  Agricultural Belt &bull; Western India
                </div>
              </div>
            </div>
          </div>

          {/* Milestone 02: Advanced Milling & Sorting */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center card-hover">
            <div className="lg:col-span-6 group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-md bg-cream/20 shimmer-sweep">
                <Image
                  src="/images/story_processing_mill.jpg"
                  alt="Modern clean Sortex optical cleaning and pneumatic aspiration plant"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-forest/85 backdrop-blur-md text-ivory text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Optical Sortex Grading</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-forest" />
                <span>Chapter 02 &bull; Precision Mechanical Separation</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                State-of-the-Art Processing Coordination
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Raw psyllium seed holds only 25% to 30% husk by mass. Extracting high-purity translucent fiber requires precision multi-stage processing: pneumatic de-stoning, aspiration, multi-deck sifting, and high-speed optical sortex lines to eliminate extraneous seed matter without shearing delicate mucilaginous cells.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">85% to 99% Purity Range</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Calibrated output tailored to buyer specification</div>
                </div>
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">Pneumatic Air Separation</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Gentle cleaning preventing mucilage destruction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone 03: Analytical QA & Swell Testing */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center card-hover">
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>Chapter 03 &bull; Pharmacopeial Verification</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                Analytical Testing Before Any Lot Dispatches
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                We believe true trade excellence lies in verification. Every batch is analyzed against international pharmacopeial criteria (USP, BP, EP) — measuring rapid swelling index (up to ≥ 60 ml/g), moisture retention ≤ 10%, heavy metals (ICP-MS), and stringent microbiological standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">Batch COA Guarantee</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Accredited laboratory metrics with each container</div>
                </div>
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">Monograph Compliance</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Satisfying strict US &amp; European food/pharma codes</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-md bg-cream/20 shimmer-sweep">
                <Image
                  src="/images/story_qa_testing.jpg"
                  alt="Analytical chemists testing psyllium swelling volume and microbiological safety"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-forest/85 backdrop-blur-md text-ivory text-[10px] font-bold tracking-wider uppercase">
                  USP / EP Swell Volume QA
                </div>
              </div>
            </div>
          </div>

          {/* Milestone 04: Seaworthy Packaging & Ocean Dispatch */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center card-hover">
            <div className="lg:col-span-6 group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-md bg-cream/20 shimmer-sweep">
                <Image
                  src="/images/story_shipping_dispatch.jpg"
                  alt="Export logistics warehouse with pallets of 25 KG Export Bags loaded into ocean freight container"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest/85 backdrop-blur-md text-ivory text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                  <span>25 KG Export Bags Standard</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-forest text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-forest" />
                <span>Chapter 04 &bull; Transoceanic Maritime Logistics</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                Protecting Cargo Across Thousands of Nautical Miles
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                Because soluble fiber is highly hygroscopic, maritime transit requires zero compromise. All consignments are packed in seaworthy 25 KG Export Bags with internal moisture locks (or custom Private Labeled options), palletized with shrink wrap and desiccant bags, and loaded for rapid dispatch through Mundra and Kandla seaports.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">25 KG Export Bags</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Heavy-duty multi-barrier moisture protection</div>
                </div>
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="font-bold text-forest">Container Loading Supervision</div>
                  <div className="text-charcoal-muted text-[11px] mt-0.5">Pre-trip container inspection &amp; desiccant staging</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Philosophy & Business Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-dark p-8 sm:p-12 lg:p-14 shadow-xs space-y-8">
          <SectionHeader
            eyebrow="Our Model"
            title="Our Trade &amp; Sourcing Philosophy"
            description="We act as an agile, accountable bridge between Indian agro-processors and international commercial buyers."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            <div className="space-y-2 p-5 rounded-2xl bg-cream/30 border border-cream-dark card-hover">
              <h3 className="font-editorial text-lg font-bold text-forest">
                Qualified Supply Networks
              </h3>
              <p>
                Rather than claiming factory ownership, we maintain direct, vetted relationships with specialized processing mills and agricultural clusters across Gujarat and Rajasthan. This gives us flexible access to multiple harvest grades.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-cream/30 border border-cream-dark card-hover">
              <h3 className="font-editorial text-lg font-bold text-forest">
                Specification-First Sourcing
              </h3>
              <p>
                We do not push generic commodity inventory. We examine your laboratory thresholds—swell volume, extraneous matter, moisture, microbiological limits—and contract supply that strictly satisfies those confirmed criteria.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-cream/30 border border-cream-dark card-hover">
              <h3 className="font-editorial text-lg font-bold text-forest">
                End-to-End Export Execution
              </h3>
              <p>
                From pre-shipment sample dispatch and container stuffing supervision to phytosanitary clearance and maritime documentation, our Surat trade coordinators manage the complete logistics pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Export Process Timeline */}
      <section id="export-process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Systematic Coordination"
          title="Our Export Process"
          description="Every consignment follows a documented 6-step roadmap from initial inquiry to destination discharge."
        />

        <ExportTimeline />
      </section>

      {/* Direct Contact Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-12 space-y-8">
          <SectionHeader
            eyebrow="Direct Trade Operations &amp; Export Desk"
            title="Speak Directly With Our Export Team"
            description="No automated call centers. Connect directly with Divyanshu Patel and Neel Patel at our Surat export operations desk."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyData.contacts.map((contact, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cream-dark p-6 sm:p-8 space-y-4 shadow-xs hover:border-forest/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sage-light text-forest font-editorial text-xl font-bold flex items-center justify-center">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-forest">
                      {contact.name}
                    </h3>
                    <div className="text-xs text-charcoal-muted font-medium">
                      Seabird EXIM &bull; Surat, India
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-cream">
                    <span className="text-charcoal-muted">Direct Phone:</span>
                    <a href={`tel:${contact.phone}`} className="font-semibold text-charcoal hover:text-forest whitespace-nowrap">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-cream">
                    <span className="text-charcoal-muted">Location:</span>
                    <span className="font-medium text-charcoal">Surat, Gujarat, INDIA.</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat with {contact.name}</span>
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2.5 rounded-xl border border-cream-dark text-forest hover:bg-cream/40 transition-colors"
                    title={`Call ${contact.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-cream text-xs text-charcoal-muted flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-semibold text-charcoal flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-forest" />
                <span>Official Emails:</span>
              </span>
              <span>Sales: <a href={`mailto:${companyData.salesEmail}`} className="font-semibold text-forest hover:underline">{companyData.salesEmail}</a></span>
              <span>&bull;</span>
              <span>Admin: <a href={`mailto:${companyData.adminEmail}`} className="font-semibold text-forest hover:underline">{companyData.adminEmail}</a></span>
              <span>&bull;</span>
              <span>Info: <a href={`mailto:${companyData.infoEmail}`} className="font-semibold text-forest hover:underline">{companyData.infoEmail}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest" />
              <span>Surat, Gujarat, India (Strategic proximity to Mundra &amp; Nhava Sheva gateway seaports)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

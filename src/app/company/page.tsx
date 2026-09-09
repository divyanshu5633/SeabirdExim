import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Building2, 
  MapPin, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageSquare,
  Users
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

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-cream-dark shadow-xl bg-cream/30">
              <Image
                src="/images/psyllium_husk_hero.jpg"
                alt="Seabird EXIM Surat Gujarat Psyllium export operations"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
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

          {/* Infrastructure Dual Visual Showcase */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-sm bg-cream/20 card-hover">
                <Image
                  src="/images/psyllium_field_harvest.jpg"
                  alt="Harvesting psyllium in Gujarat rural agricultural belt"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="text-[11px] text-charcoal-muted italic">
                Agricultural Origin: Certified Plantago ovata harvest tracts in Gujarat &amp; Rajasthan
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-sm bg-cream/20 card-hover">
                <Image
                  src="/images/psyllium_packaging_export.jpg"
                  alt="Export logistics warehouse with pallets of 25kg psyllium bags"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="text-[11px] text-charcoal-muted italic">
                Export Infrastructure: Palletized 25 KG multi-wall export bags ready for seaport dispatch
              </div>
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
            eyebrow="Direct Trade Contacts"
            title="Speak Directly With Our Export Team"
            description="No automated call centers. Get direct, transparent answers from our Surat export operations desk."
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
                      {contact.role} &bull; Seabird EXIM
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-cream">
                    <span className="text-charcoal-muted">Direct Phone:</span>
                    <a href={`tel:${contact.phone}`} className="font-semibold text-charcoal hover:text-forest">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-cream">
                    <span className="text-charcoal-muted">Location:</span>
                    <span className="font-medium text-charcoal">Surat, Gujarat, India</span>
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
                    <span>Chat on WhatsApp</span>
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

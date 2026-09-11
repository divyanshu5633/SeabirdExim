import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  FileCheck2, 
  PackageCheck, 
  MessageSquare,
  ChevronRight,
  Truck,
  Ship,
  Plane
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import RFQBuilder from '@/components/features/RFQBuilder';
import PurityGradeCards from '@/components/features/PurityGradeCards';
import ExportTimeline from '@/components/features/ExportTimeline';
import ApplicationTabs from '@/components/features/ApplicationTabs';
import { companyData } from '@/data/companyData';
import UrlCleaner from '@/components/common/UrlCleaner';

export default function HomePage() {
  return (
    <div className="space-y-20 sm:space-y-28 lg:space-y-36 pb-16">
      <UrlCleaner />
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 lg:pt-16">
        {/* Subtle background grain and ambient glow */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-sage/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-cream-dark shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                <span className="text-[11px] font-semibold tracking-wider uppercase text-forest">
                  B2B Import &amp; Export &bull; Surat, India
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-editorial text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest leading-[1.15]">
                  Quality from India.
                  <span className="block text-charcoal font-normal italic font-serif mt-1">
                    Built for Global Buyers.
                  </span>
                </h1>
                
                <p className="text-sm sm:text-lg text-charcoal-muted max-w-xl font-normal leading-relaxed">
                  Specification-focused sourcing and export solutions for quality Indian commodities. Current primary focus: <span className="text-forest font-semibold">Psyllium Husk (Plantago ovata)</span> for international food, nutraceutical, and pharmaceutical formulations.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/contact#rfq"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-forest text-ivory font-semibold text-sm hover:bg-forest-dark transition-all duration-200 shadow-md group"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products/psyllium-husk"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-cream-dark bg-white text-charcoal font-semibold text-sm hover:bg-cream/40 transition-colors"
                >
                  <span>EXPLORE PSYLLIUM HUSK</span>
                  <ChevronRight className="w-4 h-4 text-sage-dark" />
                </Link>
              </div>

              {/* Multi-modal Global Freight Strip (Road, Ocean, Air) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs font-semibold text-charcoal-muted pt-1">
                <span className="text-[10px] tracking-[0.18em] uppercase text-forest font-bold shrink-0">Worldwide Freight:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cream/70 text-forest text-xs font-medium">
                    <Truck className="w-3.5 h-3.5 text-gold" />
                    <span>Road Logistics</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cream/70 text-forest text-xs font-medium">
                    <Ship className="w-3.5 h-3.5 text-gold" />
                    <span>Ocean Cargo</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cream/70 text-forest text-xs font-medium">
                    <Plane className="w-3.5 h-3.5 text-gold" />
                    <span>Air Freight</span>
                  </span>
                </div>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-6 border-t border-cream-dark/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-widest font-bold text-forest flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-sage-dark" />
                    <span>INDIA ORIGIN</span>
                  </div>
                  <div className="text-xs text-charcoal-muted">Sourced from Gujarat/Rajasthan</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-widest font-bold text-forest flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-sage-dark" />
                    <span>SPEC FOCUSED</span>
                  </div>
                  <div className="text-xs text-charcoal-muted">85% to 99% purity lots</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-widest font-bold text-forest flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5 text-sage-dark" />
                    <span>EXPORT READY</span>
                  </div>
                  <div className="text-xs text-charcoal-muted">25 KG Export Bags</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-widest font-bold text-forest flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage-dark" />
                    <span>B2B SUPPLY</span>
                  </div>
                  <div className="text-xs text-charcoal-muted">Transparent documentation</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Botanical Psyllium macro photography */}
            <div className="lg:col-span-5 relative group">
              {/* Soft decorative ambient glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-forest/20 via-gold/15 to-sage/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden border border-cream-dark shadow-2xl bg-cream/30 aspect-[4/3] sm:aspect-[16/11] shimmer-sweep animate-float-slow">
                <Image
                  src="/images/psyllium_husk_hero.jpg"
                  alt="Pure natural Psyllium Husk flakes (Plantago ovata) with botanical seed spikes"
                  fill
                  priority
                  className="object-cover object-center img-hover-zoom animate-breathe"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />

                {/* Floating Spec Highlight Tag */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-cream-dark shadow-lg flex items-center justify-between animate-float transition-transform duration-300 group-hover:translate-y-[-2px]">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-sage-dark">
                      Featured Botanical Commodity
                    </div>
                    <div className="font-editorial text-base font-bold text-forest">
                      Psyllium Husk &bull; <span className="font-normal italic">Plantago ovata</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sage-light text-forest shadow-2xs animate-pulse">
                    85% &ndash; 99% Purity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION & SOURCING VISUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
                Direct Sourcing &amp; Export Model
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-forest leading-tight">
                Connecting Indian Supply With Global Demand
              </h2>
              <div className="space-y-4 text-charcoal text-sm sm:text-base leading-relaxed">
                <p>
                  Seabird EXIM is an India-based import and export company focused on connecting international buyers with quality products sourced from India.
                </p>
                <p className="text-charcoal-muted">
                  Our current focus is <strong className="text-charcoal">Psyllium Husk</strong>, supplied according to buyer requirements for food, nutraceutical, pharmaceutical, and other suitable applications. Sourced from the prime agricultural tracts of Gujarat and Rajasthan, every harvest lot undergoes systematic mechanical cleaning and specification alignment.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-forest">
                <Link href="/company" className="hover:text-forest-dark flex items-center gap-1.5 underline underline-offset-4 group">
                  <span>Learn about our sourcing philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/company/certifications" className="hover:text-forest-dark flex items-center gap-1.5 underline underline-offset-4 group">
                  <span>View documentation &amp; testing criteria</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sourcing Harvest Field Image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-cream-dark shadow-md bg-white card-hover shimmer-sweep">
                <Image
                  src="/images/psyllium_field_harvest.jpg"
                  alt="Authentic Plantago ovata psyllium harvest field in Gujarat India"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-forest/80 backdrop-blur-md text-ivory text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-pulse-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                  <span>Harvest Belts</span>
                </div>
              </div>
              <div className="mt-2 text-center text-[11px] text-charcoal-muted italic">
                Plantago ovata cultivation &amp; harvest belts &bull; Gujarat, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCT: PSYLLIUM HUSK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Flagship Commodity"
          title="Psyllium Husk"
          description="Plantago ovata — Natural soluble fibre sourced from India for international food, nutraceutical and pharmaceutical applications."
        />

        {/* Product Highlights & Purity Cards */}
        <div className="space-y-10">
          <PurityGradeCards compact={true} />

          {/* Three Physical Forms Showcase Card */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-hover">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
                Physical Form &amp; Swell Dynamics
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                From Whole Flakes to Soluble Mucilage
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Psyllium Husk is valued for its versatility in both intact and pulverized forms. Shown below: raw whole husk flakes (left), finely milled 100-mesh powder (center), and hydrated botanical gel demonstrating superior swell volume (right).
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="text-[10px] uppercase font-bold text-sage-dark">Form A</div>
                  <div className="font-bold text-xs text-charcoal mt-0.5">Whole Husk</div>
                </div>
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="text-[10px] uppercase font-bold text-sage-dark">Form B</div>
                  <div className="font-bold text-xs text-charcoal mt-0.5">Fine Powder</div>
                </div>
                <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
                  <div className="text-[10px] uppercase font-bold text-sage-dark">Hydrated</div>
                  <div className="font-bold text-xs text-forest mt-0.5">≥ 60 ml/g Gel</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-cream-dark shadow-sm bg-cream/20 shimmer-sweep">
                <Image
                  src="/images/psyllium_grades_comparison.jpg"
                  alt="Psyllium whole husk flakes, 100 mesh powder, and hydrated soluble mucilage gel"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-md text-ivory text-[10px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Physical Forms</span>
                </div>
              </div>
              <div className="mt-2 text-center text-[11px] text-charcoal-muted italic">
                Left: Whole Husk Flakes &bull; Center: Fine Milled Powder &bull; Right: Hydrated Mucilage
              </div>
            </div>
          </div>

          {/* Quick Technical Summary Bar */}
          <div className="bg-white rounded-2xl border border-cream-dark p-6 sm:p-8 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted">Botanical Origin</div>
              <div className="font-editorial text-lg font-bold text-forest">India</div>
              <p className="text-xs text-charcoal-muted">Gujarat &amp; Rajasthan harvest belts</p>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted">Export Form</div>
              <div className="font-editorial text-lg font-bold text-forest">Whole Husk</div>
              <p className="text-xs text-charcoal-muted">Powder mesh sizing available on request</p>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted">Standard Packing</div>
              <div className="font-editorial text-lg font-bold text-forest">25 KG Export Bags</div>
              <p className="text-xs text-charcoal-muted">Seaworthy export packaging with inner liner</p>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted">Primary Applications</div>
              <div className="font-editorial text-lg font-bold text-forest">Food &bull; Pharma &bull; Nutra</div>
              <p className="text-xs text-charcoal-muted">Bakery, supplements, OTC, feed</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/products/psyllium-husk"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors shadow-sm"
            >
              <span>VIEW FULL PSYLLIUM SPECIFICATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY BUYERS WORK WITH SEABIRD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Commercial Value"
          title="Why Buyers Work With Seabird"
          description="Built on clear specifications, transparent trade coordination, and verified documentation rather than inflated claims."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {companyData.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white rounded-2xl border border-cream-dark p-6 shadow-xs hover:border-sage hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-editorial text-3xl font-bold text-forest/30 block mb-3">
                  {pillar.number}
                </span>
                <h3 className="font-editorial text-lg font-bold text-forest mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream text-[11px] text-sage-dark font-semibold">
                Seabird Standard
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BUYER REQUIREMENT BUILDER (INTERACTIVE RFQ) */}
      <section id="builder" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RFQBuilder />
      </section>

      {/* 6. QUALITY & DOCUMENTATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-dark text-ivory rounded-3xl p-8 sm:p-12 lg:p-16 border border-forest relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-forest text-sage border border-sage/30 inline-block">
                Verification Standard
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight">
                Quality You Can Verify
              </h2>
              <p className="text-sm sm:text-base text-cream/80 max-w-xl leading-relaxed">
                We believe in verifiable parameters over generic claims. Every export consignment is governed by batch laboratory analysis, physical swelling assessment, and compliant export certificates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {companyData.qualityPillars.map((qp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-forest/80 border border-forest-soft space-y-1">
                    <h3 className="font-editorial text-base font-bold text-ivory">
                      {qp.title}
                    </h3>
                    <p className="text-xs text-cream/70 leading-relaxed">
                      {qp.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/company/certifications"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage-light text-forest text-xs font-bold hover:bg-white transition-colors"
                >
                  <span>VIEW QUALITY &amp; DOCUMENTATION PROTOCOLS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right QA Lab Visual */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-forest-soft aspect-[4/3] shadow-2xl shimmer-sweep animate-float-slow-reverse">
                <Image
                  src="/images/psyllium_quality_lab.jpg"
                  alt="Analytical laboratory bench with psyllium husk swell volume and microbial test verification"
                  fill
                  className="object-cover object-center img-hover-zoom transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest/80 backdrop-blur-md text-ivory text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-pulse-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                  <span>Lab Monograph QA</span>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-sage/70 italic text-center">
                Documentation and laboratory analysis coordinated according to confirmed product and shipment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXPORT PROCESS & PROCESSING LINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          eyebrow="Transparent Supply Chain"
          title="From Requirement to Shipment"
          description="A systematic, 6-step export workflow designed for international procurement transparency."
        />

        {/* Processing Line Callout Card */}
        <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 lg:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center card-hover">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-sage-light text-forest border border-sage/40 inline-block">
              Maritime Gateway &amp; Global Shipping
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
              Direct Seaport Dispatch via Mundra &amp; Kandla
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Consignments in seaworthy 25 KG Export Bags are palletized, moisture-shielded with high-absorption container desiccants, and cleared through Western India&apos;s leading deepwater maritime terminals. We coordinate comprehensive bill of lading, phytosanitary clearance, and cargo tracking to destination ports worldwide.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-charcoal font-semibold">
              <span className="px-3 py-1 rounded-lg bg-cream/40 border border-cream-dark">FCL Container Stuffing</span>
              <span className="px-3 py-1 rounded-lg bg-cream/40 border border-cream-dark">Port Phytosanitary Inspection</span>
              <span className="px-3 py-1 rounded-lg bg-cream/40 border border-cream-dark">Transoceanic Tracking</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-cream-dark shadow-sm bg-cream/20 shimmer-sweep">
              <Image
                src="/images/home_ocean_shipping.jpg"
                alt="Container ship and deepwater gantry cranes at Mundra port loading export cargo"
                fill
                className="object-cover object-center img-hover-zoom transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-forest/85 backdrop-blur-md text-ivory text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-pulse-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <span>Ocean Freight Dispatch</span>
              </div>
            </div>
            <div className="mt-2 text-center text-[11px] text-charcoal-muted italic">
              Container vessel loading &bull; Western India seaport export gateway
            </div>
          </div>
        </div>

        <ExportTimeline />
      </section>

      {/* 8. APPLICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Versatile Functional Ingredient"
          title="One Ingredient. Multiple Applications."
          description="Explore how Psyllium Husk provides soluble fiber, hydration, binding, and structural crumb retention across diverse industries."
        />

        <ApplicationTabs />
      </section>

      {/* 9. GLOBAL MARKETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-dark p-8 sm:p-12 lg:p-16 shadow-xs">
          <SectionHeader
            eyebrow="International Trade"
            title="From India to Global Markets"
            description="We aim to build reliable, long-term supply relationships with buyers across international markets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {companyData.targetRegions.map((region) => (
              <div
                key={region.name}
                className="p-6 rounded-2xl bg-cream/30 border border-cream-dark space-y-2 hover:border-forest/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-lg font-bold text-forest">
                    {region.name}
                  </h3>
                  <Globe2 className="w-4 h-4 text-sage" />
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {region.focus}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-charcoal flex items-center gap-1">
                  <span className="text-sage-dark">Seaports:</span>
                  <span>{region.ports}</span>
                </div>
              </div>
            ))}

            {/* Hub info card */}
            <div className="p-6 rounded-2xl bg-forest text-ivory space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-sage">Export Gateway Hub</span>
                <h3 className="font-editorial text-lg font-bold text-ivory mt-1">Surat &bull; Gujarat, India</h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed">
                  Close operational proximity to major western seaports (Mundra Port &amp; Nhava Sheva Port) ensuring streamlined container stuffing and swift bill of lading issuance.
                </p>
              </div>
              <div className="pt-3 border-t border-forest-soft flex items-center justify-between text-xs text-sage font-medium">
                <span>Incoterms: FOB &bull; CFR &bull; CIF</span>
                <Link href="/contact" className="text-ivory hover:underline">
                  Inquire &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL HIGH-CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-forest to-forest-dark text-ivory p-8 sm:p-14 lg:p-16 border border-forest shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-forest-soft text-sage border border-sage/30 inline-block">
              Direct Export Inquiry
            </span>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory leading-tight">
              Looking for Psyllium Husk from India?
            </h2>

            <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
              Tell us your specification, quantity and destination. Our export team in Surat will review your requirement and revert with commercial feasibility.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact#rfq"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-ivory text-forest font-semibold text-sm hover:bg-white transition-all shadow-md"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Direct Contacts */}
            <div className="pt-2 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-sage">Direct Contacts &amp; Export Desks</span>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
              {companyData.contacts.map((contact) => (
                <div key={contact.phone} className="p-3.5 rounded-xl bg-forest-soft/70 border border-sage/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ivory text-sm">{contact.name}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">Export Desk</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <a href={`tel:${contact.phone}`} className="font-semibold text-sage-light hover:text-white transition-colors whitespace-nowrap">
                      {contact.phoneDisplay}
                    </a>
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-ivory bg-sage/40 hover:bg-sage px-2.5 py-1 rounded transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Official Emails & Location */}
            <div className="pt-4 text-xs text-sage/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span>Sales: <a href={`mailto:${companyData.salesEmail}`} className="text-ivory hover:underline font-medium">{companyData.salesEmail}</a></span>
              <span>&bull;</span>
              <span>Info: <a href={`mailto:${companyData.infoEmail}`} className="text-ivory hover:underline font-medium">{companyData.infoEmail}</a></span>
              <span>&bull;</span>
              <span>Location: <span className="text-ivory font-medium">Surat, Gujarat, INDIA.</span></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

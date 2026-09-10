import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { 
  Utensils, 
  Pill, 
  ShieldAlert, 
  Wheat, 
  Zap, 
  PawPrint, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { applicationsData } from '@/data/applicationsData';

export const metadata: Metadata = {
  title: 'Psyllium Husk Applications | Food, Pharma, Nutraceutical & Bakery',
  description:
    'Discover how Psyllium Husk is utilized as a natural soluble fiber, hydrocolloid binder, and structural gluten-free baking ingredient across international industries.',
};

const appImageMap: Record<string, string> = {
  'food-and-beverage': '/images/app_food_beverage.jpg',
  'nutraceuticals': '/images/app_nutraceuticals.jpg',
  'pharmaceutical': '/images/app_pharma_prep.jpg',
  'gluten-free-bakery': '/images/app_bakery_bread.jpg',
  'animal-nutrition': '/images/app_animal_nutrition.jpg',
  'cosmetics-and-personal-care': '/images/app_cosmetics_gel.jpg',
};

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-6 h-6" />,
  Pill: <Pill className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Wheat: <Wheat className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  PawPrint: <PawPrint className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <Breadcrumbs items={[{ label: 'Applications', href: '/applications' }]} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Sector Guide"
          title="One Botanical Ingredient. Multiple Applications."
          description="Psyllium Husk (Plantago ovata) is prized internationally for its extraordinary mucilage-forming capacity, clean-label plant origin, and soluble dietary fiber content. Explore how global formulators deploy it across eight core industry sectors."
          align="left"
        />

        {/* Detailed Industry Cards Stack */}
        <div className="space-y-12 pt-6">
          {applicationsData.map((app) => (
            <div
              key={app.id}
              id={app.id}
              className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-10 lg:p-12 shadow-xs hover:border-sage transition-all duration-300 card-hover group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-sage-light text-forest group-hover:scale-110 transition-transform duration-300">
                      {iconMap[app.icon]}
                    </div>
                    <div>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                        {app.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-charcoal">
                        {app.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-muted leading-relaxed pt-2">
                    {app.summary}
                  </p>

                  <div className="p-4 rounded-xl bg-cream/30 border border-cream-dark space-y-1">
                    <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                      Functional Role in Formulation
                    </div>
                    <p className="text-xs font-semibold text-forest">
                      {app.keyRole}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-cream/20 border border-cream space-y-1">
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                        Recommended Purity
                      </div>
                      <div className="text-xs font-bold text-charcoal">
                        {app.recommendedGrade}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cream/20 border border-cream space-y-1">
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                        Particle / Mesh Discussion
                      </div>
                      <div className="text-xs text-charcoal-muted leading-relaxed">
                        {app.particleSizeDiscussion}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-1">
                      <FileCheck className="w-3.5 h-3.5 text-forest" />
                      <span>Documentation &amp; Compliance Considerations</span>
                    </div>
                    <p className="text-xs text-charcoal-muted bg-cream/20 p-3 rounded-lg border border-cream">
                      {app.documentationConsiderations}
                    </p>
                  </div>
                </div>

                {/* Right Side Visual, Common Formats & CTA */}
                <div className="lg:col-span-5 bg-cream/30 rounded-2xl p-6 border border-cream-dark space-y-5 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    {appImageMap[app.id] && (
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-cream-dark shadow-sm bg-cream/20 shimmer-sweep">
                        <Image
                          src={appImageMap[app.id]}
                          alt={`${app.title} psyllium application`}
                          fill
                          className="object-cover object-center img-hover-zoom transition-transform duration-700"
                          sizes="(max-width: 1024px) 100vw, 35vw"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-forest/85 backdrop-blur-md text-ivory text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-pulse-glow">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                          <span>Formulation Sector</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-xs uppercase font-bold tracking-wider text-charcoal mb-3">
                        Common Downstream Formats
                      </h3>
                      <ul className="space-y-2 text-xs text-charcoal">
                        {app.examples.map((ex, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cream">
                    <Link
                      href={`/contact?product=Psyllium+Husk&application=${encodeURIComponent(app.title)}#rfq`}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-xs"
                    >
                      <span>Quote for {app.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Requirement CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest rounded-3xl text-ivory p-8 sm:p-12 text-center space-y-4 shadow-md">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
            Need a Customized Specification for Your Application?
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 max-w-lg mx-auto leading-relaxed">
            Our export desk can evaluate your target swell volume, mesh size, microbiological parameters, or bulk density requirements against harvest lots.
          </p>
          <div className="pt-2">
            <Link
              href="/contact#rfq"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-ivory text-forest font-semibold text-sm hover:bg-white transition-colors"
            >
              <span>SUBMIT APPLICATION REQUIREMENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

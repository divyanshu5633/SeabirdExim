import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Leaf, ShieldCheck, Package, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { productsCatalog } from '@/data/productsData';

export const metadata: Metadata = {
  title: 'Export Products Catalog | Psyllium Husk & Agri Commodities',
  description:
    'Explore Seabird EXIM’s export products catalog. Specializing in conventional and organic Psyllium Husk (85% to 99% purity) and private-label contract packaging from India.',
};

export default function ProductsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <Breadcrumbs items={[{ label: 'Products', href: '/products' }]} />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Export Product Portfolio"
          title="Agricultural Commodities &amp; Botanical Sourcing"
          description="Seabird EXIM specializes in specification-governed export supply from India. Our primary focus is Psyllium Husk (Plantago ovata), provided across verified purity grades for global food, supplement, and pharmaceutical markets."
          align="left"
        />

        {/* Scalable Catalog Grid */}
        <div className="space-y-12 pt-4">
          {productsCatalog.map((product) => {
            const isFlagship = product.id === 'psyllium-husk';
            const isOrganic = product.id === 'organic-psyllium-husk';

            return (
              <div
                key={product.id}
                className={`bg-white rounded-3xl border ${
                  isFlagship ? 'border-forest/40 ring-1 ring-forest/20 shadow-md' : 'border-cream-dark shadow-xs'
                } p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}
              >
                {/* Product Visual Showcase */}
                <div className="lg:col-span-5 relative">
                  {isFlagship ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-forest-dark via-forest to-forest-light p-6 sm:p-8 text-ivory flex flex-col justify-between shadow-md card-hover group">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-ivory text-[10px] font-bold uppercase tracking-wider">
                          Primary Export Commodity
                        </span>
                        <span className="text-xs font-bold text-gold">85% &ndash; 99% Purity</span>
                      </div>
                      <div className="my-auto py-4 space-y-2">
                        <div className="text-xs font-semibold text-gold-light uppercase tracking-widest">
                          Plantago Ovata &bull; India Origin
                        </div>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
                          Psyllium Husk
                        </h3>
                        <p className="text-xs text-cream/80 leading-relaxed">
                          Natural soluble dietary fiber &amp; hydrocolloid binder. Sourced directly from certified Gujarat &amp; Rajasthan cultivation belts.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20 text-[11px] text-cream/90">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>Whole Flakes &amp; Powders</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>25 KG Export Bags</span>
                        </div>
                      </div>
                    </div>
                  ) : isOrganic ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-emerald-950 via-forest-dark to-forest p-6 sm:p-8 text-ivory flex flex-col justify-between shadow-md card-hover group">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Certified Organic</span>
                        </span>
                        <span className="text-xs font-bold text-gold">NPOP &bull; USDA &bull; EU</span>
                      </div>
                      <div className="my-auto py-4 space-y-2">
                        <div className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">
                          100% Organic Supply Chain
                        </div>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
                          Organic Psyllium
                        </h3>
                        <p className="text-xs text-cream/80 leading-relaxed">
                          Eco-certified without synthetic fertilizers or chemical fumigants. Complete farm-to-consignment traceability documentation.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-700/30 text-[11px] text-cream/90">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Zero Pesticides</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Segregated Processing</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-charcoal via-forest-dark to-forest p-6 sm:p-8 text-ivory flex flex-col justify-between shadow-md card-hover group">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-[10px] font-bold uppercase tracking-wider">
                          OEM &bull; Brand Owners
                        </span>
                        <span className="text-xs font-bold text-gold">Custom Packaging</span>
                      </div>
                      <div className="my-auto py-4 space-y-2">
                        <div className="text-xs font-semibold text-gold-light uppercase tracking-widest">
                          Turnkey Contract Export
                        </div>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-ivory">
                          Private Label Solutions
                        </h3>
                        <p className="text-xs text-cream/80 leading-relaxed">
                          Complete sourcing and packaging coordination. Private labeled export bags, food-contact liners, batch marking, and port logistics.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20 text-[11px] text-cream/90">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>Buyer Artwork Support</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>FCL Container Delivery</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Information */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-sage-dark uppercase tracking-wider">
                    {isFlagship ? <Leaf className="w-4 h-4 text-forest" /> : isOrganic ? <ShieldCheck className="w-4 h-4 text-forest" /> : <Package className="w-4 h-4 text-forest" />}
                    <span>{product.botanicalName}</span>
                  </div>

                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                    {product.title}
                  </h2>

                  <p className="text-sm text-charcoal-muted leading-relaxed">
                    {product.overview}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2">
                    {product.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-charcoal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key specs badge strip */}
                  <div className="pt-3 border-t border-cream flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <span className="text-charcoal-muted">Origin: </span>
                      <span className="font-semibold text-charcoal">{product.origin}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-muted">Packaging: </span>
                      <span className="font-semibold text-charcoal">{product.packaging}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      href={product.href}
                      className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-xs"
                    >
                      <span>{product.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact?product=${encodeURIComponent(product.title)}#rfq`}
                      className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-cream-dark text-charcoal text-xs font-semibold hover:bg-cream/40 transition-colors"
                    >
                      <span>Request Specific Quote</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Commodoties Sourcing Statement */}
        <div className="mt-16 bg-cream/40 rounded-3xl border border-cream-dark p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white text-forest border border-cream-dark inline-block">
            Custom Sourcing Desk
          </span>
          <h3 className="font-editorial text-2xl font-bold text-forest">
            Looking to Source Other Indian Agricultural Commodities?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            While Psyllium Husk remains our primary product focus, Seabird EXIM coordinates specialized trade sourcing for qualified international buyers requiring other agricultural commodities from Gujarat and northwestern India.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?product=Other+Agricultural+Sourcing#rfq"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
            >
              <span>Consult Our Sourcing Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

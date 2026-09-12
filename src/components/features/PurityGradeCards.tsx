import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { puritySpecsData } from '@/data/productsData';

interface PurityGradeCardsProps {
  compact?: boolean;
}

const gradeHighlights: Record<string, { category: string; summary: string }> = {
  '85%': {
    category: 'Bulk Fiber & Feed',
    summary: 'Economical bulk dietary fiber, agricultural animal nutrition, and industrial binding uses.',
  },
  '90%': {
    category: 'Food Blends & Cereals',
    summary: 'General food applications, cereal enrichment, standard dietary formulations, and snack mixes.',
  },
  '95%': {
    category: 'Bakery & Nutrition',
    summary: 'High-volume gluten-free baking, standard food formulations, dietary capsules, and functional bars.',
  },
  '98%': {
    category: 'Premium Supplements',
    summary: 'Premium dietary supplements, effervescent drink mixes, specialty baking, and clean-label foods.',
  },
  '99%': {
    category: 'Pharmaceutical OTC',
    summary: 'Pharmaceutical formulations, premium OTC laxatives, clear-mix sachets, and clinical nutrition.',
  },
};

export default function PurityGradeCards({ compact = false }: PurityGradeCardsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {puritySpecsData.map((spec) => {
          const highlight = gradeHighlights[spec.grade] || {
            category: 'Export Grade',
            summary: spec.typicalUse,
          };

          return (
            <div
              key={spec.grade}
              className="rounded-2xl border transition-all duration-200 flex flex-col justify-between bg-white/80 border-cream-dark hover:border-sage hover:shadow-sm p-5"
            >
              <div>
                <div className="flex items-baseline justify-between border-b border-cream pb-3 mb-3">
                  <span className="font-editorial text-3xl font-bold text-forest">
                    {spec.grade}
                  </span>
                  <span className="text-[11px] font-semibold text-charcoal-muted uppercase tracking-wider">
                    Purity
                  </span>
                </div>

                {compact ? (
                  /* Clean Homepage Overview (No dense laboratory metrics) */
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-sage-light text-forest border border-sage/30">
                        {highlight.category}
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-1">
                        Primary Application
                      </div>
                      <p className="text-[11px] text-charcoal-muted leading-relaxed">
                        {highlight.summary}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Detailed Technical Specification (Product Page View) */
                  <div className="space-y-2.5 text-xs">
                    {spec.description && (
                      <div className="pb-1 border-b border-cream">
                        <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                          Description (USP)
                        </div>
                        <div className="text-[11px] font-medium text-forest italic">
                          {spec.description}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                        Swell Volume
                      </div>
                      <div className="font-medium text-charcoal text-xs">
                        {spec.swellVolume}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                        Foreign Matter (Light / Heavy)
                      </div>
                      <div className="font-medium text-charcoal text-xs">
                        {spec.lightExtraneousMatter} / {spec.heavyExtraneousMatter}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                        Ash / Moisture
                      </div>
                      <div className="font-medium text-charcoal text-xs">
                        {spec.totalAsh} / {spec.moisture}
                      </div>
                    </div>

                    <div className="pt-1">
                      <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-1">
                        Primary Use
                      </div>
                      <p className="text-[11px] text-charcoal-muted leading-relaxed line-clamp-3">
                        {spec.typicalUse}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-cream">
                <Link
                  href={`/contact?product=Psyllium+Husk&purity=${encodeURIComponent(spec.grade)}#rfq`}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-cream/60 text-forest hover:bg-forest hover:text-ivory"
                >
                  <span>Request {spec.grade}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {compact ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-center">
          <Link
            href="/products/psyllium-husk#specifications"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream/60 border border-cream-dark text-xs font-semibold text-forest hover:bg-forest hover:text-ivory transition-colors shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-sage shrink-0" />
            <span>View Full Product Specifications &amp; Detailed Technical Limits on Product Page &rarr;</span>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xs text-charcoal-muted inline-flex items-center gap-1.5 bg-cream/40 px-3 py-1 rounded-full border border-cream-dark">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
            <span>Available grades subject to confirmed batch specification and seasonal harvest parameters.</span>
          </p>
        </div>
      )}
    </div>
  );
}

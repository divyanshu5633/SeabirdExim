import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { puritySpecsData } from '@/data/productsData';

interface PurityGradeCardsProps {
  compact?: boolean;
}

export default function PurityGradeCards({ compact = false }: PurityGradeCardsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        {puritySpecsData.map((spec) => {
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

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                      Swell Volume
                    </div>
                    <div className="font-medium text-charcoal text-xs">
                      {spec.swellVolume}
                    </div>
                  </div>

                  {!compact && (
                    <>
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
                    </>
                  )}

                  <div className="pt-1">
                    <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-1">
                      Primary Use
                    </div>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed line-clamp-3">
                      {spec.typicalUse}
                    </p>
                  </div>
                </div>
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

      <div className="text-center">
        <p className="text-xs text-charcoal-muted inline-flex items-center gap-1.5 bg-cream/40 px-3 py-1 rounded-full border border-cream-dark">
          <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
          <span>Available grades subject to confirmed batch specification and seasonal harvest parameters.</span>
        </p>
      </div>
    </div>
  );
}

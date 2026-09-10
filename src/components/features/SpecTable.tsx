import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { puritySpecsData } from '@/data/productsData';

export default function SpecTable() {
  return (
    <div className="space-y-6">
      {/* Desktop & Tablet Table View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-cream-dark shadow-sm bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-cream/40 border-b border-cream-dark text-charcoal font-semibold">
              <th className="py-4 px-4 font-bold text-sm text-forest">Grade</th>
              <th className="py-4 px-4">Swell Volume</th>
              <th className="py-4 px-4">Light Extraneous</th>
              <th className="py-4 px-4">Heavy Extraneous</th>
              <th className="py-4 px-4">Total Ash</th>
              <th className="py-4 px-4">Moisture</th>
              <th className="py-4 px-4 text-right">Procure</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream/60">
            {puritySpecsData.map((spec) => (
              <tr 
                key={spec.grade} 
                className="hover:bg-cream/20 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-bold text-forest text-base">
                    {spec.grade}
                  </div>
                  <div className="text-[11px] text-charcoal-muted max-w-[180px] truncate">
                    {spec.name}
                  </div>
                </td>
                <td className="py-4 px-4 font-medium text-charcoal">
                  {spec.swellVolume}
                </td>
                <td className="py-4 px-4 text-charcoal-muted">
                  {spec.lightExtraneousMatter}
                </td>
                <td className="py-4 px-4 text-charcoal-muted">
                  {spec.heavyExtraneousMatter}
                </td>
                <td className="py-4 px-4 text-charcoal-muted">
                  {spec.totalAsh}
                </td>
                <td className="py-4 px-4 text-charcoal-muted">
                  {spec.moisture}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/contact?product=Psyllium+Husk&purity=${encodeURIComponent(spec.grade)}#rfq`}
                    className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack View */}
      <div className="md:hidden space-y-4">
        {puritySpecsData.map((spec) => (
          <div
            key={spec.grade}
            className="bg-white rounded-xl border border-cream-dark p-4 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-cream pb-2">
              <span className="font-editorial text-2xl font-bold text-forest">
                {spec.grade}
              </span>
              <span className="text-xs text-charcoal-muted font-medium">Purity Grade</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] uppercase text-charcoal-muted font-semibold block">Swell Volume</span>
                <span className="font-medium text-charcoal">{spec.swellVolume}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-charcoal-muted font-semibold block">Moisture Limit</span>
                <span className="font-medium text-charcoal">{spec.moisture}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-charcoal-muted font-semibold block">Light Foreign Matter</span>
                <span className="font-medium text-charcoal">{spec.lightExtraneousMatter}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-charcoal-muted font-semibold block">Total Ash</span>
                <span className="font-medium text-charcoal">{spec.totalAsh}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-cream flex items-center justify-between">
              <span className="text-[11px] text-charcoal-muted line-clamp-1 flex-1 pr-2">
                {spec.typicalUse}
              </span>
              <Link
                href={`/contact?product=Psyllium+Husk&purity=${encodeURIComponent(spec.grade)}#rfq`}
                className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-forest text-ivory text-xs font-semibold shrink-0"
              >
                <span>Quote</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-cream/40 rounded-xl border border-cream-dark text-xs text-charcoal-muted flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <span>
          Note: Values provided are typical commercial export thresholds. Actual values are subject to confirmed lot analysis and verified on the batch Certificate of Analysis (COA).
        </span>
      </div>
    </div>
  );
}

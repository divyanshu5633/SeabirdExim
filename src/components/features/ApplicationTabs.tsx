'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { applicationsData } from '@/data/applicationsData';

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-5 h-5" />,
  Pill: <Pill className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Wheat: <Wheat className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  PawPrint: <PawPrint className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
};

export default function ApplicationTabs() {
  const [selectedId, setSelectedId] = useState(applicationsData[0].id);

  const selectedApp = applicationsData.find((a) => a.id === selectedId) || applicationsData[0];

  return (
    <div className="space-y-8">
      {/* Industry Tabs Bar (Horizontal scroll on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {applicationsData.map((app) => {
          const isSelected = app.id === selectedId;
          return (
            <button
              type="button"
              key={app.id}
              onClick={() => setSelectedId(app.id)}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-forest text-ivory shadow-sm'
                  : 'bg-white border border-cream-dark text-charcoal hover:bg-cream/40'
              }`}
            >
              <span className={isSelected ? 'text-sage-light' : 'text-forest'}>
                {iconMap[app.icon]}
              </span>
              <span>{app.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Application Feature Panel */}
      <div className="bg-white rounded-2xl border border-cream-dark p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage-dark">
            <span className="p-1.5 rounded bg-sage-light text-forest">
              {iconMap[selectedApp.icon]}
            </span>
            <span>Target Industry Focus</span>
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
            {selectedApp.title}
          </h3>

          <p className="text-sm text-charcoal font-medium">
            {selectedApp.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            {selectedApp.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
              <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                Recommended Purity
              </div>
              <div className="text-xs font-bold text-forest mt-0.5">
                {selectedApp.recommendedGrade}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cream/30 border border-cream-dark">
              <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider">
                Particle / Mesh Guidance
              </div>
              <div className="text-xs font-medium text-charcoal mt-0.5">
                {selectedApp.particleSizeDiscussion}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-forest" />
              <span>Typical Testing &amp; Documentation</span>
            </div>
            <p className="text-xs text-charcoal-muted bg-cream/20 p-2.5 rounded-lg border border-cream">
              {selectedApp.documentationConsiderations}
            </p>
          </div>
        </div>

        {/* Right Info Box & CTA */}
        <div className="lg:col-span-5 bg-cream/30 rounded-xl p-6 border border-cream-dark space-y-5">
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal mb-3">
              Common Product Formats:
            </h4>
            <ul className="space-y-2 text-xs text-charcoal">
              {selectedApp.examples.map((example, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-cream">
            <Link
              href={`/contact?product=Psyllium+Husk&application=${encodeURIComponent(selectedApp.title)}#rfq`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-xs"
            >
              <span>Discuss {selectedApp.title} Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

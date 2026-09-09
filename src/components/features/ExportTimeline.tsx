import React from 'react';
import { exportProcessSteps } from '@/data/exportProcessData';
import { CheckCircle2 } from 'lucide-react';

export default function ExportTimeline() {
  return (
    <div className="space-y-8">
      {/* Desktop Horizontal View */}
      <div className="hidden lg:grid grid-cols-6 gap-4 relative">
        {/* Connecting background track */}
        <div className="absolute top-6 left-8 right-8 h-0.5 bg-cream-dark -z-0" />

        {exportProcessSteps.map((step) => (
          <div key={step.step} className="relative z-10 flex flex-col items-start text-left group">
            {/* Step Number Circle */}
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-forest group-hover:bg-forest group-hover:text-ivory text-forest font-editorial text-lg font-bold flex items-center justify-center transition-colors shadow-sm mb-4">
              {step.step}
            </div>

            <div className="space-y-1.5 pr-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sage-dark">
                {step.tagline}
              </span>
              <h4 className="font-editorial text-base font-bold text-charcoal leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / Tablet Vertical View */}
      <div className="lg:hidden space-y-6 relative border-l-2 border-forest/30 ml-4 pl-6">
        {exportProcessSteps.map((step) => (
          <div key={step.step} className="relative group">
            {/* Circle on the line */}
            <div className="absolute -left-[37px] top-0 w-8 h-8 rounded-lg bg-forest text-ivory text-xs font-bold font-editorial flex items-center justify-center shadow-xs">
              {step.step}
            </div>

            <div className="bg-white rounded-xl border border-cream-dark p-4 shadow-xs space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sage-dark">
                {step.tagline}
              </span>
              <h4 className="font-editorial text-lg font-bold text-forest">
                {step.title}
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {step.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 border-t border-cream">
                {step.details.map((detail, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] text-charcoal px-2 py-0.5 rounded bg-cream/40"
                  >
                    <CheckCircle2 className="w-2.5 h-2.5 text-sage-dark" />
                    <span>{detail}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

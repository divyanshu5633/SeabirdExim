'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

const emptySubscribe = () => () => { };

export default function RFQBuilder() {
  const router = useRouter();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [product] = useState('Psyllium Husk (Plantago ovata)');
  const [purity, setPurity] = useState('');
  const [purityError, setPurityError] = useState(false);
  const [quantity, setQuantity] = useState('10 MT');
  const [packaging, setPackaging] = useState('25 KG Export Bags');
  const [application, setApplication] = useState('Food & Beverage');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const purityOptions = ['85%', '90%', '95%', '98%', '99%'];
  const quantityOptions = ['1 MT (Trial)', '5 MT', '10 MT', '25 MT+ (FCL)', 'Custom'];
  const applicationOptions = [
    'Food & Beverage',
    'Nutraceuticals / Supplements',
    'Pharmaceutical / OTC',
    'Gluten-Free Bakery',
    'Animal Nutrition',
    'Cosmetics / Personal Care',
    'Other Industrial',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purity) {
      setPurityError(true);
      return;
    }
    const params = new URLSearchParams({
      product: 'Psyllium Husk',
      purity,
      quantity,
      packaging,
      application,
      country: destinationCountry,
      message: additionalNotes,
    });
    router.push(`/contact?${params.toString()}#rfq`);
  };

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Decorative top subtle line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sage via-forest to-gold" />

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sage-dark mb-1.5">
          <CheckCircle2 className="w-4 h-4 text-forest" />
          <span>Interactive Procurement Tool</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
          Tell Us What You Need
        </h3>
        <p className="text-sm text-charcoal-muted mt-1">
          Select your target specification below. Our Surat export desk will review lot availability and coordinate an aligned quotation.
        </p>
      </div>

      {!mounted ? (
        <div className="space-y-6 animate-pulse">
          <div>
            <div className="h-3.5 w-28 bg-cream rounded mb-2" />
            <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
          </div>
          <div>
            <div className="h-3.5 w-36 bg-cream rounded mb-2" />
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-14 bg-cream/40 rounded-xl border border-cream-dark" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
            <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
            <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
          </div>
          <div className="h-14 bg-cream/40 rounded-lg border border-cream-dark" />
          <div className="h-12 bg-forest/20 rounded-xl" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Field (Read-only / Focused) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
              Target Commodity
            </label>
            <div className="w-full px-4 py-3 rounded-lg bg-cream/30 border border-cream-dark text-sm font-semibold text-forest flex items-center justify-between">
              <span>{product}</span>
              <span className="text-[11px] font-normal text-charcoal-muted px-2 py-0.5 rounded bg-cream">
                Indian Origin
              </span>
            </div>
          </div>

          {/* Purity Grade Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal">
                Target Purity Grade *
              </label>
              {purityError && !purity ? (
                <span className="text-[11px] text-red-600 font-semibold">
                  Please select a purity grade
                </span>
              ) : (
                <span className="text-[11px] text-charcoal-muted">
                  Subject to confirmed batch spec
                </span>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {purityOptions.map((opt) => {
                const isSelected = purity === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => {
                      setPurity(opt);
                      setPurityError(false);
                    }}
                    className={`py-3 px-2 rounded-xl text-center text-sm font-bold transition-all ${isSelected
                      ? 'bg-forest text-ivory ring-2 ring-forest shadow-md'
                      : 'bg-cream/40 border border-cream-dark text-charcoal hover:bg-cream hover:border-sage'
                      }`}
                  >
                    <div className="text-base sm:text-lg">{opt}</div>
                    <div className={`text-[10px] font-normal mt-0.5 ${isSelected ? 'text-sage-light' : 'text-charcoal-muted'}`}>
                      Grade
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Packaging Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Target Quantity *
              </label>
              <select
                suppressHydrationWarning
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-cream-dark text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
              >
                {quantityOptions.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Packaging Standard
              </label>
              <select
                suppressHydrationWarning
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-cream-dark text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
              >
                <option value="25 KG Export Bags">
                  25 KG Export Bags
                </option>
                <option value="Private Labeled Option">
                  Private Labeled Option
                </option>
              </select>
            </div>
          </div>

          {/* Application & Destination Country Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Downstream Application
              </label>
              <select
                suppressHydrationWarning
                value={application}
                onChange={(e) => setApplication(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-cream-dark text-sm text-charcoal focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
              >
                {applicationOptions.map((app) => (
                  <option key={app} value={app}>
                    {app}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                Destination Country / Port *
              </label>
              <input
                suppressHydrationWarning
                type="text"
                required
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                placeholder="e.g. Rotterdam, Hamburg, Los Angeles, Jebel Ali"
                className="w-full px-4 py-3 rounded-lg bg-white border border-cream-dark text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
              />
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
              Additional Specifications (Mesh, swell volume, or testing criteria)
            </label>
            <textarea
              suppressHydrationWarning
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Share any specific particle size, moisture limits, or microbiological requirements..."
              className="w-full px-4 py-2.5 rounded-lg bg-white border border-cream-dark text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-forest focus:ring-1 focus:ring-forest transition-colors resize-none"
            />
          </div>

          {/* Compliance Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-cream/40 border border-cream-dark text-xs text-charcoal-muted">
            <ShieldAlert className="w-4 h-4 text-forest shrink-0 mt-0.5" />
            <span>
              Purity grades and lots are quoted subject to confirmed batch specifications and seasonal availability. Complete COA documentation coordinated with every shipment.
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-forest text-ivory font-semibold text-sm hover:bg-forest-dark transition-all duration-200 shadow-md group cursor-pointer"
          >
            <span>GET MY QUOTE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Phone, X } from 'lucide-react';
import { companyData } from '@/data/companyData';

export default function StickyMobileCTA() {
  const [showDesk, setShowDesk] = useState(false);

  return (
    <>
      {showDesk && (
        <div 
          className="lg:hidden fixed inset-0 bg-charcoal/50 z-50 backdrop-blur-sm flex items-end justify-center p-3 pb-20"
          onClick={() => setShowDesk(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-2xl border border-cream-dark p-4 shadow-2xl space-y-3 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cream pb-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest block">Direct Contacts &amp; Export Desk</span>
                <span className="text-[10px] text-charcoal-muted">Surat, Gujarat, India</span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowDesk(false)}
                className="w-8 h-8 rounded-lg bg-cream/50 flex items-center justify-center text-charcoal hover:bg-cream active:scale-95 transition-transform cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {companyData.contacts.map((contact) => (
                <div key={contact.phone} className="p-3 rounded-xl bg-cream/30 border border-cream-dark space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sm text-charcoal">{contact.name}</span>
                    <span className="text-[10px] text-sage-dark font-medium">Export Desk</span>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 min-h-[40px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-cream-dark text-forest text-xs font-semibold hover:bg-cream/40 transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                      <span className="whitespace-nowrap">{contact.phoneDisplay}</span>
                    </a>
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] px-3 py-2 rounded-lg bg-sage-light text-forest text-xs font-semibold flex items-center gap-1.5 hover:bg-sage transition-colors"
                      title={`WhatsApp ${contact.name}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-charcoal-muted pt-1.5 border-t border-cream space-y-1">
              <div className="font-semibold text-charcoal text-[10px] uppercase tracking-wider">Official Correspondence:</div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-forest font-medium text-[11px]">
                <a href={`mailto:${companyData.salesEmail}`} className="hover:underline">{companyData.salesEmail}</a>
                <span>&bull;</span>
                <a href={`mailto:${companyData.infoEmail}`} className="hover:underline">{companyData.infoEmail}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside aria-label="Quick export contacts" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-cream-dark p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setShowDesk((prev) => !prev)}
            className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-forest/30 bg-white text-forest text-xs font-semibold hover:bg-cream/40 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Phone className="w-4 h-4 text-forest" />
            <span>Contact Desk</span>
          </button>

          <Link 
            href="/contact#rfq"
            className="flex-[2] min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark active:scale-95 shadow-sm transition-all"
          >
            <span>REQUEST A QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
}

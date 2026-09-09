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
          className="lg:hidden fixed inset-0 bg-charcoal/50 z-40 backdrop-blur-xs flex items-end justify-center p-3 pb-18"
          onClick={() => setShowDesk(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-2xl border border-cream-dark p-4 shadow-2xl space-y-3 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cream pb-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest block">Surat Export Desk</span>
                <span className="text-[10px] text-charcoal-muted">Direct Trade Coordinators</span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowDesk(false)}
                className="w-7 h-7 rounded-lg bg-cream/50 flex items-center justify-center text-charcoal hover:bg-cream"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {companyData.contacts.map((contact) => (
                <div key={contact.phone} className="p-2.5 rounded-xl bg-cream/30 border border-cream-dark space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-charcoal">{contact.name}</span>
                    <span className="text-[10px] text-charcoal-muted">{contact.role}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-white border border-cream-dark text-forest text-xs font-semibold"
                    >
                      <Phone className="w-3 h-3 text-forest" />
                      <span>{contact.phoneDisplay}</span>
                    </a>
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-sage-light text-forest text-xs font-semibold flex items-center gap-1"
                      title={`WhatsApp ${contact.name}`}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-charcoal-muted pt-1 border-t border-cream space-y-0.5">
              <div className="font-semibold text-charcoal text-[10px]">Official Correspondence:</div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-forest font-medium">
                <a href={`mailto:${companyData.salesEmail}`} className="hover:underline">{companyData.salesEmail}</a>
                <span>&bull;</span>
                <a href={`mailto:${companyData.adminEmail}`} className="hover:underline">{companyData.adminEmail}</a>
                <span>&bull;</span>
                <a href={`mailto:${companyData.infoEmail}`} className="hover:underline">{companyData.infoEmail}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside aria-label="Quick export contacts" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-cream-dark p-2.5 shadow-2xl">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setShowDesk((prev) => !prev)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg border border-forest/30 bg-white text-forest text-xs font-semibold hover:bg-cream/40 transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-forest" />
            <span>Coordinators</span>
          </button>

          <Link 
            href="/contact#rfq"
            className="flex-[2] inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark shadow-sm transition-colors"
          >
            <span>REQUEST A QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
}

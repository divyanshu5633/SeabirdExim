import React from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import RFQFullForm from '@/components/features/RFQFullForm';
import { companyData } from '@/data/companyData';

export const metadata: Metadata = {
  title: 'Contact Export Team & Request a Quote | Seabird EXIM',
  description:
    'Connect with Seabird EXIM’s export desk in Surat, Gujarat. Submit your Request for Quotation (RFQ) for Psyllium Husk or speak directly with our trade coordinators.',
};

export default function ContactPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Commercial Inquiries"
          title="Let's Discuss Your Requirement"
          description="Whether you require containerized Psyllium Husk shipments, specific purity grade batch COAs, or pre-shipment evaluation samples, our Surat export operations team is here to assist."
          align="left"
        />

        {/* Master RFQ Form & Live Summary */}
        <div id="rfq" className="pt-2">
          <RFQFullForm />
        </div>

        {/* Operational Trade Office Information */}
        <div className="mt-16 bg-cream/30 rounded-3xl border border-cream-dark p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sage-light text-forest flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest">
                Headquarters &amp; Trade Operations
              </h3>
              <p className="text-charcoal-muted leading-relaxed">
                {companyData.addressDisplay}
                <br />
                Western India Agricultural Trade Corridor
              </p>
              <div className="text-[11px] text-sage-dark font-medium pt-1">
                Close proximity to Mundra Port &amp; Nhava Sheva (JNPT)
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sage-light text-forest flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest">
                Business &amp; Export Hours
              </h3>
              <p className="text-charcoal-muted leading-relaxed">
                Monday &ndash; Saturday: 09:30 &ndash; 18:30 IST (UTC +5:30)
                <br />
                Sunday: Closed for administrative operations
              </p>
              <div className="text-[11px] text-sage-dark font-medium pt-1">
                Urgent RFQs monitored via WhatsApp 24/7
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sage-light text-forest flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-forest">
                Export Compliance Guarantee
              </h3>
              <p className="text-charcoal-muted leading-relaxed">
                All inquiries reviewed by experienced export specialists. Product specifications and commercial offers are documented transparently before contracting.
              </p>
            </div>
          </div>

          {/* Trade Coordinators & Official Emails Grid */}
          <div className="mt-10 pt-10 border-t border-cream-dark/60 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Coordinators Column */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                Direct Contacts &amp; Export Desks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyData.contacts.map((contact) => (
                  <div key={contact.phone} className="p-4 rounded-2xl bg-white border border-cream-dark shadow-xs space-y-2.5">
                    <div>
                      <div className="font-bold text-sm text-forest">{contact.name}</div>
                    </div>
                    <div className="pt-1 flex items-center justify-between">
                      <a href={`tel:${contact.phone}`} className="text-xs font-semibold text-charcoal hover:text-forest flex items-center gap-1.5 whitespace-nowrap">
                        <Phone className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span className="whitespace-nowrap">{contact.phoneDisplay}</span>
                      </a>
                      <a
                        href={contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sage-light hover:bg-sage text-forest text-[11px] font-semibold transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Emails Column */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                Official Electronic Correspondence
              </h4>
              <div className="p-4 rounded-2xl bg-white border border-cream-dark shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-cream/50">
                  <span className="text-charcoal-muted">Commercial / Sales:</span>
                  <a href={`mailto:${companyData.salesEmail}`} className="font-semibold text-forest hover:underline">
                    {companyData.salesEmail}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-cream/50">
                  <span className="text-charcoal-muted">Administrative / Compliance:</span>
                  <a href={`mailto:${companyData.adminEmail}`} className="font-semibold text-forest hover:underline">
                    {companyData.adminEmail}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-charcoal-muted">General Information:</span>
                  <a href={`mailto:${companyData.infoEmail}`} className="font-semibold text-forest hover:underline">
                    {companyData.infoEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

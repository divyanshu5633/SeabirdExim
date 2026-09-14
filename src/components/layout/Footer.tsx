import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  ShieldCheck,
  Globe,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { companyData } from '@/data/companyData';

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-ivory border-t border-forest">
      {/* Upper Trust Strip */}
      <div className="border-b border-forest-soft/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-forest-soft/90 text-gold border border-gold/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">Origin Sourcing</div>
                <div className="text-sm font-medium text-ivory">Gujarat, India</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-forest-soft/90 text-gold border border-gold/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">Available Grades</div>
                <div className="text-sm font-medium text-ivory">85% to 99% Purity</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-forest-soft/90 text-gold border border-gold/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">Quality Verification</div>
                <div className="text-sm font-medium text-ivory">Batch-Specific COA Testing</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-forest-soft/90 text-gold border border-gold/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">Export Desk Hub</div>
                <div className="text-sm font-medium text-ivory">Surat, Gujarat, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block group" aria-label="Seabird EXIM Home">
              <Image
                src="/images/logo-horizontal-white.svg"
                alt="Seabird EXIM"
                width={220}
                height={38}
                className="h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>

            <p className="text-sage text-sm font-editorial italic text-base">
              &ldquo;Connecting Indian quality with global demand.&rdquo;
            </p>

            <p className="text-cream/70 text-xs leading-relaxed max-w-sm">
              Seabird EXIM is an India-based export company focused on connecting international B2B buyers with quality-verified agricultural commodities. Our current focus is Psyllium Husk (Plantago ovata), supplied according to confirmed buyer specifications.
            </p>

            <div className="pt-2 space-y-1.5">
              <span className="text-sage text-[11px] font-semibold block">Direct Contacts &amp; WhatsApp:</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={companyData.contacts[0].whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest text-sage text-xs font-medium hover:text-ivory hover:bg-forest-light transition-colors whitespace-nowrap"
                  title={`WhatsApp ${companyData.contacts[0].name} (${companyData.contacts[0].phoneDisplay})`}
                >
                  <MessageSquare className="w-3 h-3 shrink-0" />
                  <span className="whitespace-nowrap">Divyanshu Patel ({companyData.contacts[0].phoneDisplay})</span>
                </a>
                <a
                  href={companyData.contacts[1].whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest text-sage text-xs font-medium hover:text-ivory hover:bg-forest-light transition-colors whitespace-nowrap"
                  title={`WhatsApp ${companyData.contacts[1].name} (${companyData.contacts[1].phoneDisplay})`}
                >
                  <MessageSquare className="w-3 h-3 shrink-0" />
                  <span className="whitespace-nowrap">Neel Patel ({companyData.contacts[1].phoneDisplay})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-sage font-bold mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <Link href="/products/psyllium-husk" className="hover:text-ivory transition-colors flex items-center gap-1 group">
                  <span>Psyllium Husk</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/products/organic-psyllium-husk" className="hover:text-ivory transition-colors flex items-center gap-1 group">
                  <span>Organic Psyllium Husk</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/products/private-label" className="hover:text-ivory transition-colors flex items-center gap-1 group">
                  <span>Private Label Service</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sage hover:text-ivory font-semibold pt-1 block">
                  All Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Applications Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-sage font-bold mb-4">
              Applications
            </h3>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <Link href="/applications#food-and-beverage" className="hover:text-ivory transition-colors">
                  Food &amp; Beverage
                </Link>
              </li>
              <li>
                <Link href="/applications#nutraceuticals" className="hover:text-ivory transition-colors">
                  Nutraceuticals
                </Link>
              </li>
              <li>
                <Link href="/applications#pharmaceutical" className="hover:text-ivory transition-colors">
                  Pharmaceutical
                </Link>
              </li>
              <li>
                <Link href="/applications#gluten-free-bakery" className="hover:text-ivory transition-colors">
                  Gluten-Free Bakery
                </Link>
              </li>
              <li>
                <Link href="/applications#functional-foods" className="hover:text-ivory transition-colors">
                  Functional Foods
                </Link>
              </li>
              <li>
                <Link href="/applications#animal-nutrition" className="hover:text-ivory transition-colors">
                  Animal Nutrition
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-sage font-bold mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-cream/80">
              <li>
                <Link href="/company" className="hover:text-ivory transition-colors">
                  About Seabird
                </Link>
              </li>
              <li>
                <Link href="/company/certifications" className="hover:text-ivory transition-colors">
                  Quality &amp; Documentation
                </Link>
              </li>
              <li>
                <Link href="/company#export-process" className="hover:text-ivory transition-colors">
                  Export Process
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-ivory transition-colors">
                  Insights Hub
                </Link>
              </li>
              <li>
                <Link href="/insights/blog" className="hover:text-ivory transition-colors">
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link href="/insights/faq" className="hover:text-ivory transition-colors">
                  Buyer FAQ
                </Link>
              </li>
              <li>
                <a 
                  href="/Seabird%20Exim%20Broucher.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-ivory transition-colors flex items-center gap-1 group text-gold font-medium"
                >
                  <span>Company Brochure (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Export Contacts Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-sage font-bold mb-4">
              Direct Contacts &amp; Export Desk
            </h3>
            <div className="space-y-3 text-xs text-cream/80">
              {/* Contact 1 */}
              <div className="space-y-0.5">
                <div className="text-ivory font-semibold">{companyData.contacts[0].name}</div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <a href={`tel:${companyData.contacts[0].phone}`} className="hover:text-sage transition-colors whitespace-nowrap">
                    {companyData.contacts[0].phoneDisplay}
                  </a>
                  <span className="text-sage/40">&bull;</span>
                  <a
                    href={companyData.contacts[0].whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-ivory font-medium underline text-[11px] whitespace-nowrap"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Contact 2 */}
              <div className="space-y-0.5">
                <div className="text-ivory font-semibold">{companyData.contacts[1].name}</div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5">
                  <a href={`tel:${companyData.contacts[1].phone}`} className="hover:text-sage transition-colors whitespace-nowrap">
                    {companyData.contacts[1].phoneDisplay}
                  </a>
                  <span className="text-sage/40">&bull;</span>
                  <a
                    href={companyData.contacts[1].whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage hover:text-ivory font-medium underline text-[11px] whitespace-nowrap"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Official Correspondence Emails */}
              <div className="pt-2 border-t border-forest-soft/40 space-y-1.5 text-[11px]">
                <div className="text-sage font-semibold uppercase tracking-wider text-[10px]">Official Correspondence:</div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-sage shrink-0" />
                  <span className="text-cream/60">Sales:</span>
                  <a href={`mailto:${companyData.salesEmail}`} className="text-cream/90 hover:text-ivory">
                    {companyData.salesEmail}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-sage shrink-0" />
                  <span className="text-cream/60">Admin:</span>
                  <a href={`mailto:${companyData.adminEmail}`} className="text-cream/90 hover:text-ivory">
                    {companyData.adminEmail}
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-sage shrink-0" />
                  <span className="text-cream/60">Info:</span>
                  <a href={`mailto:${companyData.infoEmail}`} className="text-cream/90 hover:text-ivory">
                    {companyData.infoEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-cream/70 pt-1">
                <MapPin className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                <span>{companyData.addressDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Compliance Strip */}
      <div className="border-t border-forest-soft/40 py-6 text-xs text-cream/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            &copy; 2026 Seabird EXIM. All Rights Reserved. &bull; seabirdexim.com &bull; Surat, Gujarat, India
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span>Specification-governed B2B commodity export</span>
            <span className="text-sage/60">&bull;</span>
            <Link href="/contact" className="hover:text-ivory transition-colors">
              Request Quotation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

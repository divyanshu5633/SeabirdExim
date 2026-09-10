'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  PhoneCall, 
  Phone,
  MessageSquare, 
  ShieldCheck, 
  Leaf, 
  Package, 
  Briefcase, 
  BookOpen, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { companyData } from '@/data/companyData';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTimeRef = React.useRef(0);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        openTimeRef.current = Date.now();
      }
      return nextState;
    });
  };

  const closeMobileMenu = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Prevent immediate close if synthetic touch/click arrives within 350ms of opening
    if (Date.now() - openTimeRef.current < 350) {
      return;
    }
    setMobileMenuOpen(false);
  };


  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-cream-dark py-3' 
            : 'bg-ivory/90 backdrop-blur-sm border-b border-cream py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-3 z-10" aria-label="Seabird EXIM Home">
              <Image 
                src="/images/logo-horizontal.svg" 
                alt="Seabird EXIM" 
                width={220} 
                height={38} 
                priority 
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    pathname.startsWith('/products') 
                      ? 'text-forest bg-cream/60' 
                      : 'text-charcoal hover:text-forest hover:bg-cream/40'
                  }`}
                  aria-expanded={activeDropdown === 'products'}
                >
                  Products
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-cream-dark p-3 mt-1 animate-fade-in">
                    <div className="space-y-1">
                      <Link 
                        href="/products/psyllium-husk" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">Psyllium Husk</div>
                          <div className="text-xs text-charcoal-muted">85% to 99% purity grades for food, pharma &amp; OTC</div>
                        </div>
                      </Link>

                      <Link 
                        href="/products/organic-psyllium-husk" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">Organic Psyllium Husk</div>
                          <div className="text-xs text-charcoal-muted">Certified organic supply &amp; pesticide-tested lots</div>
                        </div>
                      </Link>

                      <Link 
                        href="/products/private-label" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">Private Label</div>
                          <div className="text-xs text-charcoal-muted">Custom branding, packaging &amp; export coordination</div>
                        </div>
                      </Link>

                      <div className="pt-2 border-t border-cream">
                        <Link 
                          href="/products" 
                          className="text-xs font-semibold text-forest hover:text-forest-dark flex items-center justify-between px-2.5 py-1"
                        >
                          <span>View All Export Products</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Applications Link */}
              <Link 
                href="/applications"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === '/applications' 
                    ? 'text-forest bg-cream/60' 
                    : 'text-charcoal hover:text-forest hover:bg-cream/40'
                }`}
              >
                Applications
              </Link>

              {/* Company Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    pathname.startsWith('/company') 
                      ? 'text-forest bg-cream/60' 
                      : 'text-charcoal hover:text-forest hover:bg-cream/40'
                  }`}
                  aria-expanded={activeDropdown === 'company'}
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-cream-dark p-3 mt-1 animate-fade-in">
                    <div className="space-y-1">
                      <Link 
                        href="/company" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">About Seabird</div>
                          <div className="text-xs text-charcoal-muted">Our trade model, Surat hub &amp; sourcing philosophy</div>
                        </div>
                      </Link>

                      <Link 
                        href="/company/certifications" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">Quality &amp; Documentation</div>
                          <div className="text-xs text-charcoal-muted">COA parameters, microbial tests &amp; export standards</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Insights Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('insights')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    pathname.startsWith('/insights') 
                      ? 'text-forest bg-cream/60' 
                      : 'text-charcoal hover:text-forest hover:bg-cream/40'
                  }`}
                  aria-expanded={activeDropdown === 'insights'}
                >
                  Insights
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'insights' && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-cream-dark p-3 mt-1 animate-fade-in">
                    <div className="space-y-1">
                      <Link 
                        href="/insights/blog" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">Technical Blog</div>
                          <div className="text-xs text-charcoal-muted">Specification guides, mesh choices &amp; purity analysis</div>
                        </div>
                      </Link>

                      <Link 
                        href="/insights/faq" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">B2B Buyer FAQ</div>
                          <div className="text-xs text-charcoal-muted">MOQs, Incoterms, packaging &amp; sample orders</div>
                        </div>
                      </Link>

                      <Link 
                        href="/insights" 
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cream/40 transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-sage-light text-forest group-hover:bg-forest group-hover:text-ivory transition-colors">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal group-hover:text-forest">Insights Hub</div>
                          <div className="text-xs text-charcoal-muted">Buyer guides &amp; commodity market overview</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Page */}
              <Link 
                href="/contact"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === '/contact' 
                    ? 'text-forest bg-cream/60' 
                    : 'text-charcoal hover:text-forest hover:bg-cream/40'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Header Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Surat Export Desk Dropdown (Both Coordinators & All Emails) */}
              <div 
                className="relative"
                onMouseEnter={() => setContactDropdownOpen(true)}
                onMouseLeave={() => setContactDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setContactDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg border border-cream-dark bg-white hover:bg-cream/40 text-forest text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  aria-expanded={contactDropdownOpen}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-forest" />
                  <span>Surat Desk</span>
                  <ChevronDown className="w-3 h-3 text-charcoal-muted" />
                </button>

                {contactDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl border border-cream-dark shadow-xl p-3.5 space-y-3 z-50">
                    <div className="flex items-center justify-between border-b border-cream pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-forest">Direct Contacts &amp; Export Desk</span>
                      <span className="text-[10px] text-sage-dark font-medium">Surat, Gujarat, India</span>
                    </div>

                    {/* Both Contacts Listed */}
                    <div className="space-y-2">
                      {companyData.contacts.map((contact) => (
                        <div key={contact.phone} className="p-2.5 rounded-lg bg-cream/30 border border-cream-dark space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-charcoal">{contact.name}</span>
                            <span className="text-[10px] text-sage-dark font-medium">Export Desk</span>
                          </div>
                          <div className="flex items-center justify-between text-xs pt-1">
                            <a href={`tel:${contact.phone}`} className="font-semibold text-forest hover:underline flex items-center gap-1 whitespace-nowrap">
                              <Phone className="w-3 h-3 text-sage shrink-0" />
                              <span className="whitespace-nowrap">{contact.phoneDisplay}</span>
                            </a>
                            <a
                              href={contact.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-forest bg-sage-light/80 hover:bg-sage px-2 py-0.5 rounded transition-colors"
                            >
                              <MessageSquare className="w-2.5 h-2.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* All Three Updated Emails */}
                    <div className="border-t border-cream pt-2 space-y-1 text-[11px]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">Official Emails:</div>
                      <div className="flex items-center justify-between text-charcoal">
                        <span className="text-charcoal-muted">Sales:</span>
                        <a href={`mailto:${companyData.salesEmail}`} className="font-medium text-forest hover:underline">
                          {companyData.salesEmail}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-charcoal">
                        <span className="text-charcoal-muted">Admin:</span>
                        <a href={`mailto:${companyData.adminEmail}`} className="font-medium text-forest hover:underline">
                          {companyData.adminEmail}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-charcoal">
                        <span className="text-charcoal-muted">Info:</span>
                        <a href={`mailto:${companyData.infoEmail}`} className="font-medium text-forest hover:underline">
                          {companyData.infoEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Quote CTA */}
              <Link 
                href="/contact#rfq"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest text-ivory text-sm font-medium hover:bg-forest-dark transition-all duration-200 shadow-sm group"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger & Actions */}
            <div className="flex items-center gap-2 lg:hidden relative z-50">
              <Link 
                href="/contact"
                aria-label="Surat Export Desk Contacts"
                className="w-10 h-10 rounded-lg bg-white border border-cream-dark text-forest flex items-center justify-center shadow-xs"
                title="Surat Export Desk Contacts"
              >
                <PhoneCall className="w-4 h-4 text-forest" />
              </Link>

              <button 
                type="button"
                id="mobile-nav-toggle-button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
                className="w-11 h-11 rounded-lg bg-white border border-cream-dark text-forest hover:bg-cream/60 active:scale-95 transition-transform flex items-center justify-center cursor-pointer shadow-xs touch-manipulation"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-forest" />
                ) : (
                  <Menu className="w-5 h-5 text-forest" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        Modern Mobile Slide-out Drawer & Overlay
      */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Darkened backdrop */}
          <div 
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={closeMobileMenu}
          />

          {/* Slide-out Panel */}
          <div 
            className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] h-full bg-ivory shadow-2xl flex flex-col z-10 border-l border-cream-dark overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Drawer */}
            <div className="p-4 border-b border-cream flex items-center justify-between bg-white shrink-0">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <Image 
                  src="/images/logo-horizontal.svg" 
                  alt="Seabird EXIM" 
                  width={180} 
                  height={32} 
                  className="h-7 sm:h-8 w-auto object-contain" 
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg bg-cream/50 text-charcoal hover:bg-cream active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-forest" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 text-sm">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg font-semibold text-charcoal hover:bg-cream/50 transition-colors"
                >
                  Home
                </Link>

                {/* Products Accordion */}
                <div className="border-t border-cream/60 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('mobile-products')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-semibold text-charcoal hover:bg-cream/50 cursor-pointer touch-manipulation"
                  >
                    <span>Products</span>
                    <ChevronDown className={`w-4 h-4 text-forest transition-transform ${activeDropdown === 'mobile-products' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'mobile-products' && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-cream/30 rounded-lg my-1 text-xs">
                      <Link
                        href="/products/psyllium-husk"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-forest hover:underline"
                      >
                        Psyllium Husk (85% &ndash; 99%)
                      </Link>
                      <Link
                        href="/products/organic-psyllium-husk"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        Organic Psyllium Husk
                      </Link>
                      <Link
                        href="/products/private-label"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        Private Label Solutions
                      </Link>
                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-bold text-forest hover:underline pt-1 border-t border-cream"
                      >
                        All Products Catalog &rarr;
                      </Link>
                    </div>
                  )}
                </div>

                {/* Applications Link */}
                <div className="border-t border-cream/60 pt-1">
                  <Link
                    href="/applications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-lg font-semibold text-charcoal hover:bg-cream/50 transition-colors"
                  >
                    Applications
                  </Link>
                </div>

                {/* Company Accordion */}
                <div className="border-t border-cream/60 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('mobile-company')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-semibold text-charcoal hover:bg-cream/50 cursor-pointer touch-manipulation"
                  >
                    <span>Company</span>
                    <ChevronDown className={`w-4 h-4 text-forest transition-transform ${activeDropdown === 'mobile-company' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'mobile-company' && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-cream/30 rounded-lg my-1 text-xs">
                      <Link
                        href="/company"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        About Seabird EXIM
                      </Link>
                      <Link
                        href="/company/certifications"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        Quality &amp; Certifications
                      </Link>
                    </div>
                  )}
                </div>

                {/* Insights Accordion */}
                <div className="border-t border-cream/60 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleDropdown('mobile-insights')}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg font-semibold text-charcoal hover:bg-cream/50 cursor-pointer touch-manipulation"
                  >
                    <span>Insights</span>
                    <ChevronDown className={`w-4 h-4 text-forest transition-transform ${activeDropdown === 'mobile-insights' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'mobile-insights' && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-cream/30 rounded-lg my-1 text-xs">
                      <Link
                        href="/insights"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        Insights Hub
                      </Link>
                      <Link
                        href="/insights/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        Technical Blog &amp; Guides
                      </Link>
                      <Link
                        href="/insights/faq"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 font-medium text-charcoal hover:text-forest"
                      >
                        Buyer FAQ
                      </Link>
                    </div>
                  )}
                </div>

                {/* Contact Link */}
                <div className="border-t border-cream/60 pt-1">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-lg font-semibold text-charcoal hover:bg-cream/50 transition-colors"
                  >
                    Contact &amp; RFQ
                  </Link>
                </div>
              </div>

              {/* Direct Contacts & Export Desk */}
              <div className="pt-3 border-t border-cream space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-cream">
                  <span className="text-xs font-bold uppercase tracking-wider text-forest">Direct Contacts &amp; Export Desk</span>
                  <span className="text-[10px] text-sage-dark font-medium">Surat, India</span>
                </div>

                {/* Both Contacts with Names & Numbers */}
                <div className="space-y-2">
                  {companyData.contacts.map((contact) => (
                    <div key={contact.phone} className="p-2.5 rounded-xl bg-white border border-cream-dark shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-charcoal">{contact.name}</span>
                        <span className="text-[10px] text-sage-dark font-medium">Export Desk</span>
                      </div>
                      <div className="flex items-center gap-2 pt-0.5">
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex-1 min-h-[38px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-cream/50 text-forest text-xs font-semibold hover:bg-cream transition-colors whitespace-nowrap"
                        >
                          <Phone className="w-3 h-3 text-forest shrink-0" />
                          <span className="whitespace-nowrap">{contact.phoneDisplay}</span>
                        </a>
                        <a
                          href={contact.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[38px] p-2 rounded-lg bg-sage-light text-forest hover:bg-sage transition-colors flex items-center justify-center"
                          title={`WhatsApp ${contact.name}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Official Emails */}
                <div className="p-2.5 rounded-xl bg-white border border-cream-dark text-[11px] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">Official Emails:</div>
                  <div className="flex items-center justify-between text-charcoal">
                    <span className="text-charcoal-muted">Sales:</span>
                    <a href={`mailto:${companyData.salesEmail}`} className="font-medium hover:text-forest">
                      {companyData.salesEmail}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-charcoal">
                    <span className="text-charcoal-muted">Admin:</span>
                    <a href={`mailto:${companyData.adminEmail}`} className="font-medium hover:text-forest">
                      {companyData.adminEmail}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-charcoal">
                    <span className="text-charcoal-muted">Info:</span>
                    <a href={`mailto:${companyData.infoEmail}`} className="font-medium hover:text-forest">
                      {companyData.infoEmail}
                    </a>
                  </div>
                </div>

                <Link
                  href="/contact#rfq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-sm"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

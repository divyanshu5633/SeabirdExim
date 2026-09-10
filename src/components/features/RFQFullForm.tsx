'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  Send,
  MessageSquare,
  ShieldCheck,
  FileText,
  Clock,
  Building2,
  User,
  Mail,
  Phone,
  Globe2
} from 'lucide-react';
import { companyData } from '@/data/companyData';

const emptySubscribe = () => () => { };

function RFQFormContent() {
  const searchParams = useSearchParams();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [formData, setFormData] = useState(() => ({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phoneWhatsapp: '',
    country: searchParams.get('country') || '',
    product: searchParams.get('product') || 'Psyllium Husk',
    purity: searchParams.get('purity') || '',
    quantity: searchParams.get('quantity') || '10 MT',
    packaging: searchParams.get('packaging') || '25 KG Export Bags',
    destinationPort: '',
    application: searchParams.get('application') || 'Food & Beverage',
    message: searchParams.get('message') || '',
  }));

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    isSimulated?: boolean;
    message?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSubmitStatus({
        success: data.success === true,
        isSimulated: data.isSimulated,
        message: data.error || data.message,
      });
    } catch (err) {
      console.error('Error submitting RFQ to API:', err);
      setSubmitStatus({
        success: false,
        message: 'Could not connect to email server. You can forward this inquiry via WhatsApp or direct email below.',
      });
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  // Generate mailto link prefilled with all specifications
  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`[New RFQ] ${formData.product} (${formData.purity}) - ${formData.quantity} from ${formData.companyName || formData.fullName}`);
    const body = encodeURIComponent(
      `SEABIRD EXIM - PURCHASE ENQUIRY / RFQ\n` +
      `=====================================\n\n` +
      `BUYER & CONTACT DETAILS:\n` +
      `------------------------\n` +
      `Full Name: ${formData.fullName}\n` +
      `Company Name: ${formData.companyName || 'Not specified'}\n` +
      `Business Email: ${formData.businessEmail}\n` +
      `Phone / WhatsApp: ${formData.phoneWhatsapp || 'Not provided'}\n` +
      `Destination Country: ${formData.country}\n` +
      `Destination Port: ${formData.destinationPort || 'TBD'}\n\n` +
      `PRODUCT SPECIFICATIONS:\n` +
      `-----------------------\n` +
      `Product: ${formData.product}\n` +
      `Target Purity: ${formData.purity}\n` +
      `Target Quantity: ${formData.quantity}\n` +
      `Packaging Preference: ${formData.packaging}\n` +
      `Downstream Application: ${formData.application}\n\n` +
      `SPECIAL INSTRUCTIONS / TECHNICAL NOTES:\n` +
      `---------------------------------------\n` +
      `${formData.message || 'No additional notes'}\n\n` +
      `Sent via Seabird EXIM Procurement Desk`
    );
    return `mailto:sales@seabirdexim.com?cc=admin@seabirdexim.com,info@seabirdexim.com&subject=${subject}&body=${body}`;
  };

  // Generate WhatsApp message query
  const generateWhatsAppUrl = (phone = companyData.contacts[0].phone) => {
    const text = encodeURIComponent(
      `*New RFQ from ${formData.companyName || 'Buyer'}*\n` +
      `*Contact:* ${formData.fullName}\n` +
      `*Email:* ${formData.businessEmail}\n` +
      `*Country:* ${formData.country}\n` +
      `*Product:* ${formData.product} (${formData.purity})\n` +
      `*Quantity:* ${formData.quantity}\n` +
      `*Packaging:* ${formData.packaging}\n` +
      `*Port:* ${formData.destinationPort || 'TBD'}\n` +
      `*Application:* ${formData.application}\n` +
      `*Notes:* ${formData.message || 'N/A'}`
    );
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left / Main RFQ Form */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl border border-cream-dark p-6 sm:p-8 lg:p-10 shadow-lg">
          {isSubmitted ? (
            submitStatus?.success === false ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
                    Email Dispatch Could Not Be Completed
                  </h3>
                  <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                    {submitStatus.message || 'We encountered an issue connecting to the mail server to dispatch your RFQ automatically.'}
                  </p>
                  <p className="text-xs text-charcoal-muted max-w-md mx-auto pt-1">
                    Your inquiry details are preserved below. Please use either of our direct options to forward your specifications immediately to our Surat export desk.
                  </p>
                </div>

                {/* Direct Options: Email & WhatsApp */}
                <div className="pt-2 space-y-3">
                  <div className="text-xs font-semibold text-charcoal">
                    Direct Contact Options:
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateMailtoUrl()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-forest bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-sm"
                      title="Send via your email client (Gmail / Outlook)"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email to sales@seabirdexim.com</span>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                    <a
                      href={generateWhatsAppUrl(companyData.contacts[0].phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-light text-forest text-xs font-semibold hover:bg-sage transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Divyanshu Patel ({companyData.contacts[0].phoneDisplay})</span>
                    </a>
                    <a
                      href={generateWhatsAppUrl(companyData.contacts[1].phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-light text-forest text-xs font-semibold hover:bg-sage transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Neel Patel ({companyData.contacts[1].phoneDisplay})</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-cream">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 rounded-xl border border-cream-dark text-charcoal text-xs font-medium hover:bg-cream/40 transition-colors cursor-pointer"
                  >
                    Edit &amp; Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-sage-light text-forest rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-charcoal">{formData.fullName}</span>. Our export operations team in Surat will review your requirement for{' '}
                    <span className="font-semibold text-forest">{formData.product} ({formData.purity})</span> and revert with commercial terms and batch specification feasibility.
                  </p>

                  {submitStatus?.isSimulated && (
                    <div className="mt-3 p-3 rounded-xl bg-cream/60 border border-cream-dark text-xs text-charcoal-muted max-w-lg mx-auto text-left space-y-1">
                      <div className="font-semibold text-forest">Inquiry Captured (Awaiting SMTP Setup):</div>
                      <div>
                        To deliver emails automatically via our server, add your SMTP email credentials to <code className="bg-cream px-1 rounded font-mono text-[11px]">.env.local</code>.
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons: Email & WhatsApp */}
                <div className="pt-2 space-y-3">
                  <div className="text-xs font-semibold text-charcoal">
                    Direct Dispatch Options:
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={generateMailtoUrl()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-forest bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-sm"
                      title="Send via your email client (Gmail / Outlook)"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email to sales@seabirdexim.com</span>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                    <a
                      href={generateWhatsAppUrl(companyData.contacts[0].phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-light text-forest text-xs font-semibold hover:bg-sage transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Divyanshu Patel ({companyData.contacts[0].phoneDisplay})</span>
                    </a>
                    <a
                      href={generateWhatsAppUrl(companyData.contacts[1].phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-light text-forest text-xs font-semibold hover:bg-sage transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Neel Patel ({companyData.contacts[1].phoneDisplay})</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-cream">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 rounded-xl border border-cream-dark text-charcoal text-xs font-medium hover:bg-cream/40 transition-colors cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            )
          ) : !mounted ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-6 w-48 bg-cream rounded" />
              <div className="h-3 w-80 bg-cream/60 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
                <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
                <div className="h-11 bg-cream/40 rounded-lg border border-cream-dark" />
              </div>
              <div className="h-24 bg-cream/40 rounded-lg border border-cream-dark" />
              <div className="h-12 bg-forest/20 rounded-xl" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-forest">
                  Request for Quotation (RFQ)
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Fields marked with an asterisk (*) are required to coordinate an accurate export quotation.
                </p>
              </div>

              {/* Section 1: Contact Details */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-sage-dark flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>1. Buyer Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        suppressHydrationWarning
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. David Mueller"
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Company / Organization Name *
                    </label>
                    <div className="relative">
                      <input
                        suppressHydrationWarning
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Alpine Nutrition GmbH"
                        className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Business Email *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="email"
                      name="businessEmail"
                      required
                      value={formData.businessEmail}
                      onChange={handleChange}
                      placeholder="procurement@company.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="tel"
                      name="phoneWhatsapp"
                      required
                      value={formData.phoneWhatsapp}
                      onChange={handleChange}
                      placeholder="+49 170 1234567"
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Country of Import *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. Germany, USA, UAE"
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Product & Specification Parameters */}
              <div className="space-y-4 pt-4 border-t border-cream">
                <div className="text-xs font-bold uppercase tracking-wider text-sage-dark flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>2. Commodity &amp; Technical Requirements</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Product *
                    </label>
                    <select
                      suppressHydrationWarning
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest"
                    >
                      <option value="Psyllium Husk">Psyllium Husk</option>
                      <option value="Organic Psyllium Husk">Organic Psyllium Husk</option>
                      <option value="Private Label Psyllium">Private Label Psyllium</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Purity Grade
                    </label>
                    <select
                      suppressHydrationWarning
                      name="purity"
                      value={formData.purity}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest"
                    >
                      <option value="">Select Purity Grade</option>
                      <option value="85%">85% Purity</option>
                      <option value="90%">90% Purity</option>
                      <option value="95%">95% Purity</option>
                      <option value="98%">98% Purity</option>
                      <option value="99%">99% Purity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Target Volume *
                    </label>
                    <select
                      suppressHydrationWarning
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest"
                    >
                      <option value="1 MT (Trial Evaluation)">1 MT (Trial Evaluation)</option>
                      <option value="5 MT">5 MT</option>
                      <option value="10 MT">10 MT</option>
                      <option value="20ft FCL (~9-12 MT)">20ft FCL (~9-12 MT)</option>
                      <option value="40ft FCL (~20-25 MT)">40ft FCL (~20-25 MT)</option>
                      <option value="Multi-Container Annual Contract">Multi-Container Contract</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Packaging Standard
                    </label>
                    <select
                      suppressHydrationWarning
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest"
                    >
                      <option value="25 KG Export Bags">
                        25 KG Export Bags
                      </option>
                      <option value="Private Labeled Option">
                        Private Labeled Option
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Destination Port / Terminal
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="destinationPort"
                      value={formData.destinationPort}
                      onChange={handleChange}
                      placeholder="e.g. Rotterdam, Hamburg, Jebel Ali"
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Downstream Application
                    </label>
                    <select
                      suppressHydrationWarning
                      name="application"
                      value={formData.application}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest"
                    >
                      <option value="Food & Beverage">Food &amp; Beverage</option>
                      <option value="Nutraceuticals / Supplements">Nutraceuticals / Supplements</option>
                      <option value="Pharmaceutical / Clinical">Pharmaceutical / Clinical</option>
                      <option value="Gluten-Free Bakery">Gluten-Free Bakery</option>
                      <option value="Functional Foods">Functional Foods</option>
                      <option value="Animal Nutrition">Animal Nutrition</option>
                      <option value="Cosmetics & Personal Care">Cosmetics &amp; Personal Care</option>
                      <option value="Technical / Industrial">Technical / Industrial</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Technical Specifications & Message */}
              <div className="space-y-4 pt-4 border-t border-cream">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">
                    Specification Details &amp; Specific Inquiries *
                  </label>
                  <textarea
                    suppressHydrationWarning
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify any particular swell volume (e.g. ≥ 50 ml/g), particle mesh size, microbiological limits, COA parameters, or sample requests..."
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest resize-y"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-forest text-ivory font-semibold text-sm hover:bg-forest-dark transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting RFQ...' : 'SEND ENQUIRY'}</span>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
                  <a
                    href={generateWhatsAppUrl(companyData.contacts[0].phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl border border-cream-dark bg-cream/40 text-forest font-semibold text-xs hover:bg-cream transition-colors"
                    title={`Send via WhatsApp to ${companyData.contacts[0].name} (${companyData.contacts[0].phoneDisplay})`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Divyanshu Patel ({companyData.contacts[0].phoneDisplay})</span>
                  </a>
                  <a
                    href={generateWhatsAppUrl(companyData.contacts[1].phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl border border-cream-dark bg-cream/40 text-forest font-semibold text-xs hover:bg-cream transition-colors"
                    title={`Send via WhatsApp to ${companyData.contacts[1].name} (${companyData.contacts[1].phoneDisplay})`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Neel Patel ({companyData.contacts[1].phoneDisplay})</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right / Live RFQ Summary & Direct Contacts */}
      <div className="lg:col-span-4 space-y-6">
        {/* Live Specification Summary Card */}
        <div className="bg-white rounded-2xl border border-cream-dark p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest mb-4 pb-3 border-b border-cream">
            <FileText className="w-4 h-4 text-forest" />
            <span>RFQ Selection Summary</span>
          </div>

          <dl className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Product</dt>
              <dd className="font-semibold text-charcoal">{formData.product}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Purity Grade</dt>
              <dd className="font-semibold text-forest">{formData.purity}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Estimated Volume</dt>
              <dd className="font-semibold text-charcoal">{formData.quantity}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Packaging</dt>
              <dd className="font-semibold text-charcoal">{formData.packaging}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Application</dt>
              <dd className="font-semibold text-charcoal">{formData.application}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Country / Port</dt>
              <dd className="font-semibold text-charcoal">
                {formData.country || 'Not specified'} {formData.destinationPort ? `(${formData.destinationPort})` : ''}
              </dd>
            </div>
          </dl>

          <div className="mt-5 p-3 rounded-lg bg-cream/40 border border-cream-dark text-[11px] text-charcoal-muted space-y-1">
            <div className="font-semibold text-forest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Sourcing Partner</span>
            </div>
            <p>
              Pre-shipment samples and batch COAs are coordinated according to confirmed contract specifications.
            </p>
          </div>
        </div>

        {/* Direct Contacts Card */}
        <div className="bg-white rounded-2xl border border-cream-dark p-6 shadow-sm space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-sage-dark">
            Direct Contacts &amp; Export Desk
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-cream/30 border border-cream-dark space-y-1.5">
              <div className="font-bold text-sm text-forest">{companyData.contacts[0].name}</div>
              <div className="pt-1 flex items-center justify-between">
                <a
                  href={`tel:${companyData.contacts[0].phone}`}
                  className="font-medium text-charcoal hover:text-forest flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span className="whitespace-nowrap">{companyData.contacts[0].phoneDisplay}</span>
                </a>
                <a
                  href={companyData.contacts[0].whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest hover:text-forest-dark font-semibold text-[11px] whitespace-nowrap"
                >
                  WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cream/30 border border-cream-dark space-y-1.5">
              <div className="font-bold text-sm text-forest">{companyData.contacts[1].name}</div>
              <div className="pt-1 flex items-center justify-between">
                <a
                  href={`tel:${companyData.contacts[1].phone}`}
                  className="font-medium text-charcoal hover:text-forest flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span className="whitespace-nowrap">{companyData.contacts[1].phoneDisplay}</span>
                </a>
                <a
                  href={companyData.contacts[1].whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest hover:text-forest-dark font-semibold text-[11px]"
                >
                  WhatsApp &rarr;
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-cream text-xs text-charcoal-muted space-y-2">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Official Emails</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <span className="text-charcoal-muted">Sales:</span>
                <a href={`mailto:${companyData.salesEmail}`} className="hover:text-forest font-medium text-forest">
                  {companyData.salesEmail}
                </a>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-charcoal-muted">Admin:</span>
                <a href={`mailto:${companyData.adminEmail}`} className="hover:text-forest font-medium text-forest">
                  {companyData.adminEmail}
                </a>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-charcoal-muted">Info:</span>
                <a href={`mailto:${companyData.infoEmail}`} className="hover:text-forest font-medium text-forest">
                  {companyData.infoEmail}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-forest" />
              <span>Surat, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-forest" />
              <span>Typical RFQ review: 24 to 48 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RFQFullForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-charcoal-muted">Loading procurement form...</div>}>
      <RFQFormContent />
    </Suspense>
  );
}

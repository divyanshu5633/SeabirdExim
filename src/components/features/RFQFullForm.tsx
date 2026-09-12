'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  MessageSquare,
  ShieldCheck,
  FileText,
  Clock,
  User,
  Building2,
  Mail,
  Phone,
  Globe2,
} from 'lucide-react';
import { companyData } from '@/data/companyData';
import SearchableCountrySelect from '@/components/ui/SearchableCountrySelect';
import InternationalPhoneInput from '@/components/ui/InternationalPhoneInput';
import { findCountry } from '@/data/countriesData';

const emptySubscribe = () => () => {};

function RFQFormContent() {
  const searchParams = useSearchParams();
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Parse initial values from searchParams if available
  const initialPurityParam = searchParams.get('purity') || '';
  let initialGrade = '';
  if (initialPurityParam) {
    if (initialPurityParam.includes('%') && !initialPurityParam.includes('Purity')) {
      initialGrade = `${initialPurityParam} Purity`;
    } else {
      initialGrade = initialPurityParam;
    }
  }

  const initialQtyParam = searchParams.get('quantity') || '';
  let initialQtyNum = '';
  let initialQtyUnit: 'MT' | 'KG' = 'MT';
  if (initialQtyParam) {
    const match = initialQtyParam.match(/([\d.]+)\s*(MT|KG)?/i);
    if (match) {
      initialQtyNum = match[1];
      if (match[2] && match[2].toUpperCase() === 'KG') {
        initialQtyUnit = 'KG';
      }
    }
  }

  const initialCountry = searchParams.get('country') || '';
  const countryObj = findCountry(initialCountry);

  const [formData, setFormData] = useState(() => ({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phoneWhatsapp: '',
    country: initialCountry,
    product: searchParams.get('product') || 'Psyllium Husk',
    grade: initialGrade,
    quantityNum: initialQtyNum,
    quantityUnit: initialQtyUnit,
    message: searchParams.get('message') || '',
  }));

  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    companyName?: string;
    businessEmail?: string;
    phoneWhatsapp?: string;
    country?: string;
    quantityNum?: string;
  }>({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    isSimulated?: boolean;
    message?: string;
  } | null>(null);

  // Grade options
  const gradeOptions = [
    '85% Purity',
    '90% Purity',
    '95% Purity',
    '98% Purity',
    '99% Purity',
    'Not Sure / Need Guidance',
  ];

  const handleCountryChange = (countryName: string) => {
    setFormData((prev) => ({ ...prev, country: countryName }));
    if (formErrors.country) {
      setFormErrors((prev) => ({ ...prev, country: undefined }));
    }
  };

  const handlePhoneChange = (fullNumber: string) => {
    setFormData((prev) => ({ ...prev, phoneWhatsapp: fullNumber }));
    if (formErrors.phoneWhatsapp) {
      setFormErrors((prev) => ({ ...prev, phoneWhatsapp: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'Please enter your company or organization name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = 'Please enter your business email.';
    } else if (!emailRegex.test(formData.businessEmail.trim())) {
      errors.businessEmail = 'Please enter a valid email address.';
    }

    if (!formData.phoneWhatsapp.trim()) {
      errors.phoneWhatsapp = 'Please enter your Phone or WhatsApp number.';
    } else {
      // Check that at least some digits are entered
      const digits = formData.phoneWhatsapp.replace(/\D/g, '');
      if (digits.length < 6) {
        errors.phoneWhatsapp = 'Please enter a valid phone number.';
      }
    }

    if (!formData.country.trim()) {
      errors.country = 'Please select your destination country.';
    }

    if (formData.quantityNum) {
      const num = parseFloat(formData.quantityNum);
      if (isNaN(num) || num <= 0) {
        errors.quantityNum = 'Quantity must be a positive number.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formattedQuantity = formData.quantityNum.trim()
      ? `${formData.quantityNum.trim()} ${formData.quantityUnit}`
      : '';

    const payload = {
      fullName: formData.fullName.trim(),
      companyName: formData.companyName.trim(),
      businessEmail: formData.businessEmail.trim(),
      phoneWhatsapp: formData.phoneWhatsapp.trim(),
      country: formData.country.trim(),
      product: formData.product,
      grade: formData.grade.trim() || undefined,
      quantity: formattedQuantity || undefined,
      message: formData.message.trim() || undefined,
    };

    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        message:
          'Could not connect to the email server. You can forward this inquiry directly via WhatsApp or email below.',
      });
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  // Generate mailto link prefilled with simplified first inquiry
  const generateMailtoUrl = () => {
    const formattedQty = formData.quantityNum.trim()
      ? `${formData.quantityNum.trim()} ${formData.quantityUnit}`
      : 'Not specified';
    const gradeText = formData.grade || 'Need Guidance';
    const subject = encodeURIComponent(
      `[New Website Inquiry] Psyllium Husk from ${formData.companyName || formData.fullName || 'Buyer'} (${formData.country || 'International'})`
    );
    const body = encodeURIComponent(
      `NEW WEBSITE INQUIRY\n` +
      `==================\n\n` +
      `BUYER DETAILS:\n` +
      `Full Name: ${formData.fullName}\n` +
      `Company: ${formData.companyName || 'Not specified'}\n` +
      `Business Email: ${formData.businessEmail}\n` +
      `Phone / WhatsApp: ${formData.phoneWhatsapp || 'Not provided'}\n` +
      `Country: ${formData.country || 'Not specified'}\n\n` +
      `PRODUCT REQUIREMENT:\n` +
      `Product: ${formData.product}\n` +
      `Grade: ${gradeText}\n` +
      `Estimated Quantity: ${formattedQty}\n` +
      `Message / Requirement: ${formData.message || 'None'}\n\n` +
      `Sent via Seabird EXIM Website Procurement Desk`
    );
    return `mailto:sales@seabirdexim.com?cc=admin@seabirdexim.com,info@seabirdexim.com&subject=${subject}&body=${body}`;
  };

  // Generate WhatsApp message query
  const generateWhatsAppUrl = (phone = companyData.contacts[0].phone) => {
    const formattedQty = formData.quantityNum.trim()
      ? `${formData.quantityNum.trim()} ${formData.quantityUnit}`
      : 'Not specified';
    const text = encodeURIComponent(
      `*New Website Inquiry*\n` +
      `*Buyer:* ${formData.fullName || 'Buyer'} (${formData.companyName || 'Company'})\n` +
      `*Email:* ${formData.businessEmail || 'N/A'}\n` +
      `*Country:* ${formData.country || 'N/A'}\n` +
      `*Product:* ${formData.product}\n` +
      `*Grade:* ${formData.grade || 'Need Guidance'}\n` +
      `*Quantity:* ${formattedQty}\n` +
      `*Notes:* ${formData.message || 'N/A'}`
    );
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  const formattedQuantityDisplay = formData.quantityNum.trim()
    ? `${formData.quantityNum.trim()} ${formData.quantityUnit}`
    : 'Not specified';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left / Main Simplified Form */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl border border-cream-dark p-6 sm:p-8 lg:p-10 shadow-lg">
          {isSubmitted ? (
            submitStatus?.success === false ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-200">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl font-bold text-charcoal">
                    Submission Notice
                  </h3>
                  <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                    {submitStatus.message ||
                      'We encountered an issue submitting your inquiry automatically.'}
                  </p>
                  <p className="text-xs text-charcoal-muted max-w-md mx-auto pt-1">
                    Your details are preserved. You can forward your inquiry directly to our export desk via WhatsApp or email:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={generateMailtoUrl()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </a>
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage-light text-forest text-xs font-semibold hover:bg-sage transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-cream">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-xl border border-cream-dark text-charcoal text-xs font-medium hover:bg-cream/40 transition-colors"
                  >
                    Edit Inquiry Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto border border-forest/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-forest">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-charcoal-muted max-w-lg mx-auto">
                    Thank you, <strong className="text-charcoal">{formData.fullName}</strong>. Your inquiry for{' '}
                    <strong className="text-charcoal">{formData.product}</strong> has been transmitted to our Surat export desk.
                  </p>
                  <p className="text-xs text-charcoal-muted max-w-md mx-auto pt-1">
                    Our trade team will review your requirement and follow up promptly with specification alignment and commercial details.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cream/40 border border-cream-dark max-w-md mx-auto text-left text-xs space-y-1.5">
                  <div className="font-semibold text-forest">Submitted Summary:</div>
                  <div className="text-charcoal-muted">
                    <span className="font-medium text-charcoal">Company:</span> {formData.companyName}
                  </div>
                  <div className="text-charcoal-muted">
                    <span className="font-medium text-charcoal">Destination:</span> {formData.country}
                  </div>
                  <div className="text-charcoal-muted">
                    <span className="font-medium text-charcoal">Grade:</span> {formData.grade || 'Need Guidance'}
                  </div>
                  <div className="text-charcoal-muted">
                    <span className="font-medium text-charcoal">Quantity:</span> {formattedQuantityDisplay}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        businessEmail: '',
                        phoneWhatsapp: '',
                        country: '',
                        product: 'Psyllium Husk',
                        grade: '',
                        quantityNum: '',
                        quantityUnit: 'MT',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-cream-dark text-charcoal text-xs font-semibold hover:bg-cream/40 transition-colors"
                  >
                    Submit Another Inquiry
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
              {/* Form Heading & Supporting Copy */}
              <div className="border-b border-cream pb-4">
                <h3 className="font-editorial text-2xl font-bold text-forest">
                  Request a Commercial Quotation
                </h3>
                <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                  Share your basic requirement and our export team will get back to you with the relevant product and commercial details.
                </p>
              </div>

              {/* SECTION 1 — YOUR DETAILS */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-sage-dark flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Section 1 &bull; Your Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                        if (formErrors.fullName) {
                          setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder="e.g. David Mueller"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden transition-colors ${
                        formErrors.fullName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-cream-dark focus:border-forest focus:ring-1 focus:ring-forest'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, companyName: e.target.value }));
                        if (formErrors.companyName) {
                          setFormErrors((prev) => ({ ...prev, companyName: undefined }));
                        }
                      }}
                      placeholder="e.g. Alpine Nutrition GmbH"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden transition-colors ${
                        formErrors.companyName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-cream-dark focus:border-forest focus:ring-1 focus:ring-forest'
                      }`}
                    />
                    {formErrors.companyName && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">
                        {formErrors.companyName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, businessEmail: e.target.value }));
                        if (formErrors.businessEmail) {
                          setFormErrors((prev) => ({ ...prev, businessEmail: undefined }));
                        }
                      }}
                      placeholder="procurement@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-hidden transition-colors ${
                        formErrors.businessEmail
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-cream-dark focus:border-forest focus:ring-1 focus:ring-forest'
                      }`}
                    />
                    {formErrors.businessEmail && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">
                        {formErrors.businessEmail}
                      </p>
                    )}
                  </div>

                  {/* Phone / WhatsApp with International Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <InternationalPhoneInput
                      value={formData.phoneWhatsapp}
                      defaultCountryCode={countryObj?.code || 'US'}
                      onChange={handlePhoneChange}
                      error={formErrors.phoneWhatsapp}
                      placeholder="Number"
                    />
                  </div>

                  {/* Country Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Country *
                    </label>
                    <SearchableCountrySelect
                      value={formData.country}
                      onChange={handleCountryChange}
                      error={formErrors.country}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2 — YOUR REQUIREMENT */}
              <div className="space-y-4 pt-4 border-t border-cream">
                <div className="text-xs font-bold uppercase tracking-wider text-sage-dark flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Section 2 &bull; Your Requirement</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Product Field (Focused strictly on Psyllium Husk) */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Product
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-lg border border-cream-dark bg-cream/30 text-sm font-semibold text-forest flex items-center justify-between">
                      <span>{formData.product}</span>
                      <span className="text-[10px] text-sage-dark font-mono uppercase bg-white px-2 py-0.5 rounded border border-cream-dark">
                        Whole Husk
                      </span>
                    </div>
                  </div>

                  {/* Grade Selector (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-charcoal">
                        Grade
                      </label>
                      <span className="text-[11px] text-charcoal-muted">Optional</span>
                    </div>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, grade: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-cream-dark text-sm bg-white focus:border-forest focus:ring-1 focus:ring-forest focus:outline-hidden"
                    >
                      <option value="">Select Grade (Optional)</option>
                      {gradeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Quantity [ Number ] [ Unit ] (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-charcoal">
                        Estimated Quantity
                      </label>
                      <span className="text-[11px] text-charcoal-muted">Optional</span>
                    </div>
                    <div className="flex rounded-lg border border-cream-dark bg-white overflow-hidden focus-within:border-forest focus-within:ring-1 focus-within:ring-forest">
                      <input
                        type="number"
                        min="0.01"
                        step="any"
                        name="quantityNum"
                        value={formData.quantityNum}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, quantityNum: e.target.value }));
                          if (formErrors.quantityNum) {
                            setFormErrors((prev) => ({ ...prev, quantityNum: undefined }));
                          }
                        }}
                        placeholder="e.g. 10"
                        className="w-full px-3.5 py-2 text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-hidden"
                      />
                      <select
                        name="quantityUnit"
                        value={formData.quantityUnit}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            quantityUnit: e.target.value as 'MT' | 'KG',
                          }))
                        }
                        className="px-3 py-2 text-xs font-semibold text-forest bg-cream/30 border-l border-cream-dark focus:outline-hidden cursor-pointer"
                      >
                        <option value="MT">MT</option>
                        <option value="KG">KG</option>
                      </select>
                    </div>
                    {formErrors.quantityNum && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">
                        {formErrors.quantityNum}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message / Requirement (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-charcoal">
                      Message / Requirement
                    </label>
                    <span className="text-[11px] text-charcoal-muted">Optional</span>
                  </div>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-3.5 py-3 rounded-lg border border-cream-dark text-sm focus:border-forest focus:ring-1 focus:ring-forest focus:outline-hidden resize-y placeholder:text-charcoal-muted"
                  />
                </div>
              </div>

              {/* Submit CTA Button & Supporting Text */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-forest text-ivory font-semibold text-sm hover:bg-forest-dark transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'REQUEST A QUOTE →'}</span>
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={generateWhatsAppUrl(companyData.contacts[0].phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-cream-dark bg-cream/30 text-forest font-semibold text-xs hover:bg-cream/60 transition-colors"
                      title={`Quick inquiry via WhatsApp with ${companyData.contacts[0].name}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>

                <p className="text-[11px] text-charcoal-muted text-center sm:text-left leading-relaxed">
                  Share your basic requirement and our export team will get back to you with the relevant product and commercial details.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right / Live Selection Summary & Direct Contacts */}
      <div className="lg:col-span-4 space-y-6">
        {/* Live Selection Summary Card */}
        <div className="bg-white rounded-2xl border border-cream-dark p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest mb-4 pb-3 border-b border-cream">
            <FileText className="w-4 h-4 text-forest" />
            <span>Inquiry Summary</span>
          </div>

          <dl className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Product</dt>
              <dd className="font-semibold text-charcoal">{formData.product}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Target Grade</dt>
              <dd className="font-semibold text-forest">
                {formData.grade || 'Not specified / Need guidance'}
              </dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Estimated Volume</dt>
              <dd className="font-semibold text-charcoal">{formattedQuantityDisplay}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-cream/50">
              <dt className="text-charcoal-muted">Destination</dt>
              <dd className="font-semibold text-charcoal">
                {formData.country || 'Not selected'}
              </dd>
            </div>
          </dl>

          <div className="mt-5 p-3 rounded-lg bg-cream/40 border border-cream-dark text-[11px] text-charcoal-muted space-y-1">
            <div className="font-semibold text-forest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Two-Stage Procurement Process</span>
            </div>
            <p>
              This first inquiry initiates direct contact. Detailed parameters (packaging, testing, documentation, shipping terms) are finalized during qualification.
            </p>
          </div>
        </div>

        {/* Direct Contacts Card */}
        <div className="bg-white rounded-2xl border border-cream-dark p-6 shadow-sm space-y-5">
          <div className="text-xs font-bold uppercase tracking-wider text-sage-dark">
            Direct Contacts &amp; Export Desks
          </div>

          <div className="space-y-3.5 text-xs">
            {companyData.contacts.map((contact) => (
              <div
                key={contact.phone}
                className="p-3.5 rounded-xl bg-cream/30 border border-cream-dark space-y-1.5"
              >
                <div className="font-bold text-sm text-forest">{contact.name}</div>
                <div className="pt-1 flex items-center justify-between">
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-medium text-charcoal hover:text-forest flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span className="whitespace-nowrap">{contact.phoneDisplay}</span>
                  </a>
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest hover:text-forest-dark font-semibold text-[11px] whitespace-nowrap"
                  >
                    WhatsApp &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-cream text-xs text-charcoal-muted space-y-2">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Official Correspondence</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <span className="text-charcoal-muted">Sales:</span>
                <a
                  href={`mailto:${companyData.salesEmail}`}
                  className="hover:text-forest font-medium text-forest"
                >
                  {companyData.salesEmail}
                </a>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-charcoal-muted">Admin:</span>
                <a
                  href={`mailto:${companyData.adminEmail}`}
                  className="hover:text-forest font-medium text-forest"
                >
                  {companyData.adminEmail}
                </a>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-charcoal-muted">Info:</span>
                <a
                  href={`mailto:${companyData.infoEmail}`}
                  className="hover:text-forest font-medium text-forest"
                >
                  {companyData.infoEmail}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
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
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-charcoal-muted">
          Loading procurement form...
        </div>
      }
    >
      <RFQFormContent />
    </Suspense>
  );
}

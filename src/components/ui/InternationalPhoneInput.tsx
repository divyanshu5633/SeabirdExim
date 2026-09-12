'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { countries, Country, findCountry } from '@/data/countriesData';

interface InternationalPhoneInputProps {
  value: string; // Complete international number or national number
  onChange: (fullNumber: string, countryCode: string, nationalNumber: string) => void;
  defaultCountryCode?: string; // ISO code like 'US', 'GB', 'IN', 'AE'
  required?: boolean;
  error?: string;
  id?: string;
  placeholder?: string;
}

export default function InternationalPhoneInput({
  value,
  onChange,
  defaultCountryCode = 'US',
  required = false,
  error,
  id = 'phone-input',
  placeholder = 'Phone / WhatsApp number',
}: InternationalPhoneInputProps) {
  // Find initial country based on defaultCountryCode
  const initialCountry =
    countries.find((c) => c.code.toUpperCase() === defaultCountryCode.toUpperCase()) ||
    countries[0];

  const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountry);
  const [nationalNumber, setNationalNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Initialize from incoming value if present
  useEffect(() => {
    if (!value) return;
    const trimmed = value.trim();
    if (trimmed.startsWith('+')) {
      // Find matching dialCode from our countries list
      const matched = countries.find((c) => trimmed.startsWith(c.dialCode));
      if (matched) {
        setSelectedCountry(matched);
        const rest = trimmed.slice(matched.dialCode.length).trim();
        setNationalNumber(rest);
        return;
      }
    }
    // If not starting with +, treat as national number unless already set
    if (!nationalNumber && trimmed) {
      setNationalNumber(trimmed);
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when popover opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Filter countries by search query
  const filteredCountries = countries.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dialCode.includes(q)
    );
  });

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    const full = nationalNumber.trim() ? `${country.dialCode} ${nationalNumber.trim()}` : '';
    onChange(full, country.code, nationalNumber.trim());
    phoneInputRef.current?.focus();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    // If user pasted a full number with leading +, detect country code
    if (inputVal.startsWith('+')) {
      const matched = countries.find((c) => inputVal.startsWith(c.dialCode));
      if (matched) {
        setSelectedCountry(matched);
        inputVal = inputVal.slice(matched.dialCode.length).trim();
      }
    }
    setNationalNumber(inputVal);
    const full = inputVal.trim() ? `${selectedCountry.dialCode} ${inputVal.trim()}` : '';
    onChange(full, selectedCountry.code, inputVal.trim());
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center rounded-lg border bg-white transition-colors overflow-hidden ${
          error
            ? 'border-red-400 focus-within:border-red-500'
            : isOpen
            ? 'border-forest ring-1 ring-forest'
            : 'border-cream-dark hover:border-sage focus-within:border-forest focus-within:ring-1 focus-within:ring-forest'
        }`}
      >
        {/* Country Code Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-2.5 bg-cream/30 hover:bg-cream/60 border-r border-cream-dark text-xs sm:text-sm font-semibold text-charcoal transition-colors shrink-0 focus:outline-hidden"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
        >
          <span className="text-base leading-none" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="font-mono text-forest font-bold">{selectedCountry.dialCode}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-charcoal-muted transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-forest' : ''
            }`}
          />
        </button>

        {/* National Number Input */}
        <input
          ref={phoneInputRef}
          id={id}
          type="tel"
          required={required}
          value={nationalNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 text-sm text-charcoal bg-transparent placeholder:text-charcoal-muted focus:outline-hidden min-w-0"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-[11px] text-red-600 mt-1 font-medium">{error}</p>}

      {/* Country Calling Code Searchable Popover */}
      {isOpen && (
        <div className="absolute z-50 left-0 mt-1 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] bg-white rounded-xl border border-cream-dark shadow-xl overflow-hidden animate-fade-in">
          <div className="p-2 border-b border-cream bg-cream/20">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-md border border-cream-dark focus:border-forest focus:ring-1 focus:ring-forest outline-hidden"
              />
            </div>
          </div>

          <ul
            role="listbox"
            className="max-h-56 overflow-y-auto py-1 divide-y divide-cream/40 text-xs focus:outline-hidden"
          >
            {filteredCountries.length === 0 ? (
              <li className="px-4 py-6 text-center text-charcoal-muted text-xs">
                No matching country found
              </li>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry.code === c.code;
                return (
                  <li
                    key={`phone-${c.code}-${c.name}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleCountrySelect(c)}
                    className={`px-3 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-forest/10 font-semibold text-forest'
                        : 'text-charcoal hover:bg-cream/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none shrink-0" role="img" aria-label={c.name}>
                        {c.flag}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-mono text-forest font-semibold">{c.dialCode}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-forest" />}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

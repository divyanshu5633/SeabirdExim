'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Globe } from 'lucide-react';
import { countries, Country } from '@/data/countriesData';

interface SearchableCountrySelectProps {
  value: string;
  onChange: (countryName: string) => void;
  required?: boolean;
  error?: string;
  id?: string;
}

export default function SearchableCountrySelect({
  value,
  onChange,
  required = false,
  error,
  id = 'country-select',
}: SearchableCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected country
  const selectedCountry = countries.find(
    (c) => c.name.toLowerCase() === value.trim().toLowerCase()
  );

  // Filter countries based on search query
  const filteredCountries = countries.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dialCode.includes(q)
    );
  });

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelect = (country: Country) => {
    onChange(country.name);
    closeDropdown();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input for HTML form validation compatibility */}
      <input
        type="text"
        tabIndex={-1}
        className="sr-only"
        required={required}
        value={value}
        onChange={() => {}}
        aria-hidden="true"
      />

      {/* Main trigger button */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-colors text-left focus:outline-hidden focus:ring-2 focus:ring-forest/30 ${
          error
            ? 'border-red-400 focus:border-red-500'
            : isOpen
            ? 'border-forest ring-1 ring-forest'
            : 'border-cream-dark hover:border-sage'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 truncate">
          {selectedCountry ? (
            <>
              <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
                {selectedCountry.flag}
              </span>
              <span className="font-medium text-charcoal truncate">{selectedCountry.name}</span>
            </>
          ) : value ? (
            <>
              <Globe className="w-4 h-4 text-sage shrink-0" />
              <span className="font-medium text-charcoal truncate">{value}</span>
            </>
          ) : (
            <span className="text-charcoal-muted">Select Country...</span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-charcoal-muted transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-forest' : ''
          }`}
        />
      </button>

      {/* Error message */}
      {error && <p className="text-[11px] text-red-600 mt-1 font-medium">{error}</p>}

      {/* Dropdown popover */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl border border-cream-dark shadow-xl overflow-hidden animate-fade-in max-w-full">
          {/* Search bar inside dropdown */}
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

          {/* Scrollable country list */}
          <ul
            role="listbox"
            className="max-h-60 overflow-y-auto py-1 divide-y divide-cream/40 text-xs focus:outline-hidden"
          >
            {filteredCountries.length === 0 ? (
              <li className="px-4 py-6 text-center text-charcoal-muted text-xs">
                No matching countries found
              </li>
            ) : (
              filteredCountries.map((c) => {
                const isSelected =
                  value.trim().toLowerCase() === c.name.toLowerCase();
                return (
                  <li
                    key={`${c.code}-${c.name}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c)}
                    className={`px-3.5 py-2 flex items-center justify-between cursor-pointer transition-colors ${
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
                      <span className="text-[11px] text-charcoal-muted font-mono">{c.code}</span>
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

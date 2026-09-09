'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionEntry {
  id: string;
  title: string;
  content: string | React.ReactNode;
  category?: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`border rounded-xl transition-colors duration-200 overflow-hidden ${
              isOpen ? 'border-forest/40 bg-white shadow-xs' : 'border-cream-dark bg-cream/30 hover:border-sage'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 pr-4">
                {item.category && (
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded bg-sage-light text-forest shrink-0">
                    {item.category}
                  </span>
                )}
                <span className="text-base font-semibold text-charcoal leading-snug">
                  {item.title}
                </span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-cream/70 text-forest shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180 bg-forest text-ivory' : ''
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-charcoal-muted leading-relaxed border-t border-cream/50 animate-in fade-in duration-150">
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

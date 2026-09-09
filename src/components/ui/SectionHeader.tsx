import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-3 mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2">
          <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${
            dark 
              ? 'bg-forest text-sage border border-sage/30' 
              : 'bg-sage-light text-forest border border-sage/40'
          }`}>
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className={`font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
        dark ? 'text-ivory' : 'text-forest'
      }`}>
        {title}
      </h2>

      {description && (
        <p className={`text-base sm:text-lg font-normal leading-relaxed ${
          dark ? 'text-cream/80' : 'text-charcoal-muted'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}

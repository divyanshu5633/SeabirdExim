import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sage' | 'forest' | 'gold' | 'outline' | 'cream';
  className?: string;
}

export default function Badge({
  children,
  variant = 'sage',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    sage: 'bg-sage-light text-forest border border-sage/40',
    forest: 'bg-forest text-ivory border border-forest-dark',
    gold: 'bg-cream text-charcoal border border-gold/40',
    outline: 'bg-transparent text-charcoal border border-cream-dark',
    cream: 'bg-cream text-charcoal-muted border border-cream-dark',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

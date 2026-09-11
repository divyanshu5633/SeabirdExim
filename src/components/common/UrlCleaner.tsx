'use client';

import { useEffect } from 'react';

export default function UrlCleaner() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      if (sp.has('skip') || sp.has('home') || sp.has('enter') || sp.has('direct')) {
        sp.delete('skip');
        sp.delete('home');
        sp.delete('enter');
        sp.delete('direct');
        const query = sp.toString();
        const newUrl = window.location.pathname + (query ? `?${query}` : '') + window.location.hash;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  return null;
}

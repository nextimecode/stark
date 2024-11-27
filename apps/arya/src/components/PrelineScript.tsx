'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      const preline = await import('preline');
      preline.HSStaticMethods.autoInit();
    };

    loadPreline();
  }, [path]);

  return null;
}

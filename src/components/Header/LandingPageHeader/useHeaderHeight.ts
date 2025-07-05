import { useEffect, useRef } from 'react';

export const useHeaderHeight = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();

        // Calculate total height
        const totalHeight = rect.height;

        // Update CSS variable
        document.documentElement.style.setProperty(
          '--header-height-desktop-landing-page',
          `${totalHeight}px`
        );
      }
    };

    // Initial update
    updateHeaderHeight();

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updateHeaderHeight);

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return headerRef;
};

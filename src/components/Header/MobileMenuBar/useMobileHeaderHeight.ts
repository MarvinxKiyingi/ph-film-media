import { useEffect, useRef } from 'react';

export const useMobileHeaderHeight = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const lastHeightRef = useRef<number>(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const totalHeight = rect.height + 20; // Add top margin (mt-5 = 20px)

        // Only update if height has changed (avoid unnecessary DOM operations)
        if (lastHeightRef.current !== totalHeight) {
          lastHeightRef.current = totalHeight;

          // Use RAF for better performance
          requestAnimationFrame(() => {
            document.documentElement.style.setProperty(
              '--header-height-mobile',
              `${totalHeight}px`
            );
          });
        }
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return headerRef;
};

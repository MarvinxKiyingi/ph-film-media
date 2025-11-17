'use client';

import { useEffect, useState, useRef } from 'react';
import {
  VIEW_TRANSITION_CONFIG,
  debugLog,
} from '@/config/viewTransitionConfig';

/**
 * Hook that detects when ViewTransition is complete and safe to trigger animations
 * Solves the conflict between next-view-transitions and Framer Motion's whileInView
 *
 * The issue: During ViewTransitions, the Intersection Observer (used by Framer Motion's
 * whileInView) cannot properly detect elements entering the viewport. With viewport: { once: true },
 * if the observer misses the element, it never animates and stays invisible.
 *
 * Solution: This hook waits for ViewTransitions to complete before triggering animations,
 * ensuring Intersection Observer works correctly.
 *
 * @returns boolean - true when it's safe to start animations
 */
export function useViewTransitionReady() {
  const [isReady, setIsReady] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Check if ViewTransition API is supported
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      debugLog('ViewTransition API detected, waiting for completion...');

      const startTime = performance.now();

      // Wait for ViewTransition to complete using double requestAnimationFrame
      // This ensures we're past the transition's DOM manipulation phase
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Add configurable delay to ensure Intersection Observer is ready
          timeoutRef.current = setTimeout(() => {
            const endTime = performance.now();
            debugLog(
              `Animation ready after ${(endTime - startTime).toFixed(2)}ms`
            );
            setIsReady(true);
          }, VIEW_TRANSITION_CONFIG.animationDelay);
        });
      });
    } else {
      // No ViewTransition support, safe to animate immediately
      debugLog('No ViewTransition API support, animating immediately');
      setIsReady(true);
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return isReady;
}

/**
 * Hook that provides a stable key for animations that resets on pathname change
 * but waits for ViewTransitions to complete
 *
 * This prevents React from remounting components during ViewTransitions, which can
 * cause elements to disappear or animations to not trigger.
 *
 * @param pathname - current pathname from usePathname()
 * @returns object with isReady state and animationKey for React keys
 */
export function useViewTransitionAnimation(pathname: string) {
  const isReady = useViewTransitionReady();
  const [animationKey, setAnimationKey] = useState(pathname);
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    // Only update the key when:
    // 1. The pathname has actually changed
    // 2. The ViewTransition is ready
    if (pathname !== previousPathnameRef.current && isReady) {
      setAnimationKey(pathname);
      previousPathnameRef.current = pathname;
    } else if (pathname === previousPathnameRef.current && isReady) {
      // Same pathname, just ensure key is set correctly
      setAnimationKey(pathname);
    }
  }, [pathname, isReady]);

  return { isReady, animationKey };
}

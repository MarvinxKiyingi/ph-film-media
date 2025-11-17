/**
 * Configuration for ViewTransition and Framer Motion coordination
 *
 * Adjust these values if you experience timing issues on slower devices
 * or need to fine-tune the animation behavior.
 */

export const VIEW_TRANSITION_CONFIG = {
  /**
   * Delay in milliseconds after ViewTransition completes before triggering animations
   *
   * Default: 50ms
   * - Increase if animations still occasionally don't trigger (e.g., 100ms)
   * - Decrease for faster perceived performance (minimum: 0ms, not recommended)
   *
   * Note: This is in addition to the double requestAnimationFrame wait
   */
  animationDelay: 50,

  /**
   * Whether to enable debug logging for ViewTransition timing
   *
   * Default: false
   * Set to true during development to see timing information in console
   */
  debugMode: false,

  /**
   * Stagger delay between animated items in milliseconds
   *
   * Default: 50ms (0.05s)
   * Used in components like MovieClubGrid to create cascading animations
   */
  staggerDelay: 50,
} as const;

/**
 * Type-safe helper to get config values
 */
export const getViewTransitionConfig = () => VIEW_TRANSITION_CONFIG;

/**
 * Helper to log debug information when debug mode is enabled
 */
export const debugLog = (...args: unknown[]) => {
  if (VIEW_TRANSITION_CONFIG.debugMode) {
    console.log('[ViewTransition Debug]', ...args);
  }
};

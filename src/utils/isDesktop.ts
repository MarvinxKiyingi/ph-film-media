import { useMediaQuery } from 'react-responsive';

export const useIsDesktop = () =>
  useMediaQuery({ query: '(min-width: 1024px)' });

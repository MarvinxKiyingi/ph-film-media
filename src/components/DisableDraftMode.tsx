// src/components/DisableDraftMode.tsx

'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  return (
    <a
      href='/api/draft-mode/disable'
      className='fixed bottom-4 right-4 bg-gray-50 px-8 py-4 rounded-[8px]'
    >
      Disable Draft Mode
    </a>
  );
}

'use client';

import React, { useState } from 'react';

interface ClickableEmailProps {
  email: string;
}

const ClickableEmail = ({ email }: ClickableEmailProps) => {
  const [emailText, setEmailText] = useState(email);

  const handleEmailClick = async () => {
    if (!email) return;

    // Check if clipboard API is available
    if (!navigator?.clipboard?.writeText) {
      console.warn('Clipboard API not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setEmailText('Email copied!');

      // Revert back to original email after 3 seconds
      setTimeout(() => {
        setEmailText(email);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <p
      className='flex flex-wrap text-h-28 font-oswald uppercase border-b border-gray pb-1 lg:border-b-0 lg:pb-0 lg:w-full cursor-pointer transition-colors duration-200'
      onClick={handleEmailClick}
      title='Click to copy email'
    >
      {emailText}
    </p>
  );
};

export default ClickableEmail;

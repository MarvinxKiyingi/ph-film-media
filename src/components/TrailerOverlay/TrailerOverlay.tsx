'use client';
import React, { useState, useEffect } from 'react';
import { TrailerType } from '../../../sanity.types';

// Helper to extract video ID and platform from full URL
const extractVideoInfo = (
  url: string
): { platform: 'youtube' | 'vimeo' | null; id: string | null } => {
  // YouTube
  const ytRegExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|watch)\??(?:\S*?)(?:\?|&)v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = url.match(ytRegExp);
  if (ytMatch) return { platform: 'youtube', id: ytMatch[1] };

  // Vimeo
  // Handles vimeo.com/12345678, vimeo.com/channels/staffpicks/12345678, player.vimeo.com/video/12345678
  const vimeoRegExp =
    /(?:vimeo\.com\/(?:.*\/)?|player\.vimeo\.com\/video\/)([0-9]{6,12})/;
  const vimeoMatch = url.match(vimeoRegExp);
  if (vimeoMatch) return { platform: 'vimeo', id: vimeoMatch[1] };

  return { platform: null, id: null };
};

type ITrailerOverlay = {
  trailer: TrailerType;
  triggerIcon?: React.ReactNode;
};

const TrailerOverlay = ({ trailer, triggerIcon }: ITrailerOverlay) => {
  const [isOpen, setIsOpen] = useState(false);
  const { platform, id: videoId } = extractVideoInfo(
    trailer.trailerLink?.externalLink ?? ''
  );

  useEffect(() => {
    if (isOpen) {
      // Save current overflow style
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const openOverlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };
  const closeOverlay = () => setIsOpen(false);

  if (!videoId || !platform) {
    return <p>Invalid YouTube or Vimeo URL</p>;
  }

  let embedUrl = '';
  if (platform === 'youtube') {
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (platform === 'vimeo') {
    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }

  return (
    <div>
      <button
        onClick={openOverlay}
        className='text-b-16 text-white underline underline-offset-4 cursor-pointer'
        style={{ textDecorationThickness: '1.2px' }}
      >
        {triggerIcon ? triggerIcon : (trailer.trailerLinkLabel ?? 'Trailer')}
      </button>

      {isOpen && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeOverlay();
          }}
          className='fixed inset-0 z-backdrop bg-black/70 flex justify-center items-center cursor-pointer'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='relative w-full aspect-video z-overlay m-[5%] pointer-events-auto'
          >
            <iframe
              className='w-full h-full rounded-lg'
              src={embedUrl}
              title={
                platform === 'youtube' ? 'YouTube trailer' : 'Vimeo trailer'
              }
              allow={
                platform === 'youtube'
                  ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  : 'autoplay; fullscreen; picture-in-picture'
              }
              allowFullScreen
            />
          </div>
          <button
            onClick={closeOverlay}
            className='absolute top-2 right-2 text-white text-b-28 p-2 cursor-pointer'
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default TrailerOverlay;

'use client';
import React, { useState } from 'react';
import { MenuButton } from '../MenuButton/MenuButton';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SocialIcons from '@/components/Icons/SocialIcons';
import type { FetchHeaderResult } from '../../../../sanity.types';

const overlayVariants = {
  open: { opacity: 0.4, transition: { duration: 0.12, ease: 'easeInOut' } },
  closed: { opacity: 0, transition: { duration: 0.12, ease: 'easeInOut' } },
};

const menuVariants = {
  open: { height: 'auto', opacity: 1 },
  closed: { height: 0, opacity: 0 },
};

type IMobileMenuBar = {
  data: FetchHeaderResult;
};

const MobileMenuBar: React.FC<IMobileMenuBar> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return null;

  const { linkReference, socialMediaLinks, homeMenuItemLabel } = data;

  return (
    <div className='flex flex-col items-center fixed top-5 w-full lg:hidden'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-[100] h-full w-full bg-black'
            variants={overlayVariants}
            initial='closed'
            animate='open'
            exit='closed'
            aria-hidden={!isOpen}
            onClick={() => setIsOpen(false)}
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
          />
        )}
      </AnimatePresence>
      <div
        className='flex flex-col bg-white text-black justify-between w-full max-w-[352px] z-[101] rounded-[3px] lg:hidden'
        role='dialog'
        aria-modal='true'
        tabIndex={-1}
      >
        <div className='flex w-full items-center justify-between px-4 py-2.5 gap-4'>
          <motion.div
            className='flex items-center gap-4 min-h-[30px] flex-1'
            animate={isOpen ? { x: 9.6, y: 9.6 } : { x: 0, y: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            <MenuButton
              color='var(--color-black)'
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-h-base font-oswald uppercase leading-[1] cursor-pointer w-full text-start'
              tabIndex={0}
              role='button'
              aria-label='Menu'
              aria-pressed={isOpen}
            >
              Menu
            </button>
          </motion.div>
          <motion.div
            className='flex items-center'
            animate={isOpen ? { x: -9.6, y: 9.6 } : { x: 0, y: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            {socialMediaLinks?.map((link) => (
              <Link
                key={link._key}
                href={link.href || ''}
                target='_blank'
                rel='noopener noreferrer'
              >
                <SocialIcons
                  href={link.href ?? undefined}
                  color='var(--color-black)'
                />
              </Link>
            ))}
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              key='menu'
              variants={menuVariants}
              initial='closed'
              animate='open'
              exit='closed'
              transition={{ duration: 0.15, ease: 'easeIn' }}
              style={{ originY: 0, willChange: 'height, opacity' }}
              className='flex flex-col items-start text-b-lg w-full max-w-[352px] bg-white text-black p-6 overflow-hidden gap-3 rounded-bl-[3px] rounded-br-[3px]'
            >
              <li className='pt-3 border-t border-gray w-full'>
                <Link
                  href='/'
                  className='flex'
                  onClick={() => setIsOpen(false)}
                >
                  {homeMenuItemLabel ? homeMenuItemLabel : 'Home'}
                </Link>
              </li>

              {linkReference?.map((link) =>
                link._type === 'externalLink' ? (
                  <li
                    key={link._key}
                    className='pt-3 border-t border-gray w-full'
                  >
                    <Link
                      href={link.link?.href || ''}
                      className='flex'
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={() => setIsOpen(false)}
                    >
                      {link.linkLabel}
                    </Link>
                  </li>
                ) : link._type === 'internalLink' ? (
                  <li
                    key={link._key}
                    className='pt-3 border-t border-gray w-full'
                  >
                    <Link
                      href={`/${link.page?.slug?.current || ''}`}
                      className='flex'
                      onClick={() => setIsOpen(false)}
                    >
                      {link.page?.title}
                    </Link>
                  </li>
                ) : null
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileMenuBar;

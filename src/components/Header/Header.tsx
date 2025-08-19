import MobileMenuBar from './MobileMenuBar/MobileMenuBar';
import { sanityFetch } from '@/sanity/lib/live';
import { fetchHeader } from '@/sanity/lib/queries';
import HeaderLogo from './HeaderLogo';
import BlurDown from './MobileMenuBar/BlurDown';
import DesktopMenuBar from './DesktopMenuBar';
import LandingPageHeader from './LandingPageHeader';

type IHeader = {
  isLandingPage?: boolean;
};

const Header = async ({ isLandingPage = false }: IHeader) => {
  const { data: header } = await sanityFetch({ query: fetchHeader });

  return (
    <>
      {isLandingPage && (
        <LandingPageHeader header={header} isLandingPage={isLandingPage} />
      )}

      {!isLandingPage && (
        <nav
          className='max-lg:min-h-[51.48px] max-lg:mt-5 z-40 lg:grid lg:gap-2 lg:grid-cols-2 lg:items-center fixed lg:w-full lg:top-0 lg:left-0 lg:right-0 lg:h-[var(--header-height-desktop)]'
          role='navigation'
          aria-label='Main menu'
        >
          <BlurDown />
          <div className='z-50 lg:grid lg:grid-cols-2 lg:items-center lg:px-10 lg:py-4 lg:top-0 lg:fixed lg:w-full'>
            <HeaderLogo />
            <MobileMenuBar header={header} />
            <DesktopMenuBar header={header} />
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;

// max-lg:hidden flex max-lg:flex-col

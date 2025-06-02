import Instagram from './Instagram';
import { ISocialIcons } from '@/types/ISocialIcons';

const SocialIcons = ({
  href,
  color = 'var(--color-white)',
  width = 20,
  height = 20,
}: ISocialIcons) => {
  const SOCIAL_ICON_MAP: { [key: string]: React.ReactNode } = {
    instagram: <Instagram color={color} width={width} height={height} />,
  };
  const getSocialPlatformIcon = (href?: string) => {
    if (!href) return <></>;
    if (/instagram\.com/.test(href)) return SOCIAL_ICON_MAP.instagram;
    return <></>;
  };

  return <>{getSocialPlatformIcon(href ?? undefined)}</>;
};

export default SocialIcons;

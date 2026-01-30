import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { resolveAssetUrl } from '@/utils/asset';
import type { Locale } from '@/types/website';

// Local fallbacks
import logoIconLight from '@/assets/brand/icons/logo-icon-light.png';
import logoIconDark from '@/assets/brand/icons/logo-icon-dark.png';
import logoTextArLight from '@/assets/brand/text/logo-text-ar-light.png';
import logoTextArDark from '@/assets/brand/text/logo-text-ar-dark.png';
import logoTextEnLight from '@/assets/brand/text/logo-text-en-light.png';
import logoTextEnDark from '@/assets/brand/text/logo-text-en-dark.png';
import logoFullArLight from '@/assets/brand/full/logo-full-arabic-light.png';
import logoFullArDark from '@/assets/brand/full/logo-full-arabic-dark.png';
import logoFullEnLight from '@/assets/brand/full/logo-full-en-light.png';
import logoFullEnDark from '@/assets/brand/full/logo-full-en-dark.png';

export type LogoVariant = 'icon' | 'text' | 'full';

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  lang?: 'ar' | 'en';
  dark?: boolean;
}

const fallbackLogos = {
  icon: {
    light: logoIconLight,
    dark: logoIconDark,
  },
  text: {
    ar: { light: logoTextArLight, dark: logoTextArDark },
    en: { light: logoTextEnLight, dark: logoTextEnDark },
  },
  full: {
    ar: { light: logoFullArLight, dark: logoFullArDark },
    en: { light: logoFullEnLight, dark: logoFullEnDark },
  },
};

const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className,
  lang,
  dark,
}) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const { getLocalizedValue } = useWebsiteContent('settings');

  const currentLang: Locale = lang ?? (i18n.language?.startsWith('ar') ? 'ar' : 'en');
  const isDark = typeof dark === 'boolean' ? dark : theme === 'dark';
  const mode = isDark ? 'dark' : 'light';

  const remoteIcons = useMemo(
    () => getLocalizedValue<{ light?: string | null; dark?: string | null }>('logo_icon'),
    [getLocalizedValue]
  );
  const remoteText = useMemo(
    () => getLocalizedValue<{ light?: string | null; dark?: string | null }>('logo_text'),
    [getLocalizedValue]
  );
  const remoteFull = useMemo(
    () => getLocalizedValue<{ light?: string | null; dark?: string | null }>('logo_full'),
    [getLocalizedValue]
  );
  const remoteSite = useMemo(
    () => getLocalizedValue<string>('site_logo'),
    [getLocalizedValue]
  );

  const resolveRemoteVariant = (
    sources: { light?: string | null; dark?: string | null } | undefined
  ): string | undefined => {
    if (!sources) return undefined;
    const candidate = sources[mode] ?? sources.light ?? sources.dark;
    return resolveAssetUrl(candidate ?? undefined);
  };

  const getSrc = (): string => {
    if (variant === 'icon') {
      const remote = resolveRemoteVariant(remoteIcons?.[currentLang] ?? undefined);
      return remote ?? (isDark ? fallbackLogos.icon.dark : fallbackLogos.icon.light);
    }

    if (variant === 'text') {
      const remote = resolveRemoteVariant(remoteText?.[currentLang] ?? undefined);
      const fallback = fallbackLogos.text[currentLang][mode];
      return remote ?? fallback;
    }

    const remoteFullLogo = resolveRemoteVariant(remoteFull?.[currentLang] ?? undefined);
  const remoteSiteLogo = resolveAssetUrl(remoteSite?.[currentLang] ?? remoteSite?.en ?? undefined);
    const fallback = fallbackLogos.full[currentLang][mode];
    return remoteFullLogo ?? remoteSiteLogo ?? fallback;
  };

  const src = getSrc();

  const getAltText = (): string => {
    if (variant === 'icon') return 'Avocat Icon';
    if (variant === 'text') return currentLang === 'ar' ? 'أفوكات' : 'Avocat';
    return currentLang === 'ar' ? 'شعار أفوكات الكامل' : 'Avocat Full Logo';
  };

  return (
    <img
      src={src}
      alt={getAltText()}
      className={cn(
        'object-contain',
        currentLang === 'ar' ? 'rtl' : 'ltr',
        className
      )}
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
    />
  );
};

export default BrandLogo;

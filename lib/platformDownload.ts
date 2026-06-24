export type Platform = 'mac' | 'windows' | 'ios' | 'android' | 'web' | 'unknown';

export type PlatformDownload = {
  key: Platform;
  label: string;
  href: string;
  iconSrc: string;
  external: boolean;
};

export const PLATFORM_DOWNLOADS: Record<
  Exclude<Platform, 'web' | 'unknown'>,
  PlatformDownload
> = {
  mac: {
    key: 'mac',
    label: 'Download for Mac',
    href: '/download/mac',
    iconSrc: '/images/platforms/apple.svg',
    external: false,
  },
  windows: {
    key: 'windows',
    label: 'Download for Windows',
    href: '/download/windows',
    iconSrc: '/images/platforms/windows.svg',
    external: false,
  },
  ios: {
    key: 'ios',
    label: 'Get the iOS app',
    href: 'https://apps.apple.com/app/trooper',
    iconSrc: '/images/platforms/apple.svg',
    external: true,
  },
  android: {
    key: 'android',
    label: 'Get the Android app',
    href: 'https://play.google.com/store/apps/details?id=com.trooper',
    iconSrc: '/images/platforms/android.svg',
    external: true,
  },
};

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase() ||
    navigator.platform?.toLowerCase() ||
    '';

  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/win/.test(platform) || /windows/.test(ua)) return 'windows';
  if (/mac/.test(platform) || /macintosh/.test(ua)) return 'mac';
  return 'web';
}

export function getPlatformDownload(platform: Platform): PlatformDownload {
  if (platform === 'mac' || platform === 'windows' || platform === 'ios' || platform === 'android') {
    return PLATFORM_DOWNLOADS[platform];
  }

  return {
    key: 'unknown',
    label: 'Download apps',
    href: '/download',
    iconSrc: '/images/platforms/apple.svg',
    external: false,
  };
}

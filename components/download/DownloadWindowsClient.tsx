'use client';

import { useEffect } from 'react';

import DownloadInstallGuide from '@/components/download/DownloadInstallGuide';
import {
  OpenFromAppsIllustration,
  OpenInstallerIllustration,
  RunInstallerIllustration,
} from '@/components/download/WindowsInstallIllustrations';
import { WINDOWS_INSTALLER_URL, triggerFileDownload } from '@/lib/downloadUrls';

const INSTALL_STEPS = [
  {
    illustration: <OpenInstallerIllustration />,
    text: (
      <>
        Open <strong className="font-semibold text-ink">Trooper-Windows-x64-Setup.exe</strong> from
        your <strong className="font-semibold text-ink">Downloads</strong> folder
      </>
    ),
  },
  {
    illustration: <RunInstallerIllustration />,
    text: (
      <>
        Run the <strong className="font-semibold text-ink">Trooper</strong> installer and follow the
        setup steps
      </>
    ),
  },
  {
    illustration: <OpenFromAppsIllustration />,
    text: (
      <>
        Open <strong className="font-semibold text-ink">Trooper</strong> from{' '}
        <strong className="font-semibold text-ink">Settings</strong> or the Start menu
      </>
    ),
  },
];

export default function DownloadWindowsClient() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      triggerFileDownload(WINDOWS_INSTALLER_URL);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return <DownloadInstallGuide manualDownloadHref={WINDOWS_INSTALLER_URL} steps={INSTALL_STEPS} />;
}

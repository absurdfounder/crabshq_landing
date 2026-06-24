'use client';

import { useEffect } from 'react';

import DownloadInstallGuide from '@/components/download/DownloadInstallGuide';
import {
  DragToApplicationsIllustration,
  OpenDmgIllustration,
  OpenFromApplicationsIllustration,
} from '@/components/download/MacInstallIllustrations';
import { MAC_DMG_URL, triggerFileDownload } from '@/lib/downloadUrls';

const INSTALL_STEPS = [
  {
    illustration: <OpenDmgIllustration />,
    text: (
      <>
        Open <strong className="font-semibold text-ink">Trooper.dmg</strong> from your{' '}
        <strong className="font-semibold text-ink">Downloads</strong> folder
      </>
    ),
  },
  {
    illustration: <DragToApplicationsIllustration />,
    text: (
      <>
        Drag the <strong className="font-semibold text-ink">Trooper</strong> icon into your{' '}
        <strong className="font-semibold text-ink">Applications</strong> folder
      </>
    ),
  },
  {
    illustration: <OpenFromApplicationsIllustration />,
    text: (
      <>
        Open the <strong className="font-semibold text-ink">Trooper</strong> app from your{' '}
        <strong className="font-semibold text-ink">Applications</strong> folder
      </>
    ),
  },
];

export default function DownloadMacClient() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      triggerFileDownload(MAC_DMG_URL);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return <DownloadInstallGuide manualDownloadHref={MAC_DMG_URL} steps={INSTALL_STEPS} />;
}

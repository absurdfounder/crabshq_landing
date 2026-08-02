'use client';

import { ArrowRight } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';

const APPLY_MAILTO =
  'mailto:support@trooper.so?subject=Reseller%20Program%20Application&body=Hi%20Trooper%20team%2C%0A%0AI%27d%20like%20to%20apply%20to%20the%20Trooper%20Reseller%20Program.%0A%0AName%3A%0ACompany%20%2F%20practice%3A%0AWebsite%3A%0ANiche%20or%20client%20types%3A%0A%0AThanks!';

export default function ResellersApplyBand() {
  return (
    <div className="flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
      <div className="max-w-xl">
        <p className="kicker-dark">Apply</p>
        <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
          Ready to join the Trooper Reseller Program?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/60">
          Tell us who you serve and how you’d use Trooper. We’ll follow up at support@trooper.so.
        </p>
      </div>
      <PixelButton
        href={APPLY_MAILTO}
        external
        target="_self"
        size="lg"
        tone="brand"
        icon={<ArrowRight className="h-4 w-4" />}
        className="shrink-0"
      >
        Apply to the program
      </PixelButton>
    </div>
  );
}

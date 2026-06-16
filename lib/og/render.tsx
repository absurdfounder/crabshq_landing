import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/lib/og/fonts';
import type { OgHeroContent } from '@/lib/og/types';

export const OG_SIZE = { width: 1200, height: 630 };

const BRAND_GREEN = '#284800';
const BRAND_GREEN_LIGHT = '#3f6b00';

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export function OgHeroImage({ content }: { content: OgHeroContent }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          borderLeft: '1px solid #e2e8f0',
          borderRight: '1px solid #e2e8f0',
          padding: '56px 72px 48px',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 28,
              fontSize: 13,
              fontFamily: 'Roboto Mono',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: BRAND_GREEN,
            }}
          >
            <span
              style={{
                border: `1px solid ${BRAND_GREEN_LIGHT}55`,
                background: '#f0f5e6',
                padding: '6px 10px',
                fontWeight: 700,
              }}
            >
              [{content.eyebrowIndex}]
            </span>
            <span style={{ fontWeight: 600 }}>{content.eyebrowLabel}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            {content.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={content.iconUrl}
                alt=""
                width={56}
                height={56}
                style={{ borderRadius: 12, border: '1px solid #e2e8f0', marginTop: 8 }}
              />
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div
                style={{
                  fontSize: 72,
                  lineHeight: 1.05,
                  fontWeight: 700,
                  color: '#0f172a',
                  letterSpacing: '-0.03em',
                  fontFamily: 'Funnel Display',
                }}
              >
                {content.headlinePrimary}
              </div>
              {content.headlineAccent ? (
                <div
                  style={{
                    fontSize: 72,
                    lineHeight: 1.05,
                    fontWeight: 700,
                    color: BRAND_GREEN,
                    letterSpacing: '-0.03em',
                    fontFamily: 'Funnel Display',
                    marginTop: 4,
                  }}
                >
                  {content.headlineAccent}
                </div>
              ) : null}
            </div>
          </div>

          {content.description ? (
            <p
              style={{
                marginTop: 28,
                maxWidth: 920,
                fontSize: 26,
                lineHeight: 1.45,
                color: '#475569',
                fontFamily: 'Funnel Display',
              }}
            >
              {truncate(content.description, 160)}
            </p>
          ) : null}

          {content.showSetup ? (
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                alignItems: 'center',
                maxWidth: 420,
                border: '1px dashed #cbd5e1',
                borderRadius: 4,
                padding: '14px 18px',
                background: '#ffffff',
              }}
            >
              <span style={{ fontSize: 22, color: '#0891b2', fontFamily: 'Roboto Mono', marginRight: 10 }}>
                $
              </span>
              <span style={{ fontSize: 22, color: '#0f172a', fontFamily: 'Roboto Mono' }}>npx trooper setup</span>
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span style={{ fontSize: 18, color: '#94a3b8', fontFamily: 'Roboto Mono' }}>trooper.so</span>
          {content.watermark ? (
            <span
              style={{
                fontSize: 88,
                fontWeight: 700,
                color: '#f1f5f9',
                letterSpacing: '-0.04em',
                fontFamily: 'Funnel Display',
              }}
            >
              {content.watermark}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function createOgImageResponse(content: OgHeroContent) {
  const fonts = await loadOgFonts();
  return new ImageResponse(<OgHeroImage content={content} />, {
    ...OG_SIZE,
    fonts,
  });
}

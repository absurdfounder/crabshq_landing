import { ImageResponse } from 'next/og';
import { mergeBadgeIcons } from '@/lib/og/agentIcons';
import { loadOgFonts } from '@/lib/og/fonts';
import { formatOgDisplayUrl } from '@/lib/og/pageUrls';
import type { OgHeroContent } from '@/lib/og/types';
import { TROOPER_CLI_COMMAND } from '@/lib/setupCommand';

export const OG_SIZE = { width: 1200, height: 630 };

const BRAND_GREEN = '#284800';
const BRAND_GREEN_LIGHT = '#3f6b00';
const TROOPER_LOGOMARK_URL = 'https://trooper.so/images/trooper-logomark.png';
const OG_BACKGROUND_URL = 'https://trooper.so/og/share-background.png';

function TrooperBrandMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={TROOPER_LOGOMARK_URL} alt="" width={56} height={56} />
      <span
        style={{
          fontSize: 36,
          lineHeight: 1,
          fontFamily: 'Silkscreen',
          color: '#0f172a',
          letterSpacing: '-0.02em',
          textTransform: 'lowercase',
        }}
      >
        trooper
      </span>
    </div>
  );
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function BadgeRow({ badges }: { badges: NonNullable<OgHeroContent['badgeIcons']> }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid #e2e8f0',
            borderRadius: 999,
            padding: '8px 14px 8px 10px',
            background: 'rgba(255,255,255,0.92)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={badge.iconUrl} alt="" width={22} height={22} style={{ borderRadius: 4 }} />
          <span style={{ fontSize: 18, color: '#334155', fontFamily: 'Roboto Mono' }}>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

export function OgHeroImage({ content }: { content: OgHeroContent }) {
  const singleLine = content.singleLineHeadline !== false;
  const badges = mergeBadgeIcons(content.badgeIcons, content.description);
  const displayUrl = formatOgDisplayUrl(content.pageUrl || 'https://trooper.so');

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={OG_BACKGROUND_URL}
        alt=""
        width={1200}
        height={630}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 42%, rgba(255,255,255,0.90) 68%, rgba(255,255,255,0.78) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 64px 40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
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
            <TrooperBrandMark />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            {content.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={content.iconUrl}
                alt=""
                width={56}
                height={56}
                style={{ borderRadius: 12, marginTop: 6 }}
              />
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {singleLine ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    maxWidth: 980,
                  }}
                >
                  <span
                    style={{
                      fontSize: 64,
                      lineHeight: 1.08,
                      fontWeight: 700,
                      color: '#0f172a',
                      letterSpacing: '-0.03em',
                      fontFamily: 'Funnel Display',
                      marginRight: content.headlineAccent ? 16 : 0,
                    }}
                  >
                    {content.headlinePrimary}
                  </span>
                  {content.headlineAccent ? (
                    <span
                      style={{
                        fontSize: 64,
                        lineHeight: 1.08,
                        fontWeight: 700,
                        color: BRAND_GREEN,
                        letterSpacing: '-0.03em',
                        fontFamily: 'Funnel Display',
                      }}
                    >
                      {content.headlineAccent}
                    </span>
                  ) : null}
                </div>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: 64,
                      lineHeight: 1.08,
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
                        fontSize: 64,
                        lineHeight: 1.08,
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
                </>
              )}
            </div>
          </div>

          {content.description ? (
            <p
              style={{
                marginTop: 22,
                maxWidth: 900,
                fontSize: 24,
                lineHeight: 1.45,
                color: '#475569',
                fontFamily: 'Funnel Display',
              }}
            >
              {truncate(content.description, 160)}
            </p>
          ) : null}

          {badges?.length ? <BadgeRow badges={badges} /> : null}

          {content.showSetup ? (
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'center',
                maxWidth: 420,
                border: '1px dashed #cbd5e1',
                borderRadius: 4,
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.9)',
              }}
            >
              <span style={{ fontSize: 22, color: '#0891b2', fontFamily: 'Roboto Mono', marginRight: 10 }}>
                $
              </span>
              <span style={{ fontSize: 20, color: '#0f172a', fontFamily: 'Roboto Mono' }}>{TROOPER_CLI_COMMAND}</span>
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span style={{ fontSize: 20, color: '#64748b', fontFamily: 'Roboto Mono' }}>{displayUrl}</span>
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

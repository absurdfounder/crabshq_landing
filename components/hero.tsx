import DesktopHero from './desktop-hero/DesktopHero';

/**
 * The hero is now a desktop scene — centred copy on a dot-grid canvas with
 * named agent cursors doing real multi-window work around it. See
 * components/desktop-hero/DesktopHero.tsx for the scene and its timeline.
 *
 * The old hero ended in a full-width scaled product demo; subpages still get
 * that treatment through MarketingHeroDemo, which renders HeroArticleDemo
 * directly.
 */
export default function Hero() {
  return <DesktopHero />;
}

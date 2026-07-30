/**
 * Where the demo's media lives at runtime.
 *
 * The files are checked in at `packages/demo/assets/` and served differently by
 * each host — the landing copies them to `public/demo/`, the harness serves the
 * folder directly — so every URL goes through here rather than being hardcoded.
 */

let base = '/demo';

/** Hosts call this once at startup if they don't serve assets from `/demo`. */
export function setDemoAssetBase(next: string) {
  base = next.replace(/\/$/, '');
}

export function demoAsset(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`;
}

/**
 * The app's own media library, copied from `Trooper/public/viralhook/library`.
 * Using the product's real files means the NLE strips real footage and the
 * generation card resolves to a real photograph.
 */
export const MEDIA = {
  video: {
    bigBuckBunny: 'media/video/BigBuckBunny.mp4',
    sintel: 'media/video/Sintel.mp4',
    elephantsDream: 'media/video/ElephantsDream.mp4',
    tearsOfSteel: 'media/video/TearsOfSteel.mp4',
    forBiggerBlazes: 'media/video/ForBiggerBlazes.mp4',
    forBiggerEscapes: 'media/video/ForBiggerEscapes.mp4',
    forBiggerFun: 'media/video/ForBiggerFun.mp4',
    forBiggerJoyrides: 'media/video/ForBiggerJoyrides.mp4',
  },
  image: {
    mountains: 'media/image/mountains.jpg',
    mountainsThumb: 'media/image/mountains-thumb.jpg',
    city: 'media/image/city.jpg',
    cityThumb: 'media/image/city-thumb.jpg',
    abstract: 'media/image/abstract.jpg',
    abstractThumb: 'media/image/abstract-thumb.jpg',
  },
} as const;

export const videoSrc = (key: keyof typeof MEDIA.video) => demoAsset(MEDIA.video[key]);
export const imageSrc = (key: keyof typeof MEDIA.image) => demoAsset(MEDIA.image[key]);

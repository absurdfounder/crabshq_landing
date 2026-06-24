export const MAC_DMG_URL =
  'https://github.com/absurdfounder/trooper_landing/releases/download/macos-latest/Trooper.dmg';

export const WINDOWS_INSTALLER_URL =
  'https://github.com/absurdfounder/trooper_landing/releases/download/windows-latest/Trooper-Windows-x64-Setup.exe';

export function triggerFileDownload(url: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

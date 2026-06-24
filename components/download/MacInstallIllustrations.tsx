import InstallStepImage from '@/components/download/InstallStepImage';

export function OpenDmgIllustration() {
  return (
    <InstallStepImage
      src="/images/download/mac/step-1-open-dmg.png"
      alt="Open Trooper.dmg from the Downloads folder"
    />
  );
}

export function DragToApplicationsIllustration() {
  return (
    <InstallStepImage
      src="/images/download/mac/step-2-drag-to-apps.png"
      alt="Drag the Trooper icon into your Applications folder"
    />
  );
}

export function OpenFromApplicationsIllustration() {
  return (
    <InstallStepImage
      src="/images/download/mac/step-3-open-from-apps.png"
      alt="Open the Trooper app from your Applications folder"
    />
  );
}

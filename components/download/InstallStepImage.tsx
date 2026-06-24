import Image from 'next/image';

type InstallStepImageProps = {
  src: string;
  alt: string;
};

export default function InstallStepImage({ src, alt }: InstallStepImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1024}
      height={912}
      className="h-auto w-full max-w-[300px] object-contain sm:max-w-[320px]"
      sizes="(max-width: 640px) 90vw, 320px"
    />
  );
}

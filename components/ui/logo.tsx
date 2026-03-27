import Link from 'next/link'
import Image from 'next/image' // Import the Image component from Next.js
import logonew_black from '../../public/images/logonew-black.png';

export default function Logo() {
  return (
    <Link href={"0"} className="block" aria-label="Crabs HQ">
      {/* Use the Image component for optimized images */}
      <Image
        src={logonew_black} 
        unoptimized
        alt="Logo" 
        width={200}
        height={200}
        className="block" 
      />
    </Link>
  )
}

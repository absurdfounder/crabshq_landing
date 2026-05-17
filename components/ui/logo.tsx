import Link from 'next/link'
import Image from 'next/image' // Import the Image component from Next.js
import trooperLogo from '../../public/images/trooper-logo.png';

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Trooper">
      {/* Use the Image component for optimized images */}
      <Image
        src={trooperLogo} 
        unoptimized
        alt="Trooper" 
        width={200}
        height={200}
        className="block" 
      />
    </Link>
  )
}

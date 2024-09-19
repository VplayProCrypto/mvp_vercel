import Link from 'next/link'
import Image from 'next/image'
interface SocialIconProps {
  href: string
  src: string
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, src }) => (
  <button className="SocialIcon w-7 h-7 relative">
    <Link href={href}>
      <Image
        src={src}
        alt="social icon"
        width={300}
        height={300}
      />
    </Link>
  </button>
)

export default SocialIcon

import Image from 'next/image'
import Link from 'next/link'
import SocialIcon from './socialicon'
import NewsletterSignup from './newslettersignup'
const Footer: React.FC = () => {
  return (
    <div className="Footer w-full px-28 pt-28 pb-14 bg-black flex-col justify-center items-center gap-28 inline-flex">
      <div className="Frame427321246 self-stretch justify-between items-start inline-flex">
        <div className="LogoColumn flex-col justify-start items-center gap-2.5 inline-flex">
          <button className="LogoButton w-40 h-40 rounded-full flex items-center justify-center">
            <Link
              className="home_button"
              href="/">
              <Image
                src={'/images/logo.png'}
                alt="image"
                width={100}
                height={100}
              />
            </Link>
          </button>
        </div>

        <div className="ExploreColumn flex-col justify-start items-start gap-5 inline-flex">
          <div className="Explore text-white text-lg font-normal font-['Satoshi Variable'] uppercase leading-normal tracking-wide">
            EXPLORE
          </div>
          <div className="SocialIcons grid grid-cols-3 gap-4">
            <SocialIcon
              href="https://discord.com/invite/B2dF36Kstz"
              src="/images/discordnegative.png"
            />
            <SocialIcon
              href="https://www.linkedin.com/company/vplaypro/"
              src="/images/linkedinnegative.png"
            />
            <SocialIcon
              href="https://medium.com/@vplaypro"
              src="/images/mediumnegative.png"
            />
            <SocialIcon
              href="https://twitter.com/VPLAY_PRO"
              src="/images/twitternegative.png"
            />
            <SocialIcon
              href="https://t.me/VPLAY_ProPlatform"
              src="/images/telegramnegative.png"
            />
            <SocialIcon
              href="https://github.com/VplayProCrypto"
              src="/images/githubnegative.png"
            />
          </div>
        </div>

        <div className="ContactColumn flex-col justify-start items-start gap-5 inline-flex">
          <div className="Contact text-white text-lg font-normal font-['Satoshi Variable'] uppercase leading-normal tracking-wide">
            CONTACT
          </div>
          <div className="NavLinks flex-col justify-start items-start gap-2 flex">
            <button className="text-left w-full">
              <Link
                href="/careers"
                className="Partnerships w-60 text-white text-base font-normal font-['Satoshi Variable'] leading-tight tracking-wide hover:underline">
                Careers
              </Link>
            </button>
            <button className="text-left w-full">
              <Link
                href="mailto:support@vplay.pro"
                className="Partnerships w-60 text-white text-base font-normal font-['Satoshi Variable'] leading-tight tracking-wide hover:underline">
                Partnerships
              </Link>
            </button>
            <button className="text-left w-full">
              <Link
                href="mailto:support@vplay.pro"
                className="Support w-60 text-white text-base font-normal font-['Satoshi Variable'] leading-tight tracking-wide hover:underline">
                Support
              </Link>
            </button>
          </div>
        </div>

        <NewsletterSignup />
      </div>

      <div className="w-full">
        <Image
          src={'/images/vplayfooter.png'}
          alt="image"
          width={1100}
          height={1000}
          className="w-full"
        />
      </div>

      <div className="w-full text-right">
        <div className="Copyright inline-block text-white text-xl font-normal font-['Satoshi Variable'] leading-normal tracking-tight mt-8">
          Copyright © 2024 VPLAY. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer

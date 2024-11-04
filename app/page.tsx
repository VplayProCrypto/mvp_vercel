'use client'
import Image from 'next/image'
import vpl from '../public/images/vpl.png'
import text from '../public/images/text.svg'
import thor from '../public/images/2.png'
import stages from '../public/images/5.jpg'
import three from '../public/images/3.png'
import eight from '../public/images/8.jpg'
import CallToAction from '@/components/callToAction'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
export default function IndexPage() {
  return (
    <section className="bg-[#000] text-[#fff]">
      <Image
        src={vpl}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={text}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={thor}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={three}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={stages}
        alt="image"
        width={1920}
        height={1240}
        className={'w-full'}
      />

      <Image
        src={eight}
        alt="image"
        width={1920}
        height={12400}
        className={'w-full'}
      />

      <CallToAction />
      <Footer />
    </section>
  )
}

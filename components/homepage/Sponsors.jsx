import Link from 'next/link'
import Image from 'next/image'

import { sponsorList } from '@config/sponsors'

const Sponsors = () => {
    return (
        <section className=' bg-brandNeutral-200 py-6 relative overflow-hidden whitespace-nowrap'>
            <div className="animate-scroll inline-block w-auto bg-brandNeutral-200">
                {Object.keys(sponsorList).map((key, index) => (
                    <Link href={"/"} key={key + "1"}>
                        <Image className='h-16 md:h-18 lg:h-20 w-auto mx-12 md:mx-14 lg:mx-16 inline-block grayscale hover:grayscale-0 transition-all' src={sponsorList[key]} alt="sponsor"/>
                    </Link>
                ))}
            </div>
            <div className="animate-scroll inline-block w-auto bg-brandNeutral-200">
                {Object.keys(sponsorList).map((key, index) => (
                    <Link href={"/"} key={key + "2"}>
                        <Image className='h-16 md:h-18 lg:h-20 w-auto mx-12 md:mx-14 lg:mx-16 inline-block grayscale hover:grayscale-0 transition-all' src={sponsorList[key]} alt="sponsor"/>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Sponsors
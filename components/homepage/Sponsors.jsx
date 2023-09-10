import Link from 'next/link'
import Image from 'next/image'

import { sponsorList } from '@config/sponsors'

const Sponsors = () => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <section className=' bg-brandNeutral-200 py-6 relative overflow-hidden whitespace-nowrap'>
                <div className="animate-scroll inline-block w-auto bg-brandNeutral-200">
                    {Object.keys(sponsorList).map((key, index) => (
                        <Link className='w-[200px] lg:w-[300px] md:w-[265px] inline-block text-center' href={"/"} key={key + "1"}>
                            <Image className='h-16 md:h-18 lg:h-20 w-auto mx-auto inline-block grayscale hover:grayscale-0 transition-all' src={sponsorList[key]} alt="sponsor"/>
                        </Link>
                    ))}
                </div>
                <div className="animate-scroll inline-block w-auto bg-brandNeutral-200">
                    {Object.keys(sponsorList).map((key, index) => (
                        <Link className='w-[200px] lg:w-[300px] md:w-[265px] inline-block text-center' href={"/"} key={key + "1"}>
                            <Image className='h-16 md:h-18 lg:h-20 w-auto mx-auto inline-block grayscale hover:grayscale-0 transition-all' src={sponsorList[key]} alt="sponsor"/>
                        </Link>
                    ))}
                </div>
            </section>
            <p className='text-lg text-grandNeutral-500 underline'>More Sponsors &rarr;</p>
        </div>
    )
}

export default Sponsors
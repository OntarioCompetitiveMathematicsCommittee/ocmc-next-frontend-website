import Link from 'next/link'
import Image from 'next/image'

import { sponsorList } from '@config/sponsors'

const Sponsors = () => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <section className='relative py-6 overflow-hidden bg-brandNeutral-200 whitespace-nowrap'>
                <div className="inline-block w-auto animate-scroll bg-brandNeutral-200">
                    {sponsorList.map((sponsor, index) => (
                        <Link className='inline-block w-[150px] lg:w-[225px] md:w-[200px] text-center' href={sponsor.link} target="_blank" key={sponsor.name + "1"}>
                            <Image className='inline-block w-auto h-16 mx-auto transition-all md:h-18 lg:h-20 grayscale hover:grayscale-0' src={sponsor.image} alt={sponsor.name}/>
                        </Link>
                    ))}
                </div>
                <div className="inline-block w-auto animate-scroll bg-brandNeutral-200">
                    {sponsorList.map((sponsor, index) => (
                        <Link className='inline-block w-[150px] lg:w-[225px] md:w-[200px] text-center' href={sponsor.link} target="_blank" key={sponsor.name + "2"}>
                            <Image className='inline-block w-auto h-16 mx-auto transition-all md:h-18 lg:h-20 grayscale hover:grayscale-0' src={sponsor.image} alt={sponsor.name}/>
                        </Link>
                    ))}
                </div>
            </section>
            {/* <p className='text-lg underline text-grandNeutral-500'>More Sponsors &rarr;</p> */}
        </div>
    )
}

export default Sponsors
import Link from 'next/link'
import Image from 'next/image'

import { sponsorList } from '@config/sponsors'

const Sponsors = () => {

    return (
        <div
            className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] py-6 bg-brandNeutral-200">
            <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 md:[&_li]:mx-12 lg:[&_li]:mx-16 [&_img]:max-w-none animate-infinite-scroll">
                {sponsorList.map((sponsor, index) => (
                    <li className='inline-block mx-8 text-center md:mx-12 lg:mx-16' target="_blank" key={sponsor.name + "1"}>
                        <Link href={sponsor.link}>
                            <Image className='inline-block w-auto h-16 mx-auto transition-all md:h-18 lg:h-20 grayscale hover:grayscale-0' src={sponsor.image} alt={sponsor.name}/>
                        </Link>
                    </li>
                ))}
            </ul>     
            <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 md:[&_li]:mx-12 lg:[&_li]:mx-16 [&_img]:max-w-none animate-infinite-scroll">
                {sponsorList.map((sponsor, index) => (
                    <li className='inline-block mx-8 text-center md:mx-12 lg:mx-16' target="_blank" key={sponsor.name + "2"}>
                        <Link href={sponsor.link}>
                            <Image className='inline-block w-auto h-16 mx-auto transition-all md:h-18 lg:h-20 grayscale hover:grayscale-0' src={sponsor.image} alt={sponsor.name}/>
                        </Link>
                    </li>
                ))}
            </ul>              
        </div>
    )
}

export default Sponsors
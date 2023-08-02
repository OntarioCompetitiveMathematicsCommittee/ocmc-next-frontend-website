import Image from 'next/image'
import Link from 'next/link'

import { h1Styles, h3Styles } from '@config/textStyles'

const Section = ({ buttonText, buttonPath, buttonColour, buttonHover, colour, image, title, text, isPadding}) => {
    return (
        <div className={'flex justify-center w-full ' + colour + (isPadding && ' pb-40')}>
            <div className='flex flex-col items-center pt-40 pb-2 lg:flex-row lg:justify-center w-full max-w-[100rem]'>
                <div className='flex flex-col gap-2 px-4 items-center w-full max-w-2xl text-center lg:text-left lg:items-start'>
                    <h1 className={h1Styles + (colour && " text-white")}>
                        {title}
                    </h1>
                    <h3 className={h3Styles + (colour && " text-white")}>
                        {text}
                    </h3>
                    {buttonText && 
                        <Link className={'text-white py-2 px-6 rounded-md text-md lg:text-xl mt-2 transition-all ' + buttonColour + " " + buttonHover} href={buttonPath}>
                            {buttonText}
                        </Link>
                    }
                </div>
                <div className='w-full lg:w-1/3'>
                    <Image className='w-3/4 lg:w-full max-w-xl mx-auto' src={image} alt={title + " graphic"}/>
                </div>
            </div>
        </div>
    )
}

export default Section
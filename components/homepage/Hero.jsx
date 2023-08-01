import Image from 'next/image'
import { h1Styles, h2Styles } from '@config/textStyles'
import { arithmeticList } from '@config/arithmetic'

const Hero = () => {
    return (
        <>
            <section className="bg-[url('/assets/ocmc-bg.svg')] h-screen bg-right-top bg-no-repeat bg-cover flex flex-col">
                <main className='flex justify-center items-center flex-1 px-4 mb-24'>
                    <div className='flex justify-center items-center text-center flex-col gap-4'>
                        <h1 className={h1Styles}>Ontario Competitive Math Committee</h1>
                        <h2 className={h2Styles}>Join us for workshops and contests lead by Canada’s leading high school mathematicians</h2>
                        <div className='flex justify-between w-full'>
                            {Object.keys(arithmeticList).map((key, index) => (
                                <Image className={'w-[15vw] max-w-[8.8rem] ' + ([1,2].includes(index) && " translate-y-12")} key={key} src={arithmeticList[key]} alt={key}/>
                            ))}
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Hero
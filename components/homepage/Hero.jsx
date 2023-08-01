import Image from 'next/image'
import { h1Styles, h2Styles, h3Styles } from '@config/textStyles'
import { arithmeticList } from '@config/arithmetic'

const Hero = () => {
    return (
        <>
            <section className="bg-[url('/assets/ocmc-bg.svg')] h-screen bg-right-top bg-no-repeat bg-cover flex flex-col">
                <main className='flex justify-center items-center flex-1 px-4 mb-24'>
                    <div className='flex justify-center items-center text-center flex-col gap-4'>
                        <h1 className={"text-[2.75rem] leading-[3rem] font-medium md:text-6xl lg:text-[5.3rem] max-w-[60rem] "}>Ontario Competitive Math Committee</h1>
                        <h2 className={"text-xl font-[Montserrat] max-w-[40rem] "}>Join us for workshops and contests lead by Canada’s leading high school mathematicians</h2>
                        <h3 className="text-sm font-[Montserrat] max-w-[60rem] md:text-lg lg:text-xl leading-loose md:leading-loose lg:leading-loose text-balance "></h3>
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
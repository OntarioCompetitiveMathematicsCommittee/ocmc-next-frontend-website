import Image from 'next/image'
import { arithmeticList } from '@config/arithmetic'

const Hero = () => {
    return (
        <>
            <section className="bg-[url('/assets/ocmc-bg.svg')] h-screen bg-right-top bg-no-repeat bg-cover flex flex-col pt-16">
                <main className='flex items-center justify-center flex-1 px-4 mb-24'>
                    <div className='flex flex-col items-center justify-center gap-4 text-center'>
                        <h1 className={"text-[2.75rem] leading-[3rem] font-medium md:text-6xl lg:text-[5.3rem] max-w-[70rem] "}>Ontario Competitive Mathematics Committee</h1>
                        <h2 className={"text-lg md:xl font-[Montserrat] max-w-[40rem] "}>Join us for workshops and contests led by Canada’s leading student mathematicians</h2>
                        <h3 className="text-sm font-[Montserrat] max-w-[60rem] md:text-lg lg:text-xl leading-loose md:leading-loose lg:leading-loose text-balance "></h3>
                        <div className='flex justify-between w-full'>
                            {Object.keys(arithmeticList).map((key, index) => (
                                <Image className={'w-[min(15vw,18vh)] max-w-[8.8rem] ' + ([1,2].includes(index) && " translate-y-12")} key={key} src={arithmeticList[key]} alt={key}/>
                            ))}
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Hero
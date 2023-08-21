import Image from 'next/image'
import Link from 'next/link'

import NavbarPlaceholder from '@components/NavbarPlaceholder'
import Navbar from '@components/Navbar'
import Hero from '@components/homepage/Hero'
import Sponsors from '@components/homepage/Sponsors'
import Section from '@components/Section'
import Footer from '@components/homepage/Footer'

import Mission from '@public/assets/mission.svg'
import Contest from '@public/assets/omc.svg'
import Camp from '@public/assets/camp.svg'

import Wave1 from '@public/assets/wave-transition-1.svg'
import Wave2 from '@public/assets/wave-transition-2.svg'
import Wave3 from '@public/assets/wave-transition-3.svg'

import Atticus from '@public/assets/directors/Atticus.png'
import Daniel from '@public/assets/directors/Daniel.png'
import Jia from '@public/assets/directors/Jia.png'
import Oliver from '@public/assets/directors/Oliver.png'
import Elaine from '@public/assets/directors/Elaine.png'
import Jacob from '@public/assets/directors/Jacob.png'

import ExecPod from '@components/ExecPod'

export default function Home() {

    const directors = {
        Atticus: Atticus,
        Daniel: Daniel,
        Jia: Jia,
        Oliver: Oliver,
        Elaine: Elaine,
        Jacob: Jacob,
    }

    return (
        <>
            <div className='w-screen h-[calc(100vh-2rem)] flex flex-col'>
                <NavbarPlaceholder/>
                <Navbar/>
                <Hero/>
            </div>  
            <Sponsors/>
            <Section 
                image={Mission} 
                title="Our Mission" 
                text="Creators can gain independence through a decentralised digital currency system that is
                    dependent on growing and engaging with the community and also their star power."
            />
            <div className='w-screen h-auto mt-48'>
                <Image className='w-full' src={Wave1} alt="divider"/>
            </div>
            <Section
                buttonText="Math Contests"
                buttonPath="/"
                buttonColour={'bg-brandGreen-500'}
                buttonHover={'hover:bg-brandGreen-600'}
                colour={'bg-brandBlue-500'}
                image={Contest}
                title="Ontario Math Contest"
                text="Creators can gain independence through a decentralised digital currency system that is
                    dependent on growing and engaging with the community and also their star power."
                isPadding={true}
            />
            <div className='bg-brandBlue-500'>
                <Image className='w-full' src={Wave2} alt="divider"/>
            </div>
            <Section
                buttonText={"Summer Camps"}
                buttonPath={"/"}
                buttonColour={'bg-brandNeutral-400'}
                buttonHover={'hover:bg-brandNeutral-500'}
                colour={'bg-brandBlue-400'}
                image={Camp}
                title="Online Summer Camps"
                text="Creators can gain independence through a decentralised digital currency system that is
                    dependent on growing and engaging with the community and also their star power."
                isPadding={true}
            />
            <div>
                <Image className='w-full' src={Wave3} alt="divider"/>
            </div>
            <section className='flex flex-col items-center w-screen gap-24 p-16 mt-48'>
                <h1 className={"homeh1 text-center"}>Meet Our Team</h1>
                <div className='flex justify-center w-screen p-4'>
                    <div className='flex justify-center flex-wrap max-w-[90rem] gap-24 w-full'>
                        <ExecPod 
                            image={directors.Elaine}
                            firstName="Elaine"
                            lastName="Li"
                            position="Directors of Operations"
                            bgColour="bg-brandYellow-500"
                            textColour="text-brandYellow-900"
                        />
                        <ExecPod
                            image={directors.Atticus}
                            firstName="Atticus"
                            lastName="Zhang"
                            position="Directors of Operations"
                            bgColour="bg-brandGreen-500"
                            textColour="text-brandGreen-900"
                        />
                        <ExecPod
                            image={directors.Jia}
                            firstName="Jia"
                            lastName="Huang"
                            position="Directors of Technology"
                            bgColour="bg-brandBlue-500"
                            textColour="text-brandBlue-900"
                        />
                        <ExecPod
                            image={directors.Oliver}
                            firstName="Oliver"
                            lastName="Mao"
                            position="Directors of Mathematics"
                            bgColour="bg-brandGreen-500"
                            textColour="text-brandGreen-900"
                        />
                        <ExecPod
                            image={directors.Jacob}
                            firstName="Jacob"
                            lastName="Yan"
                            position="Directors of Mathematics"
                            bgColour="bg-brandBlue-500"
                            textColour="text-brandBlue-900"
                        />
                        <ExecPod 
                            image={directors.Daniel}
                            firstName="Daniel"
                            lastName="Chen"
                            position="Directors of Mathematics"
                            bgColour="bg-brandYellow-500"
                            textColour="text-brandYellow-900"
                        />
                    </div>
                </div>
            </section>
            <div className='h-48'></div>
            <Footer></Footer>
        </>
    )
}

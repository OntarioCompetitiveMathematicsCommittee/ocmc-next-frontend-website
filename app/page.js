import Image from 'next/image'

import NavbarPlaceholder from '@components/elements/NavbarPlaceholder'
import Navbar from '@components/elements/Navbar'
import Hero from '@components/homepage/Hero'
import Sponsors from '@components/homepage/Sponsors'
import Section from '@components/homepage/Section'
import Footer from '@components/homepage/Footer'

import Mission from '@public/assets/mission.svg'
import Contest from '@public/assets/omc.svg'
import Camp from '@public/assets/camp.svg'
import MeetOurTeam from '@components/homepage/MeetOurTeam'

import Wave1 from '@public/assets/wave-transition-1.svg'
import Wave2 from '@public/assets/wave-transition-2.svg'
import Wave3 from '@public/assets/wave-transition-3.svg'

export default function Home() {

    return (
        <div className='overflow-hidden'>
            <div className='flex flex-col w-screen h-screen'>
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
            <MeetOurTeam/>
            <div className='h-48'></div>
            <Footer/>
        </div>
    )
}

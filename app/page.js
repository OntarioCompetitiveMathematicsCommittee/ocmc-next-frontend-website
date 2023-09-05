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
                text="The Ontario Competitive Math Committee is dedicated to nurturing a love for mathematics and fostering the 
                intellectual growth of students wordlwide. Our mission is to provide engaging math contests, workshops, 
                and summer camps that empower young mathematical minds."
            />
            <div className='w-screen h-auto mt-48'>
                <Image className='w-full' src={Wave1} alt="divider"/>
            </div>
            <Section
                buttonText="More Information >"
                buttonPath="/"
                buttonColour={'bg-brandGreen-500'}
                buttonHover={'hover:bg-brandGreen-600'}
                colour={'bg-brandBlue-500'}
                image={Contest}
                title="Onatrio Math Competition"
                text="We conduct math contests in Ontario to inspire a lasting passion for mathematics, foster critical thinking skills, 
                and recognize young talent in problem-solving."
                isPadding={true}
            />
            <div className='bg-brandBlue-500'>
                <Image className='w-full scale-[1.1]' src={Wave2} alt="divider"/>
            </div>
            <Section
                buttonText={"View Options >"}
                buttonPath={"/"}
                buttonColour={'bg-brandNeutral-400'}
                buttonHover={'hover:bg-brandNeutral-500'}
                colour={'bg-brandBlue-400'}
                image={Camp}
                title="Online Summer Camps"
                text="We organize math summer camps that immerse students in the world of mathematics, igniting a love for the subject,
                 enhancing critical thinking abilities, and providing a supportive environment for young problem solvers to thrive."
                isPadding={true}
            />
            <div>
                <Image className='w-full -translate-y-[1px]' src={Wave3} alt="divider"/>
            </div>
            <MeetOurTeam/>
            <div className='h-48'></div>
            <Footer></Footer>
        </div>
    )
}

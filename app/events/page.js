import Link from 'next/link'

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"
import Footer from "@components/homepage/Footer"

const Events = () => {

    const upcomingEvents = [
        {
            title: "Ontario Mathematics Contest 2023",
            date: "October 16-20, 2023",
            type: "In Person Contest",
        },
    ]

    return (
        <>
            <div className="bg-gradient-to-br from-white to-[#cfd1d3]">
                <div className="flex flex-col w-screen min-h-[calc(100vh-8rem)] bg-[url('/assets/events-bg.svg')] items-center bg-left-top bg-cover bg-no-repeat">
                    <Navbar/>
                    <NavbarPlaceholder/>
                    <section className="flex-1 w-full justify-start lg:justify-between max-w-[90rem] flex py-24 flex-col gap-8 lg:flex-row items-center lg:items-start text-center lg:text-left px-4">
                        <h1 className="homeh1 leading-[120%]">Upcoming <br /> Events</h1>
                        <div className="flex flex-col items-end gap-8 ">
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className="flex flex-col items-center justify-start gap-2 lg:flex-row lg:gap-6 lg:items-start">
                                    <h2 className="text-2xl lg:text-3xl font-bold lg:max-w-[8rem] text-right">{event.date}</h2>
                                    <div className="flex-col bg-white bg-opacity-60 border-4 rounded-md border-brandNeutral-100 py-4 px-8 w-[min(32rem,90vw)]">
                                        <h2 className="text-lg text-brandYellow-500">{event.type}</h2>
                                        <h1 className="mb-4 text-2xl font-bold lg:text-3xl">{event.title}</h1>
                                        <Link className='px-4 py-2 text-xl text-white transition-colors rounded-md bg-brandYellow-500 hover:bg-brandYellow-600' href="/contact">Contact Us</Link>
                                        <p className='mt-2 text-gray-500'>Reach out to speak about participation</p>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Events
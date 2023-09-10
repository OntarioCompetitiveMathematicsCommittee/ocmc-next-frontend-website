"use client"

import { useState } from "react"

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"

import Link from 'next/link'

const MathContests = () => {

    const [carousel, setCarousel] = useState(0)

    const changeCarousel = () => {
        setCarousel(carousel ? 0 : 1)
    }

    return (
        <>
            <Navbar/>
            <NavbarPlaceholder/>
            <section className="absolute top-0 w-screen text-center">
                <div className={"bg-[url('/assets/omc.png')] bg-left-top bg-cover bg-no-repeat h-screen absolute w-screen transition-transform duration-500 " 
                    + (carousel ? "-translate-x-full" : "translate-x-0")}>
                    <button type="button" onClick={changeCarousel} className={"absolute top-[calc(100vh/2.2)] z-20 right-4"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-24 h-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-60"></div>
                    <div className="absolute flex flex-col items-center justify-center w-full h-full gap-8">
                        <h1 className="homeh1">Ontario Mathematics Competition</h1>
                        <div className="flex flex-col gap-2">
                            <p className="font-medium homeh3">{"The Ontario Mathematics Competition (OMC) and Leibniz Mathematics Competition (LMC) are 25-question multiple-choice contests similar in format to the American Mathematics Competition (AMC) and the Pascal, Cayley, and Fermat (PCF) contests. The difficulty level is around that of AMC. Top scorers will compete in the [I honestly don't know what this stands for] (OIME)."}
                            </p>
                            <p className="underline homeh3">
                                Interested? Contact us at <span className="text-blue-600 underline"><Link href="/contact">ontariocmc@gmail.com</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={"bg-[url('/assets/oime.png')] bg-left-top bg-cover bg-no-repeat h-screen absolute w-screen transition-transform duration-500 " 
                    + (!carousel ? "translate-x-full" : "translate-x-0")}>
                    <button type="button" onClick={changeCarousel} className={"absolute top-[calc(100vh/2.2)] z-20 rotate-180 left-4"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-24 h-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-60"></div>
                    <div className="absolute flex flex-col items-center justify-center w-full h-full gap-8">
                        <h1 className="homeh1">Ontario Invitational Mathematics Examination</h1>
                        <div className="flex flex-col gap-2">
                            <p className="font-medium homeh3">
                                {"The Ontario Invitational Mathematics Examination (OIME)^ is an invitational full-solution contest inspired by similar " + 
                                "invitational mathematics competitions. It has 10 questions, with difficulty ranging from early " + 
                                "AIME questions to mid-level Canadian Mathematical Olympiad (CMO) questions."}
                            </p>
                            <p className="underline homeh3">
                                Interested? Contact us at <span className="text-blue-600 underline"><Link href="/contact">ontariocmc@gmail.com</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MathContests
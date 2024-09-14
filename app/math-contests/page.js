"use client"

import { useState } from "react"

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"
import Footer from "@components/homepage/Footer"

import Section from "@components/homepage/Section"

import omc from "@public/assets/omc.png"
import oime from "@public/assets/oime.png"
import tmc from "@public/assets/tmc.png"

import Link from 'next/link'

const MathContests = () => {

    return (
        <div className="flex flex-col">
            <div className="bg-[url('/assets/ocmc-bg.svg')] h-screen w-screen bg-right-top bg-no-repeat bg-cover fixed overflow-y-auto overflow-x-hidden">
                <Navbar/>
                <NavbarPlaceholder/>
                <section className="absolute top-0 flex flex-col items-center w-screen text-center pt-36">
                    <h1 className="font-medium text-black homeh1">Our Offerings</h1>
                    <div className="w-screen py-4 border-b-2 lg:hidden"></div>
                    <div className="flex flex-col items-center justify-center w-screen -translate-y-24 lg:translate-y-0">
                        <Section
                            image={omc}
                            title="Ontario Mathematics Competition"
                            text="The Ontario Mathematics Competition (OMC) is the flagship annual contest of the Ontario Competitive Mathematics Committee (OCMC), 
                            participated by hundreds of high school students across Ontario and beyond since the 2022 school year. Designed as a student-ran counterpart 
                            to the CEMC PCF contests and the AMC, the OMC consists of 25 multiple-choice questions to be completed in 60 minutes. The contest takes place 
                            between October 15-18, and school sign-up will end on Sept 30, so be sure to sign up before then if interested!"
                            isPadding={true}
                        />
                        <div className="w-screen border-b-2"></div>
                        <Section
                            image={oime}
                            title="Ontario Invitational Mathematics Examination"
                            text="The Ontario Invitational Mathematics Examination (OIME) is an invitational full-solution contest inspired by similar invitational mathematics competitions. It has 10 questions, with difficulty ranging from early AIME questions to mid-level Canadian Mathematical Olympiad (CMO) questions."
                            isPadding={true}
                        />
                        <div className="w-screen border-b-2"></div>
                        <Section
                            image={tmc}
                            title="Tesseract Mathematics Challenge"
                            text="The Tesseract Mathematics Challenge (TMC) is a one-hour contest featuring five pairs of mid-to-late Euclid-difficulty short- and long-answer questions to be completed in one hour. The TMC will be held between March 4th and March 8th and school registration closes February 16th."
                            isPadding={true}
                        />
                    </div>
                    <Footer />
                </section>
            </div>
        </div>
    )
}

export default MathContests

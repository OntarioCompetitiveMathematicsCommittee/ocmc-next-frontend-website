"use client"

import { useState } from "react"

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"

import Section from "@components/homepage/Section"

import omc from "@public/assets/omc.png"
import oime from "@public/assets/oime.png"

import Link from 'next/link'

const MathContests = () => {

    return (
        <div className="flex flex-col">
            <div className="bg-[url('/assets/ocmc-bg.svg')] h-screen w-screen bg-right-top bg-no-repeat bg-cover fixed overflow-y-auto overflow-x-hidden">
                <Navbar/>
                <NavbarPlaceholder/>
                <section className="absolute top-0 w-screen text-center flex flex-col items-center pt-36">
                    <h1 className="homeh1 text-black font-medium">Our Offerings</h1>
                    <div className="border-b-2 w-screen lg:hidden py-4"></div>
                    <div className="w-screen flex flex-col items-center justify-center -translate-y-24 lg:translate-y-0">
                        <Section
                            image={omc}
                            title="Ontario Math Competition"
                            text="The Ontario Mathematics Competition (OMC) and Leibniz Mathematics Competition (LMC) are 
                                25-question multiple-choice contests similar in format to the American Mathematics Competition 
                                (AMC) and the Pascal, Cayley, and Fermat (PCF) contests. The difficulty level is around that of AMC. 
                                Top scorers will compete in the OIME"
                            isPadding={true}
                        />
                        <p>Interested in writing the OMC? <Link href="/contact" className="text-brandBlue-600 underline text-lg my-2">Contact Us</Link></p>
                        <div className="border-b-2 w-screen"></div>
                        <Section
                            image={oime}
                            title="Invitational Mathematics Examination"
                            text="The Ontario Invitational Mathematics Examination (OIME) is an invitational full-solution contest inspired by similar invitational mathematics competitions. It has 10 questions, with difficulty ranging from early AIME questions to mid-level Canadian Mathematical Olympiad (CMO) questions."
                            isPadding={true}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MathContests
"use client"

import { useState } from "react"

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"
import Footer from "@components/homepage/Footer"

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
                <section className="absolute top-0 flex flex-col items-center w-screen text-center pt-36">
                    <h1 className="font-medium text-black homeh1">Our Offerings</h1>
                    <div className="w-screen py-4 border-b-2 lg:hidden"></div>
                    <div className="flex flex-col items-center justify-center w-screen -translate-y-24 lg:translate-y-0">
                        <Section
                            image={omc}
                            title="Ontario Mathematics Competition"
                            text="The Ontario Mathematics Competition (OMC) and Leibniz Mathematics Competition (LMC) are 
                                25-question multiple-choice contests similar in format to the American Mathematics Competition 
                                (AMC) and the Pascal, Cayley, and Fermat (PCF) contests. The difficulty level is around that of AMC. 
                                Top scorers will compete in the OIME. This fall, the OMC will run between October 16th and October 20th. School registration closes September 29th."
                            isPadding={true}
                        />
                        <p>Interested in writing the OMC? <Link href="/contact" className="my-2 text-lg underline text-brandBlue-600">Contact Us</Link> by September 29th</p>
                        <div className="w-screen border-b-2"></div>
                        <Section
                            image={oime}
                            title="Ontario Invitational Mathematics Examination"
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
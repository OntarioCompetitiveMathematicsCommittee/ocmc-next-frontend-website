"use client"

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"
import Footer from "@components/homepage/Footer"

const PastContests = () => {

    return (
        <div className="flex flex-col">
            <div className="bg-[url('/assets/ocmc-bg.svg')] h-screen w-screen bg-right-top bg-no-repeat bg-cover fixed overflow-y-auto overflow-x-hidden">
                <Navbar/>
                <NavbarPlaceholder/>
                <section className="absolute top-0 flex flex-col items-center w-screen text-center pt-36">
                    <h1 className="font-medium text-black homeh1">Past Contests, Solutions, and Results</h1>
                    <div className="w-screen py-4 border-b-2 lg:hidden"></div>
                    <div className="flex flex-col items-center justify-center w-screen">
                        <h1 className="mt-20 mb-10 font-medium text-black portalh2">Ontario Mathematics Competition</h1>
                        
                        <div className="relative overflow-x-auto">
                            <table className="text-sm text-left text-gray-100 mx-14 portalh2">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr>
                                        <th className="px-5 py-3 md:px-10 lg:px-20">Contests</th>
                                        <th className="px-5 py-3 md:px-10 lg:px-20">Solutions</th>
                                        <th className="px-5 py-3 md:px-10 lg:px-20">Results</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-brandNeutral-100">
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/contests/2023-spring-omc-I.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Spring &lsquo;23 I
                                        </a></td>
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/solutions/2023-spring-omc-I.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Spring &lsquo;23 I
                                        </a></td>
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/results/2023-spring-omc.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Spring &lsquo;23
                                        </a></td>
                                    </tr>
                                    <tr className="bg-brandNeutral-100">
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/contests/2023-spring-omc-II.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Spring &lsquo;23 II
                                        </a></td>
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/solutions/2023-spring-omc-II.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Spring &lsquo;23 II
                                        </a></td>
                                        <td className="p-5 md:px-10 lg:px-20"></td>
                                    </tr>
                                    <tr className="bg-brandNeutral-100">
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/contests/2023-fall-omc-I.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Fall &lsquo;23 I
                                        </a></td>
                                        <td className="py-4"><a className="p-5 md:px-10 lg:px-20"
                                            href="/past-contests/solutions/2023-fall-omc-I.pdf"
                                            alt="alt text"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Fall &lsquo;23 I
                                        </a></td>
                                        <td className="p-5 md:px-10 lg:px-20"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="w-screen h-60"></div>
                    </div>
                    <Footer />
                </section>
            </div>
        </div>
    )
}

export default PastContests

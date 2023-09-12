import Link from 'next/link'

import Navbar from "@components/elements/Navbar"
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"
import Footer from "@components/homepage/Footer"

const Error404 = () => {
    return (
        <div>
            <Navbar />
            <NavbarPlaceholder />
            <div className="flex flex-col items-center justify-center w-full h-screen gap-8 pb-32">
                <h1 className="portalh2">404 Error</h1>
                <p className="text-xl text-brandBlue-900">Page not found. <Link className='text-blue-600 underline' href='/'>Return to Home &rarr;</Link></p>
            </div>
        </div>
    )
}

export default Error404
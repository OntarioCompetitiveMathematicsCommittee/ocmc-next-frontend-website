// make sure the parent is relative

import Link from 'next/link'

const BackButton = ({ path }) => {
    return (
        <Link className="absolute flex items-center gap-2 top-6 left-6" href={path}>
            <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <h1 className="hidden text-xl md:block">Back</h1>
        </Link>
    )
}

export default BackButton
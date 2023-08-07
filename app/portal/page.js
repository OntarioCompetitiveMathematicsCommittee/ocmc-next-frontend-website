"use client"

import useAuth from '@components/hooks/useAuth'

const Portal = () => {
    const { first_name, last_name, highest_status } = useAuth();
    return (
        <>
            <div className='w-full h-full flex flex-col justify-center pb-48 items-center gap-16 overflow-scroll'>
				{/** title with proctor school name */}
				<div className='text-center'>
					<h1 className={"text-3xl lg:text-7xl md:text-5xl"}>Welcome To</h1>
					<h2 className={"text-3xl lg:text-7xl md:text-5xl font-bold text-brandBlue-900"}>The OCMC Student Portal</h2>
				</div>
                <h2 className={"text-xl lg:text-5xl md:text-3xl text-brandBlue-900"}>{highest_status} Portal</h2>
            </div>
        </>
  )
}

export default Portal
"use client"

import useAuth from '@hooks/useAuth'

const Portal = () => {
    const { first_name, last_name, highest_status } = useAuth();
    return (
        <>
            <div className='flex flex-col items-center justify-center w-full h-full gap-10 pb-48 overflow-scroll md:gap-16'>
				{/** title with proctor school name */}
				<div className='text-center'>
					<h1 className={"lg:text-6xl md:text-5xl text-3xl"}>Welcome To</h1>
					<h2 className={"lg:text-6xl text-5xl font-bold text-brandBlue-900"}>The OCMC Student Portal</h2>
				</div>
                <h2 className={"lg:text-5xl text-3xl text-brandBlue-900"}>{highest_status} Portal</h2>
            </div>
        </>
  )
}

export default Portal
"use client";

// import required modules and components
import PortalNav from '@components/components/PortalNav'
import PersistLogin from '@components/PersistLogin';
import Prefetch from '@components/Prefetch'
import RequireAuth from '@components/RequireAuth';

import PortalHeader from '@components/PortalHeader'

import { ROLES } from '@config/roles'

const PortalLayout = ({ children }) => {

    return (
        <>
            {/** keep user signed in */}
            <PersistLogin>
                {/** restrict access to users with any role in ROLES object */}
                <RequireAuth allowedRoles={[...Object.values(ROLES)]}>
                    {/** preload assets for smoother user experience */}
                    <Prefetch>
                        <div className='flex flex-col h-screen'>
                            {/** header */}
                            <PortalHeader />
                            <div className='flex flex-1'>
                                {/** navbar/menu */}
                                <PortalNav />
                                {/** portal content */}
                                <div className='flex-1 bg-brandNeutral-100 bg-[url("/assets/portal-bg.svg")] bg-cover'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </Prefetch>
                </RequireAuth>
            </PersistLogin>
        </>
    )
}

export default PortalLayout

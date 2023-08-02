"use client";

import PortalHeader from '@components/components/PortalHeader'
import PersistLogin from '@components/PersistLogin';
import Prefetch from '@components/Prefetch'
import RequireAuth from '@components/RequireAuth';

import PortalNav from '@components/PortalNav'

import { ROLES } from '@config/roles'

const PortalLayout = ({ children }) => {

    return (
        <>
            <PersistLogin>
                <RequireAuth allowedRoles={[...Object.values(ROLES)]}>
                    <Prefetch>
                        <div className='flex flex-col h-screen'>
                            <PortalNav />
                            <div className='flex gap-12 flex-1'>
                                <PortalHeader />
                                <div className='flex-1'>
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

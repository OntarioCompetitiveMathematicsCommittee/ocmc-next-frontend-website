"use client";

import PortalHeader from '@components/components/PortalHeader'
import PortalFooter from '@components/components/PortalFooter'
import PersistLogin from '@components/PersistLogin';
import Prefetch from '@components/Prefetch'
import RequireAuth from '@components/RequireAuth';

import { ROLES } from '@config/roles'

const PortalLayout = ({ children }) => {

    return (
        <>
            <PortalHeader />
                <PersistLogin>
                    <RequireAuth allowedRoles={[...Object.values(ROLES)]}>
                        <Prefetch>
                            {children}
                        </Prefetch>
                    </RequireAuth>
                </PersistLogin>
            <PortalFooter />
        </>
    )
}

export default PortalLayout

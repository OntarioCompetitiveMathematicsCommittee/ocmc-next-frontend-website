"use client"

import { useRouter } from 'next/navigation'
import useAuth from '@hooks/useAuth';
import PageNotFound from '@components/PageNotFound'

const RequireAuth = ({ allowedRoles, children }) => {
    const router = useRouter();
    const { roles } = useAuth();

    if (!roles.some(role => allowedRoles.includes(role))){
        return <PageNotFound/>
    }

    return children;
}

export default RequireAuth

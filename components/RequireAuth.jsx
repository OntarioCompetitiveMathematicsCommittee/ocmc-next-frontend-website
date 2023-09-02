"use client"

import { useRouter } from 'next/navigation'
import useAuth from '@hooks/useAuth';

const RequireAuth = ({ allowedRoles, children }) => {
    const router = useRouter();
    const { roles } = useAuth();

    if (!roles.some(role => allowedRoles.includes(role))){
        router.push('/page-not-found');
    } else {
        return children
    }
}

export default RequireAuth

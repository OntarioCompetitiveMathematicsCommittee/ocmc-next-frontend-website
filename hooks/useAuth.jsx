"use client"

import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { selectCurrentToken } from '../components/features/auth/authSlice';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let isExecutive = false;
    let isProctor = false;
    let isParticipant = false;
    let highest_status = 'Viewer';

    if (token) {
        const decoded = jwtDecode(token);
        const { id, username, first_name, last_name, roles } = decoded.UserInfo;

        isAdmin = roles.includes('Admin');
        isExecutive = roles.includes('Executive');
        isProctor = roles.includes('Proctor');
        isParticipant = roles.includes('Participant');

        if (isParticipant) highest_status = 'Participant';
        if (isProctor) highest_status = 'Proctor';
        if (isExecutive) highest_status = 'Executive';
        if (isAdmin) highest_status = 'Admin';

        return { id, username, first_name, last_name, roles, highest_status, isAdmin, isExecutive, isProctor, isParticipant };
    }

    return { id: '', username: '', first_name: '', last_name: '', roles: [], isAdmin, isExecutive, isProctor, isParticipant, highest_status};
}

export default useAuth

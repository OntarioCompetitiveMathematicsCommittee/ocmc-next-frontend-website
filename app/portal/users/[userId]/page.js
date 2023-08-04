"use client"

// import required modules and components
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUserById } from '@components/features/users/usersApiSlice'

import EditUserForm from '@components/features/users/EditUserForm'

const EditUser = () => {
    // get user id
    const params = useParams();
    const id = params.userId;
    
    // get user data using id
    const user = useSelector((state) => selectUserById(state, id));
    // render component if user data is available, otherwise display loading message
    const content = user ? <EditUserForm user={user} editingAll={true}/> : <div>Loading...</div>
    return content;
}

export default EditUser

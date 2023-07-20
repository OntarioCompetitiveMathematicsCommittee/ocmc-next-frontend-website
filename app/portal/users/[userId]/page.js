"use client"

import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../../../components/features/users/usersApiSlice'

import EditUserForm from '../../../../components/features/users/EditUserForm'

const EditUser = () => {
    const params = useParams();
    const id = params.userId;
    const user = useSelector((state) => selectUserById(state, id));
    const content = user ? <EditUserForm user={user} editingAll={true}/> : <div>Loading...</div>
    return content;
}

export default EditUser

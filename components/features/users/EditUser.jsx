"use client"

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

import EditUserForm from './EditUserForm'

const EditUser = () => {
    const router = useRouter();
	const id = router.query.userId;
	const user = useSelector((state) => selectUserById(state, id));
	const content = user ? <EditUserForm user={user} editingAll={true}/> : <div>Loading...</div>
	return content;
}

export default EditUser

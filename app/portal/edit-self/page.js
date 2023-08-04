"use client";

// import required modules and components
import { useSelector } from 'react-redux';
import { selectUserById } from '@components/features/users/usersApiSlice';
import useAuth from '@components/hooks/useAuth';

import EditUserForm from '@components/features/users/EditUserForm';

// edit user profile
const EditSelf = () => {
	// get user id and user data from state store
	const { id } = useAuth();
	// get user data from state store using id
	const user = useSelector((state) => selectUserById(state, id));
	// render if user data is available
	const content = user ? <EditUserForm user={user} editingAll={false}/> : <div>Loading...</div>
	return content;
}

export default EditSelf

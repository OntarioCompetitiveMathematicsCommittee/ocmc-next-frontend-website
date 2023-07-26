"use client";

import { useSelector } from 'react-redux';
import { selectUserById } from '@components/features/users/usersApiSlice';
import useAuth from '@components/hooks/useAuth';

import EditUserForm from '@components/features/users/EditUserForm';

const EditSelf = () => {
	const { id } = useAuth();
	const user = useSelector((state) => selectUserById(state, id));
	const content = user ? <EditUserForm user={user} editingAll={false}/> : <div>Loading...</div>
	return content;
}

export default EditSelf

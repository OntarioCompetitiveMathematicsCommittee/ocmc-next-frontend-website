"use client"

import { useParams } from 'next/navigation';
import { useActivateMutation } from '@components/features/auth/authApiSlice';

const VerifyPage = () => {
    // get token from url
	const params = useParams();
	const token = params.token;

    // handles login
	const [activate, { isLoading, isSuccess, isError, error }] =
        useActivateMutation();
    
    const handleActivate = async (e) => {
        e.preventDefault();
        try {
            // send login request + get access token
            const activated = activate({
                token
            });
        } catch (err) {
            console.log({err});
        }
    };
    
    return (
        <>
			<h1 className={"lg:text-6xl md:ext-5xl text-3xl"}>{token}</h1>
            <form
                onSubmit={handleActivate}>
                <button
					className='w-[90vw] md:w-[min(30rem,45vw)] h-14 text-white font-medium font-[Montserrat] rounded-md
                    bg-gradient-to-br from-brandBlue-600 via-brandGreen-600 to-brandBlue-600 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100'
					type='submit'>
					Activate!
				</button>
            </form>
        </>
    )
}

export default VerifyPage;
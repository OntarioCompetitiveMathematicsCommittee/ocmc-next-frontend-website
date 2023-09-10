"use client"

import { useParams } from 'next/navigation';
import { useActivateMutation } from '@components/features/email/emailApiSlice';

import Link from 'next/link';

import Navbar from '@components/elements/Navbar';
import NavbarPlaceholder from "@components/elements/NavbarPlaceholder"

const VerifyPage = () => {
    // get token from url
	const params = useParams();
	const token = params.token;

    // handles login
	const [activate, { isLoading, isSuccess, isError, error }] =
        useActivateMutation();
    
    const handleActivate = async (e) => {
        e.preventDefault();

        const activated = await activate({
            token
        });
    };

    let errMsg = "";
    let disable = false;
    if(isError){
        // handle different errors
		if (!error.status) errMsg = 'No server response';
		else if (error.status === 401)
			errMsg = 'Token Invalid: Token may have already been used or does not exist';
		else if (error.status === 403)
            errMsg = 'Token Expired';
		else errMsg = error.data?.message;
    }
    
    let content;

    if(isSuccess){
        content = (
            <section className="flex flex-col items-center flex-1 w-screen gap-6 text-center pt-36 md:bg-[url('/assets/auth-graphic.svg')] bg-left-top bg-no-repeat bg-cover ">
				<h1 className='portalh2'>User activated!</h1>
				<p className='text-xl'>
					<br />
					Click <Link href='/login' className='text-blue-600 underline'>here</Link> to redirect to log in.
				</p>
			</section>
        );
    }
    else {
        content = (
            <div className='flex flex-col items-center bg-brandNeutral-100 bg-[url("/assets/portal-bg.svg")] bg-cover h-[100vh] static overflow-hidden'>
				<h1 className='mt-10 portalh2'>Activate your account</h1>
				<p className='mt-5 text-xl'>
					Please click the button to activate your account.
					{/* <br />
					Click <Link href='/login' className='text-blue-600 underline'>here</Link> to redirect to log in. */}
				</p>
                <form
                    onSubmit={handleActivate}>
                    <button
					    className='mt-16 w-[90vw] md:w-[min(30rem,45vw)] h-14 text-white font-medium font-[Montserrat] rounded-md
                        bg-gradient-to-br from-brandBlue-600 via-brandGreen-600 to-brandBlue-600 disabled:bg-red-500 transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100'
		    			type='submit' disabled={disable} >
			    		Activate!
				    </button>
                </form>
                <h1 className={"text-red-500 text-xl"}>{errMsg}</h1>
			</div>
        );
    }
    
    return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<NavbarPlaceholder/>
			{content}
		</div>
	);
}

export default VerifyPage;
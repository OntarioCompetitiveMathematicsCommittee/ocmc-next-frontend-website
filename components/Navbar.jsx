'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from '@config/nav';
import HamburgerMenu from '@components/HamburgerMenu';

import Logo from '@public/assets/logo.svg';

const Navbar = () => {
	const [navOpen, setNavOpen] = useState(false);

	const handleNavToggle = () => {
		setNavOpen((prev) => !prev);
	};

	return (
		<>
			<nav
				className='fixed top-0 left-0 z-50 flex justify-center w-full px-4 py-2 shadow-sm bg-brandNeutral-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60'>
				<div className='max-w-[90rem] w-full flex justify-between items-center'>
					<Link
						className='flex items-center gap-2 text-2xl font-medium'
						href='/'>
						<Image
							className='w-12 h-12'
							src={Logo}
							alt='OCMC Logo'
						/>
						<h1>OCMC</h1>
					</Link>
					<div className='flex items-center'>
						<ul
							className={
								'whitespace-nowrap gap-12 items-start p-16 flex flex-col fixed bg-brandNeutral-200 top-0 right-0 w-3/4 h-screen text-2xl border-4 transition-transform duration-500 ' +
								' md:duration-0 md:transition-none md:flex-row md:border-0 md:translate-x-0 md:h-0 md:p-0 md:text-base md:bg-transparent md:static md:items-center md:justify-start ' +
								(navOpen
									? 'translate-x-0'
									: 'translate-x-[100%]')
							}>
							{Object.keys(navLinks).map((key, index) => (
								<li className='relative w-auto group' key={key}>
									<Link href={key}>{navLinks[key]}</Link>
									<span className='w-0 h-[2px] bg-brandNeutral-600 absolute bottom-[2px] left-0 transition-all group-hover:w-full'></span>
								</li>
							))}

							<Link
								className='box-border px-6 py-1 transition-all border-2 rounded-md cursor-pointer group hover:bg-gradient-to-br from-brandBlue-500 to-brandGreen-600'
								style={{
									borderImage:
										'linear-gradient(45deg, #2182DB, #05A69E) 1',
								}}
								href='/signup'>
								<div
									className='text-xl font-medium text-transparent transition-all md:text-base bg-clip-text bg-gradient-to-r from-brandBlue-500 to-brandGreen-600 group-hover:text-white'>
									Register
								</div>
							</Link>
						</ul>
						<HamburgerMenu
							navOpen={navOpen}
							handleNavToggle={handleNavToggle}
						/>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;

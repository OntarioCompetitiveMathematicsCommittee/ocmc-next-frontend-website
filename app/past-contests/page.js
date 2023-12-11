'use client';

import Navbar from '@components/elements/Navbar';
import NavbarPlaceholder from '@components/elements/NavbarPlaceholder';
import Footer from '@components/homepage/Footer';

import PastContestRow from '@components/past-contests/PastContestRow';

const PastContests = () => {
	return (
		<div className='flex flex-col'>
			<div className="bg-[url('/assets/ocmc-bg.svg')] h-screen w-screen bg-right-top bg-no-repeat bg-cover fixed overflow-y-auto overflow-x-hidden">
				<Navbar />
				<NavbarPlaceholder />
				<section className='absolute top-0 flex flex-col items-center w-screen text-center pt-36'>
					<h1 className='font-medium text-black homeh1'>
						Past Contests, Solutions, and Results
					</h1>
					<div className='w-screen py-4 border-b-2 lg:hidden'></div>
					<div className='flex flex-col items-center justify-center w-screen'>
						<h1 className='mt-20 mb-10 font-medium text-black portalh2'>
							Ontario Mathematics Competition
						</h1>

						<div className='relative overflow-x-auto'>
							<table className='text-sm text-left text-gray-100 mx-14 portalh2'>
								<thead className='text-xs text-gray-700 uppercase bg-gray-200'>
									<tr>
										<th className='px-5 py-3 md:px-10 lg:px-20'>
											Contests
										</th>
										<th className='px-5 py-3 md:px-10 lg:px-20'>
											Solutions
										</th>
										<th className='px-5 py-3 md:px-10 lg:px-20'>
											Results
										</th>
									</tr>
								</thead>
								<tbody>
									<PastContestRow contestName="Spring &lsquo;23 I" PDFName="2023-spring-omc-I" hasContest={true} hasSolutions={true} hasResults={true}/>
									<PastContestRow contestName="Spring &lsquo;23 II" PDFName="2023-spring-omc-II" hasContest={true} hasSolutions={true} hasResults={false}/>
									<PastContestRow contestName="Fall &lsquo;23" PDFName="2023-fall-omc" hasContest={true} hasSolutions={true} hasResults={true}/>
								</tbody>
							</table>
						</div>

						<div className='w-screen h-60'></div>
					</div>
					<Footer />
				</section>
			</div>
		</div>
	);
};

export default PastContests;

import Image from 'next/image';
import Link from 'next/link';

const Section = ({
	buttonText,
	buttonPath,
	buttonColour,
	buttonHover,
	colour,
	image,
	title,
	text,
	isPadding,
}) => {
	return (
		<div
			className={
				'flex justify-center w-full ' + colour + (isPadding && ' pb-40')
			}>
			<div className='flex flex-col items-center pt-40 pb-2 lg:flex-row lg:justify-center w-full max-w-[100rem]'>
				<div className='flex flex-col items-center w-full max-w-2xl gap-2 px-4 text-center lg:text-left lg:items-start'>
					<h1 className={"homeh1 " + (colour && ' text-white')}>
						{title}
					</h1>
					<h3 className={"homeh3 " + (colour && ' text-white')}>
						{text}
					</h3>
					{buttonText && (
						<Link
							className={
								'text-white py-3 px-8 rounded-md text-md lg:text-xl mt-2 transition-all ' +
								buttonColour +
								' ' +
								buttonHover
							}
							href={buttonPath}>
							{buttonText}
						</Link>
					)}
				</div>
				<div className='w-full lg:w-1/3'>
					<Image
						className='w-3/4 max-w-xl mx-auto lg:w-full'
						src={image}
						alt={title + ' graphic'}
					/>
				</div>
			</div>
		</div>
	);
};

export default Section;

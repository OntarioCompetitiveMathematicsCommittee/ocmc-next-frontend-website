import Image from 'next/image'

const ExecPod = ({ image, firstName, lastName, bgColour, textColour, position, link }) => {
    return (
        <div className={`flex items-center gap-6 justify-start md:justify-center rounded-xl p-3 w-[90vw] max-w-md md:flex-col md:p-4 md:w-auto md:gap-2 ${bgColour}`} >
            <Image className='w-32 rounded-xl md:w-64' src={image} alt="yes"/>
            <div className='flex flex-col items-start justify-center gap-2 md:items-center'>
                <h2 className={`text-2xl font-bold ${textColour} `}>
                    {firstName + " " + lastName}
                </h2>
                <h3 className='text-md font-regular'>
                    {position}
                </h3>
                {
                    link &&
                    <a className={`underline ${textColour}`} href={link} target="_blank">
                        More {firstName} &rarr;
                    </a>
                }
            </div>
        </div>
    )
}

export default ExecPod
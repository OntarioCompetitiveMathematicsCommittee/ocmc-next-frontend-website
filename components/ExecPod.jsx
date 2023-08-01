import Image from 'next/image'
import Link from 'next/link'

const ExecPod = ({ image, firstName, lastName, bgColour, textColour, position }) => {
  return (
    <div className={'flex flex-col items-center gap-2 justify-center w-80 md:90 lg:w-96 rounded-full p-4 pb-12 '+ bgColour} >
        <Image className='rounded-full' src={image} alt="yes"/>
        <h2 className={"text-3xl font-black " + textColour}>{firstName + " " + lastName}</h2>
        <h3 className='text-lg font-medium'>{position}</h3>
        <Link className={'underline ' + textColour} href="">More {firstName} &rarr;</Link>
    </div>
  )
}

export default ExecPod
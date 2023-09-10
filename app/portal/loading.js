import Image from 'next/image'
import logo from '@public/assets/logo.svg'

const Loading = () => {
  return (
    <div className='h-full w-full justify-center items-center flex flex-col gap-2 pb-24'>
      <div className='animate-spin'>
        <Image src={logo} alt="logo" />
      </div>
      <p>Loading...</p>
    </div>
  )
}

export default Loading
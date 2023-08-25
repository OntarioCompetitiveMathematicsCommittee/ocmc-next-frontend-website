import Image from 'next/image'
import Logo from '@public/assets/logo.svg'

const NavbarPlaceholder = () => {
  return (
    <div className='py-2 opacity-0'>
        <Image className='h-12 w-12' src={Logo} alt="OCMC Logo" />
    </div>
  )
}

export default NavbarPlaceholder
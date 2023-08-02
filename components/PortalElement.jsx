"use client"

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const PortalElement = ({ icon, path, name, handleButton}) => {

    const [selected, setSelected] = useState(false);

    const changeSelected = () => {
        setSelected(prev => !prev);
    }

    return (
        <li className={'p-2 flex gap-2 w-full rounded-md ' + (selected && "bg-brandBlue-200")}>
            <Image src={icon} alt={name}/>
            {handleButton ? 
                <button onClick={handleButton}>{name}</button> : 
                <Link href={path} onClick={changeSelected}>{name}</Link> 
            }
        </li>
    )
}

export default PortalElement
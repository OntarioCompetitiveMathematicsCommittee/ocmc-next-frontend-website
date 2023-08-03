import Link from 'next/link'
import Image from 'next/image'

const PortalElement = ({ icon, path, name, handleButton, selected, setPage }) => {

    const changePage = () => {
        setPage(path)
    }

    return (
        <li className={'p-2 flex gap-2 w-full rounded-md ' + (selected && "bg-brandBlue-200 text-brandBlue-900")}>
            <Image src={icon} alt={name}/>
            {handleButton ? 
                <button onClick={handleButton}>{name}</button> : 
                <Link href={path} onClick={changePage}>{name}</Link> 
            }
        </li>
    )
}

export default PortalElement
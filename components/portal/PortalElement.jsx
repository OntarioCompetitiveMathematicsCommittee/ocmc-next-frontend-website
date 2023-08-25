import Link from 'next/link'
import Image from 'next/image'

const PortalElement = ({ icon, path, name, selected, setPage }) => {

    const changePage = () => {
        setPage(path)
    }

    return (
        <Link href={path} className={'p-2 flex gap-2 w-full rounded-md ' + (selected && "bg-brandBlue-200 text-brandBlue-900")}>
            <Image src={icon} alt={name}/>
            <h1 onClick={changePage}>{name}</h1> 
        </Link>
    )
}

export default PortalElement
import useAuth from '../../hooks/useAuth'

const PortalHome = () => {
  const { first_name, last_name, highest_status } = useAuth();

  return (
    <div>
        <h1 className='text-red-500'>Portal Home</h1>
        <br /> <br />
        <h2>Welcome, {`${first_name} ${last_name}`}.</h2>
        <br /> <br />
        <p>Status: {highest_status}</p>
        <br /> <br />
    </div>
  )
}

export default PortalHome

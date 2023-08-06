"use client"

// import required modules and components
import useAuth from '@components/hooks/useAuth'

const Portal = () => {
    // get user data
    const { first_name, last_name, highest_status } = useAuth();
    return (
        <div>
            {/** header */}
            <h1 className='text-red-500'>Portal Home</h1>
            <br /> <br />
            {/** welcome message */}
            <h2>Welcome, {`${first_name} ${last_name}`}.</h2>
            <br /> <br />
            {/** role */}
            <p>Status: {highest_status}</p>
            <br /> <br />
        </div>
  )
}

export default Portal
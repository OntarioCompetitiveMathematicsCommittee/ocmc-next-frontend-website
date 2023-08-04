// import required modules and components
import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const ProctorLayout = ({ children }) => {
    // restrict access to users with proctor role
    return (
        <RequireAuth allowedRoles={[ROLES.Proctor]}>
            {children}
        </RequireAuth>
    )
}

export default ProctorLayout
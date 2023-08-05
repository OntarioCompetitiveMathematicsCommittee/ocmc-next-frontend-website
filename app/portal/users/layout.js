// import required modules and components
import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const UsersLayout = ({ children }) => {
    // restrict access to users with admin role
    return (
        <RequireAuth allowedRoles={[ROLES.Admin]}>
            {children}
        </RequireAuth>
    )
}

export default UsersLayout
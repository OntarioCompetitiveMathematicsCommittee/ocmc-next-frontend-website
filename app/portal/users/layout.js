import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@components/config/roles'

const UsersLayout = ({ children }) => {
    return (
        <RequireAuth allowedRoles={[ROLES.Admin]}>
            {children}
        </RequireAuth>
    )
}

export default UsersLayout
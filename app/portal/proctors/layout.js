import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const ProctorLayout = ({ children }) => {
    return (
        <RequireAuth allowedRoles={[ROLES.Proctor]}>
            {children}
        </RequireAuth>
    )
}

export default ProctorLayout
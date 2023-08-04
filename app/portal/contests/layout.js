// importing required modules and components
import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const ContestsLayout = ({ children }) => {
    // restrict access to only admins or execs
    return (
        <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Executive]}>
            {children}
        </RequireAuth>
    )
}

export default ContestsLayout
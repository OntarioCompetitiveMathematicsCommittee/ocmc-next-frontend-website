import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@components/config/roles'

const ParticipantsLayout = ({ children }) => {
    return (
        <RequireAuth allowedRoles={[ROLES.Participant]}>
            {children}
        </RequireAuth>
    )
}

export default ParticipantsLayout
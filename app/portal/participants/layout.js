// import required modules and components
import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const ParticipantsLayout = ({ children }) => {
    // restrict access to users with participant role
    return (
        <RequireAuth allowedRoles={[ROLES.Participant]}>
            {children}
        </RequireAuth>
    )
}

export default ParticipantsLayout
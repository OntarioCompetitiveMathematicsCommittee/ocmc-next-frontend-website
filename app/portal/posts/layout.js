// import required modules and components
import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const PostsLayout = ({ children }) => {
    return (
        // restrict access to users with admin or executive roles
        <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Executive]}>
            {children}
        </RequireAuth>
    )
}

export default PostsLayout
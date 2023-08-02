import RequireAuth from '@components/RequireAuth'
import { ROLES } from '@config/roles'

const PostsLayout = ({ children }) => {
    return (
        <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Executive]}>
            {children}
        </RequireAuth>
    )
}

export default PostsLayout
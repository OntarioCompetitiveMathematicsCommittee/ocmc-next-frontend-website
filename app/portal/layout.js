import PortalHeader from '../../components/components/PortalHeader'
import PortalFooter from '../../components/components/PortalFooter'

const PortalLayout = ({ children }) => {
  return (
    <>
        <PortalHeader />
        <div>
            {children}
        </div>
        <PortalFooter />
    </>
  )
}

export default PortalLayout

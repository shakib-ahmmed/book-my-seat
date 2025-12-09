
import LoadingSpinner from '../../../components/LoadingSpinner'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
    const [role, isRoleLoading] = useRole()
    if (isRoleLoading) return <LoadingSpinner />
    return (
        <div>
            {role === 'customer' && <CustomerStatistics />}
            {role === 'seller' && <SellerStatistics />}
            {role === 'admin' && <AdminStatistics />}
        </div>
    )
}


export default Statistics;
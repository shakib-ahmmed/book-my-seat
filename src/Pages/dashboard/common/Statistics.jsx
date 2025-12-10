import UserStatistics from '../../../components/dashboard/statistics/UserStatistics'
import AdminStatistics from '../../../components/dashboard/statistics/AdminStatistics'
import VendorStatistics from '../../../components/dashboard/statistics/VendorStatistics'
import LoadingSpinner from '../../../components/LoadingSpinner'
import useRole from '../../../hooks/useRole'




const Statistics = () => {
    const [role, isRoleLoading] = useRole()
    if (isRoleLoading) return <LoadingSpinner />
    return (
        <div>
            {role === 'user' && <UserStatistics />}
            {role === 'vendor' && <VendorStatistics />}
            {role === 'admin' && <AdminStatistics />}
        </div>
    )
}


export default Statistics;
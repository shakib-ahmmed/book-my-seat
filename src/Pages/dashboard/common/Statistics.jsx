import UserStatistics from '../../../components/dashboard/statistics/UserStatistics'
import AdminStatistics from '../../../components/dashboard/statistics/AdminStatistics'
import VendorStatistics from '../../../components/dashboard/statistics/VendorStatistics'
import useRole from '../../../hooks/useRole'




const Statistics = () => {
    const [role] = useRole()

    return (
        <div>
            {role === 'user' && <UserStatistics />}
            {role === 'vendor' && <VendorStatistics />}
            {role === 'admin' && <AdminStatistics />}
        </div>
    )
}


export default Statistics;
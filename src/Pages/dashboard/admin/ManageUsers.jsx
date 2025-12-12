import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';
import UserDataRow from '../../../components/dashboard/tablerows/UserDataRow';

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data || [];
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <h2 className="text-2xl font-semibold leading-tight mb-4">Manage Users</h2>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Role
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .filter(u => u)
                                    .map(u => (
                                        <UserDataRow key={u._id} user={u} refetch={refetch} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;

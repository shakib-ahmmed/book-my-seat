import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data || [];
        },
    });

    const makeAdminMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(`/users/${userId}/make-admin`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('User promoted to Admin!');
        },
        onError: () => toast.error('Failed to make Admin'),
    });

    const makeVendorMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(`/users/${userId}/make-vendor`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('User promoted to Vendor!');
        },
        onError: () => toast.error('Failed to make Vendor'),
    });

    const markFraudMutation = useMutation({
        mutationFn: async (userId) => {
            const res = await axiosSecure.patch(`/users/${userId}/mark-fraud`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            toast.success('Vendor marked as fraud!');
        },
        onError: () => toast.error('Failed to mark fraud'),
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#240d0b] mb-6">
                Manage Users
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#b0bdc0] rounded-2xl shadow-lg overflow-hidden">
                    <thead className="bg-[#ba0c10]">
                        <tr>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold uppercase">
                                Role
                            </th>
                            <th className="px-6 py-3 text-white text-left text-sm font-semibold uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-b transition-colors"
                                >
                                    <td className="px-6 py-4 text-[#240d0b] font-semibold">{u.name}</td>
                                    <td className="px-6 py-4 text-[#240d0b]">{u.email}</td>
                                    <td className="px-6 py-4 text-[#240d0b]">{u.role}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        {u.role !== 'admin' && (
                                            <button
                                                onClick={() => makeAdminMutation.mutate(u._id)}
                                                className="px-3 py-1 bg-[#e9d44c] text-[#240d0b] rounded hover:bg-[#fddb1a] font-semibold cursor-pointer"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {u.role !== 'vendor' && (
                                            <button
                                                onClick={() => makeVendorMutation.mutate(u._id)}
                                                className="px-3 py-1 bg-[#e9d44c] text-[#240d0b] rounded hover:bg-[#fddb1a] font-semibold cursor-pointer"
                                            >
                                                Make Vendor
                                            </button>
                                        )}
                                        {u.role === 'vendor' && (
                                            <button
                                                onClick={() => markFraudMutation.mutate(u._id)}
                                                className="px-3 py-1 bg-[#5b0809] text-white rounded hover:bg-[#7e0304] font-semibold cursor-pointer"
                                            >
                                                Mark as Fraud
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-8 text-[#240d0b] font-semibold"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;

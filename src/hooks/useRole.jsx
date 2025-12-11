import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = 'customer', isLoading: isRoleLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/role?email=${user.email}`);
            return response.data.role;
        },
    });

    return { role, isRoleLoading };
};

export default useRole;

import { useQuery } from '@tanstack/react-query';

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/user/role`, {
                    params: { email: user.email },
                });
                return response.data.role;
            } catch (error) {
                console.error('Error fetching user role:', error);
                return null;
            }
        },
    });

    return [role, isRoleLoading];
};

export default useRole;

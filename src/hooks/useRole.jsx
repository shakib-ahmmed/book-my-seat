import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';




const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: role = 'customer', isLoading: isRoleLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (!user?.email) return 'customer';
            const res = await axiosSecure.get(`/user/role?email=${user.email}`);
            return res.data?.role || 'customer';
        },
    });

    return [role, isRoleLoading];
};

export default useRole;

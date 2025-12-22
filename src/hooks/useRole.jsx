import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = "user", isLoading } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !!user?.email && !loading, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role?email=${user.email}`);
            return res.data.role;
        },
    });

    return [role, isLoading];
};

export default useRole;

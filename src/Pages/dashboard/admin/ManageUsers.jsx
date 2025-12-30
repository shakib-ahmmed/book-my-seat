import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });


    const uniqueUsers = Array.from(
        new Map(users.map((u) => [u.email, u])).values()
    );



    const makeAdmin = useMutation({
        mutationFn: (id) =>
            axiosSecure.patch(`/users/${id}/role`, { role: "admin" }),
        onSuccess: () => {
            toast.success("User promoted to admin");
            queryClient.invalidateQueries(["users"]);
        },
        onError: () => toast.error("Failed to make admin"),
    });

    const makeVendor = useMutation({
        mutationFn: (id) =>
            axiosSecure.patch(`/users/${id}/role`, { role: "vendor" }),
        onSuccess: () => {
            toast.success("User promoted to vendor");
            queryClient.invalidateQueries(["users"]);
        },
        onError: () => toast.error("Failed to make vendor"),
    });


    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
            <h2 className="text-3xl font-bold text-[#5b0809] mb-6">
                Manage Users
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#b0bdc0] rounded-2xl shadow-lg overflow-hidden">
                    <thead className="bg-[#ba0c10]">
                        <tr>
                            <th className="px-4 py-2 text-white text-left text-sm uppercase font-semibold">#</th>
                            <th className="px-4 py-2 text-white text-left text-sm uppercase font-semibold">Name</th>
                            <th className="px-4 py-2 text-white text-left text-sm uppercase font-semibold">Email</th>
                            <th className="px-4 py-2 text-white text-left text-sm uppercase font-semibold">Role</th>
                            <th className="px-4 py-2 text-white text-left text-sm uppercase font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {uniqueUsers.length > 0 ? (
                            uniqueUsers.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-2 font-semibold text-[#240d0b]">
                                        {index + 1}
                                    </td>

                                    <td className="px-4 py-2 text-[#240d0b] font-medium">
                                        {user.name || "N/A"}
                                    </td>

                                    <td className="px-4 py-2 text-[#240d0b]">
                                        {user.email}
                                    </td>

                                    <td className="px-4 py-2 capitalize font-semibold text-[#240d0b]">
                                        {user.role || "user"}
                                    </td>

                                    <td className="px-4 py-2 flex flex-wrap gap-2">
                                        {user.role !== "admin" && (
                                            <button
                                                onClick={() => makeAdmin.mutate(user._id)}
                                                className="px-3 py-1 cursor-pointer bg-[#e9d44c] text-[#240d0b] rounded
                                                                      hover:bg-[#fddb1a] font-semibold transition"
                                            >
                                                Make Admin
                                            </button>
                                        )}

                                        {user.role !== "vendor" && (
                                            <button
                                                onClick={() => makeVendor.mutate(user._id)}
                                                className="px-3 py-1 cursor-pointer bg-[#5b0809] text-white rounded
                                                             hover:bg-[#7e0304] font-semibold transition"
                                            >
                                                Make Vendor
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-8 font-semibold text-[#240d0b]">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ManageUsers;

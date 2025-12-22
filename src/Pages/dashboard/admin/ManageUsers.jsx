import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // ================= FETCH USERS =================
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // ================= MAKE ADMIN =================
    const makeAdmin = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/${id}/make-admin`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("User promoted to admin");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to make admin");
        },
    });

    // ================= MAKE VENDOR =================
    const makeVendor = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/${id}/make-vendor`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("User promoted to vendor");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to make vendor");
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name || "N/A"}</td>
                            <td>{user.email}</td>
                            <td className="capitalize font-semibold">
                                {user.role || "user"}
                            </td>
                            <td className="space-x-2">
                                {user.role !== "admin" && (
                                    <button
                                        onClick={() => makeAdmin.mutate(user._id)}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Make Admin
                                    </button>
                                )}

                                {user.role !== "vendor" && (
                                    <button
                                        onClick={() => makeVendor.mutate(user._id)}
                                        className="btn btn-sm btn-success"
                                    >
                                        Make Vendor
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminStatistics = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["allBookings"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings");
            return res.data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/bookings/${id}/status`, { status });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries(["allBookings"]),
        onError: (err) => Swal.fire("Error", err.message, "error"),
    });

    if (isLoading) return <LoadingSpinner />;

   
    const totalBookings = bookings.length;
    const pending = bookings.filter(b => b.status === "pending").length;
    const accepted = bookings.filter(b => b.status === "accepted").length;
    const rejected = bookings.filter(b => b.status === "rejected").length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.quantity * (b.ticket.price || 0)), 0);

    const chartData = [
        { name: "Pending", value: pending, color: "#fddb1a" },
        { name: "Accepted", value: accepted, color: "#4ade80" },
        { name: "Rejected", value: rejected, color: "#ba0c10" },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#240d0b] mb-8">Admin Bookings Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                <div className="bg-[#e9d44c] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-[#240d0b]">Total Bookings</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-[#240d0b]">{totalBookings}</p>
                </div>
                <div className="bg-[#fddb1a] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-[#240d0b]">Pending</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-[#240d0b]">{pending}</p>
                </div>
                <div className="bg-[#4ade80] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-[#240d0b]">Accepted</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-[#240d0b]">{accepted}</p>
                </div>
                <div className="bg-[#ba0c10] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-[#240d0b]">Rejected</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-[#240d0b]">{rejected}</p>
                </div>
            </div>

            <div className="bg-[#b0bdc0] rounded-2xl p-6 shadow-lg mb-10 text-center">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#240d0b] mb-3">Total Revenue</h3>
                <p className="text-3xl sm:text-4xl font-bold text-[#7e0304]">{totalRevenue} BDT</p>
            </div>

            <div className="bg-[#f9f9f9] rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-[#240d0b]">Bookings Status Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#615d5e" />
                        <XAxis dataKey="name" stroke="#240d0b" tick={{ fill: "#240d0b", fontSize: 14, fontWeight: "600" }} />
                        <YAxis stroke="#240d0b" tick={{ fill: "#240d0b", fontSize: 14, fontWeight: "600" }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#f0f0f0", borderRadius: "8px", border: "1px solid #615d5e" }}
                            cursor={{ fill: "#e5e7eb80" }}
                        />
                        <Bar dataKey="value" barSize={60}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-bold text-[#240d0b] mb-5">Pending Bookings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.filter(b => b.status === "pending").map(b => (
                        <div key={b._id} className="bg-white rounded-2xl p-5 shadow flex flex-col justify-between">
                            <p className="font-semibold text-[#240d0b] mb-1">User: {b.email}</p>
                            <p className="font-semibold text-[#240d0b] mb-1">Ticket: {b.ticket.title}</p>
                            <p className="text-gray-700 mb-1">Quantity: {b.quantity}</p>
                            <p className="text-gray-700 mb-3">Total: {b.quantity * (b.ticket.price || 0)} BDT</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateStatusMutation.mutate({ id: b._id, status: "accepted" })}
                                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => updateStatusMutation.mutate({ id: b._id, status: "rejected" })}
                                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;

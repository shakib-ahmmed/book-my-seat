import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const normalize = (status) => status?.toLowerCase();

const AdminStatistics = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    /* ================= FETCH BOOKINGS ================= */
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["allBookings"],
        queryFn: async () => {
            const res = await axiosSecure.get("/bookings");
            return res.data || [];
        },
    });

    /* ================= UPDATE STATUS ================= */
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return axiosSecure.patch(`/bookings/${id}/status`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allBookings"]);
            Swal.fire("Success", "Booking status updated", "success");
        },
        onError: () => {
            Swal.fire("Error", "Failed to update status", "error");
        },
    });

    if (isLoading) return <LoadingSpinner />;

    /* ================= STATS ================= */
    const totalBookings = bookings.length;

    const pending = bookings.filter(
        (b) => normalize(b.status) === "pending"
    ).length;

    const approved = bookings.filter(
        (b) => normalize(b.status) === "approved"
    ).length;

    const rejected = bookings.filter(
        (b) => normalize(b.status) === "rejected"
    ).length;

    const totalRevenue = bookings.reduce((sum, b) => {
        const price = b?.ticket?.price || 0;
        return sum + b.quantity * price;
    }, 0);

    /* ================= CHART DATA ================= */
    const chartData = [
        { name: "Pending", value: pending, color: "#fddb1a" },
        { name: "Approved", value: approved, color: "#4ade80" },
        { name: "Rejected", value: rejected, color: "#ba0c10" },
    ];

    /* ================= UI ================= */
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <h2 className="text-4xl font-bold text-[#240d0b] mb-8">
                Admin Dashboard
            </h2>

            {/* ===== STAT CARDS ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Bookings" value={totalBookings} bg="#e9d44c" />
                <StatCard title="Pending" value={pending} bg="#fddb1a" />
                <StatCard title="Approved" value={approved} bg="#4ade80" />
                <StatCard title="Rejected" value={rejected} bg="#ba0c10" />
            </div>

            {/* ===== REVENUE ===== */}
            <div className="bg-[#b0bdc0] rounded-2xl p-6 shadow-lg mb-10 text-center">
                <h3 className="text-2xl font-semibold text-[#240d0b] mb-2">
                    Total Revenue
                </h3>
                <p className="text-4xl font-bold text-[#7e0304]">
                    {totalRevenue} BDT
                </p>
            </div>

            {/* ===== CHART ===== */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-10">
                <h3 className="text-2xl font-semibold mb-5 text-[#240d0b]">
                    Booking Status Overview
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ===== PENDING BOOKINGS ===== */}
            <h3 className="text-2xl font-bold mb-5 text-[#240d0b]">
                Pending Bookings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings
                    .filter((b) => normalize(b.status) === "pending")
                    .map((b) => (
                        <div
                            key={b._id}
                            className="bg-white rounded-2xl p-5 shadow flex flex-col justify-between"
                        >
                            <div>
                                <p><b>User:</b> {b.email}</p>
                                <p><b>Ticket:</b> {b?.ticket?.title || "N/A"}</p>
                                <p><b>Quantity:</b> {b.quantity}</p>
                                <p className="mb-3">
                                    <b>Total:</b> {b.quantity * (b?.ticket?.price || 0)} BDT
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        updateStatusMutation.mutate({
                                            id: b._id,
                                            status: "approved",
                                        })
                                    }
                                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatusMutation.mutate({
                                            id: b._id,
                                            status: "rejected",
                                        })
                                    }
                                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, bg }) => (
    <div
        style={{ backgroundColor: bg }}
        className="rounded-2xl p-6 shadow-lg text-center"
    >
        <h3 className="text-xl font-semibold text-[#240d0b]">{title}</h3>
        <p className="mt-2 text-3xl font-bold text-[#240d0b]">{value}</p>
    </div>
);

export default AdminStatistics;

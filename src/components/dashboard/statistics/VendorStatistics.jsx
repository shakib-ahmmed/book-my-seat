import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
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

const VendorStatistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["vendorTickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-tickets/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <LoadingSpinner />;

    // Compute statistics
    const totalTicketsAdded = tickets.reduce((sum, t) => sum + t.quantity, 0);
    const totalTicketsSold = tickets.reduce((sum, t) => sum + (t.sold || 0), 0);
    const totalRevenue = tickets.reduce((sum, t) => sum + (t.sold || 0) * t.price, 0);

    const pendingTickets = tickets.filter((t) => t.status === "pending").length;
    const approvedTickets = tickets.filter((t) => t.status === "approved").length;
    const rejectedTickets = tickets.filter((t) => t.status === "rejected").length;

    const chartData = [
        { name: "Tickets Added", value: totalTicketsAdded, color: "#4ade80" }, // Green
        { name: "Tickets Sold", value: totalTicketsSold, color: "#60a5fa" }, // Blue
        { name: "Revenue ($)", value: totalRevenue, color: "#facc15" }, // Yellow
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                Vendor Statistics
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-green-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                        Total Tickets Added
                    </h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
                        {totalTicketsAdded}
                    </p>
                </div>
                <div className="bg-blue-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                        Total Tickets Sold
                    </h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
                        {totalTicketsSold}
                    </p>
                </div>
                <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                        Total Revenue
                    </h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
                        ${totalRevenue}
                    </p>
                </div>
            </div>

            {/* Ticket Status */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg mb-10">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">
                    Tickets Status Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-green-200 rounded-xl p-5 text-center font-semibold text-gray-900">
                        Pending
                        <p className="text-2xl sm:text-3xl mt-2">{pendingTickets}</p>
                    </div>
                    <div className="bg-blue-200 rounded-xl p-5 text-center font-semibold text-gray-900">
                        Approved
                        <p className="text-2xl sm:text-3xl mt-2">{approvedTickets}</p>
                    </div>
                    <div className="bg-red-200 rounded-xl p-5 text-center font-semibold text-gray-900">
                        Rejected
                        <p className="text-2xl sm:text-3xl mt-2">{rejectedTickets}</p>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-gray-900">
                    Revenue Chart
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis
                            dataKey="name"
                            stroke="#374151"
                            tick={{ fill: "#374151", fontSize: 14, fontWeight: "600" }}
                        />
                        <YAxis
                            stroke="#374151"
                            tick={{ fill: "#374151", fontSize: 14, fontWeight: "600" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontWeight: "600",
                                color: "#111827",
                            }}
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
        </div>
    );
};

export default VendorStatistics;

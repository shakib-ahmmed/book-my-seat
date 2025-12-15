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

const UserStatistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["userBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <LoadingSpinner />;

    const totalBooked = bookings.length;
    const upcomingTrips = bookings.filter(b => new Date(b.ticket.departure) > new Date()).length;
    const totalPaid = bookings.reduce((sum, b) => sum + (b.status === "accepted" ? b.quantity * b.ticket.price : 0), 0);

    const statusData = [
        { name: "Pending", value: bookings.filter(b => b.status === "pending").length, color: "#fbbf24" }, // Yellow
        { name: "Accepted", value: bookings.filter(b => b.status === "accepted").length, color: "#4ade80" }, // Green
        { name: "Rejected", value: bookings.filter(b => b.status === "rejected").length, color: "#f87171" }, // Red
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                My Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">Total Booked Tickets</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">{totalBooked}</p>
                </div>
                <div className="bg-green-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">Upcoming Trips</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">{upcomingTrips}</p>
                </div>
                <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">Total Paid</h3>
                    <p className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">৳{totalPaid}</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg mb-10">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5">Booking Status Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {statusData.map((s, idx) => (
                        <div key={idx} className={`bg-opacity-40 rounded-xl p-5 text-center font-semibold text-gray-900`} style={{ backgroundColor: s.color }}>
                            {s.name}
                            <p className="text-2xl sm:text-3xl mt-2">{s.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-gray-900">Bookings Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={statusData}
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
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserStatistics;

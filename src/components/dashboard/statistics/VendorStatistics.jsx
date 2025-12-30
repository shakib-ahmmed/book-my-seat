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
    Cell,
} from "recharts";

const VendorStatistics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], isLoading: ticketsLoading } = useQuery({
        queryKey: ["vendorTickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-added-tickets/${user.email}`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });


    const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
        queryKey: ["vendorBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings?vendorEmail=${user.email}&status=paid`
            );
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (ticketsLoading || bookingsLoading) return <LoadingSpinner />;



    const totalTicketsAdded = tickets.reduce(
        (sum, t) => sum + (t.quantity || 0),
        0
    );


    const totalTicketsSold = bookings.reduce(
        (sum, b) => sum + (b.quantity || 0),
        0
    );


    const totalRevenue = bookings.reduce((sum, b) => {
        const price = b.ticket?.price || b.unitPrice || 0;
        return sum + (b.quantity || 0) * price;
    }, 0);


    const pendingTickets = tickets.filter(t => t.status === "pending").length;
    const approvedTickets = tickets.filter(t => t.status === "approved").length;
    const rejectedTickets = tickets.filter(t => t.status === "rejected").length;


    const chartData = [
        { name: "Tickets Added", value: totalTicketsAdded, color: "#4ade80" },
        { name: "Tickets Sold", value: totalTicketsSold, color: "#60a5fa" },
        { name: "Revenue (BDT)", value: totalRevenue, color: "#facc15" },
    ];


    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                Vendor Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-green-100 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="text-lg font-semibold">Total Tickets Added</h3>
                    <p className="text-3xl font-bold mt-2">{totalTicketsAdded}</p>
                </div>

                <div className="bg-blue-100 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="text-lg font-semibold">Total Tickets Sold</h3>
                    <p className="text-3xl font-bold mt-2">{totalTicketsSold}</p>
                </div>

                <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-3xl font-bold mt-2">{totalRevenue} BDT</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg mb-10">
                <h3 className="text-xl font-semibold mb-5">
                    Tickets Status Overview
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-green-200 p-5 rounded-xl text-center">
                        Pending
                        <p className="text-3xl font-bold mt-2">{pendingTickets}</p>
                    </div>

                    <div className="bg-blue-200 p-5 rounded-xl text-center">
                        Approved
                        <p className="text-3xl font-bold mt-2">{approvedTickets}</p>
                    </div>

                    <div className="bg-red-200 p-5 rounded-xl text-center">
                        Rejected
                        <p className="text-3xl font-bold mt-2">{rejectedTickets}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-5">Revenue Chart</h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VendorStatistics;

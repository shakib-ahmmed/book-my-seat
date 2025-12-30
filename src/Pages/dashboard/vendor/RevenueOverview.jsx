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

const RevenueOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data = {
            totalTicketsAdded: 0,
            totalTicketsSold: 0,
            totalRevenue: 0,
        },
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["revenue-overview", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/revenue-overview/${user.email}`
            );
            return res.data || {
                totalTicketsAdded: 0,
                totalTicketsSold: 0,
                totalRevenue: 0,
            };
        },
    });

    if (isLoading) return <LoadingSpinner />;

    if (isError) {
        return (
            <p className="text-center mt-10 text-red-600 font-semibold">
                Failed to load revenue data
            </p>
        );
    }

    const { totalTicketsAdded, totalTicketsSold, totalRevenue } = data;

    const chartData = [
        { name: "Tickets Added", value: totalTicketsAdded, color: "#fddb1a" },
        { name: "Tickets Sold", value: totalTicketsSold, color: "#ba0c10" },
        { name: "Revenue", value: totalRevenue, color: "#5b0809" },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl font-bold text-[#5b0809] mb-6">
                Revenue Overview
            </h2>

            <div className="bg-[#b0bdc0]/20 p-6 rounded-xl shadow-lg">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#615d5e" />
                        <XAxis
                            dataKey="name"
                            stroke="#240d0b"
                            tick={{ fill: "#240d0b", fontSize: 14, fontWeight: 600 }}
                        />
                        <YAxis
                            stroke="#240d0b"
                            tick={{ fill: "#240d0b", fontSize: 14, fontWeight: 600 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#e9d44c",
                                borderRadius: "8px",
                                border: "none",
                                color: "#240d0b",
                                fontWeight: "600",
                            }}
                        />
                        <Bar dataKey="value" barSize={60}>
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
                    <div className="bg-[#e9d44c]/40 p-4 rounded-xl font-semibold text-[#240d0b]">
                        Tickets Added: {totalTicketsAdded}
                    </div>
                    <div className="bg-[#ba0c10]/40 p-4 rounded-xl font-semibold text-white">
                        Tickets Sold: {totalTicketsSold}
                    </div>
                    <div className="bg-[#5b0809]/40 p-4 rounded-xl font-semibold text-white">
                        Revenue: ৳{totalRevenue}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueOverview;

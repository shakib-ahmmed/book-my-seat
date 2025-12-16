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

const UserStatistics = () => {
    const { user, role, roleLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["userBookings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-tickets?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading || roleLoading) return <LoadingSpinner />;

 
    const totalBooked = bookings.length;
    const upcomingTrips = bookings.filter(
        (b) => new Date(b.departure) > new Date()
    ).length;
    const totalPaid = bookings.reduce(
        (sum, b) =>
            b.status === "approved" && b.ticket
                ? sum + b.quantity * b.ticket.price
                : sum,
        0
    );

    const statusData = [
        {
            name: "Pending",
            value: bookings.filter((b) => b.status === "pending").length,
            color: "#fbbf24",
        },
        {
            name: "Approved",
            value: bookings.filter((b) => b.status === "approved").length,
            color: "#4ade80",
        },
        {
            name: "Rejected",
            value: bookings.filter((b) => b.status === "rejected").length,
            color: "#f87171",
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-100 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="text-lg font-medium">Total Booked Tickets</h3>
                    <p className="mt-3 text-3xl font-bold">{totalBooked}</p>
                </div>
                <div className="bg-green-100 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="text-lg font-medium">Upcoming Trips</h3>
                    <p className="mt-3 text-3xl font-bold">{upcomingTrips}</p>
                </div>
                <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg text-center">
                    <h3 className="text-lg font-medium">Total Paid</h3>
                    <p className="mt-3 text-3xl font-bold">৳{totalPaid}</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg mb-10">
                <h3 className="text-xl font-semibold mb-5">Booking Status Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {statusData.map((s, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl p-5 text-center font-semibold"
                            style={{ backgroundColor: s.color + "66" }}
                        >
                            {s.name}
                            <p className="text-3xl mt-2">{s.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-5">Bookings Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                            {statusData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserStatistics;

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const RevenueOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: inventory = [], isLoading } = useQuery({
        queryKey: ['inventory', user?.email],
        queryFn: async () => {
            const result = await axiosSecure(`/my-inventory/${user?.email}`);
            return result.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // Compute totals
    const totalTicketsAdded = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalTicketsSold = inventory.reduce((sum, item) => sum + (item.sold || 0), 0);
    const totalRevenue = inventory.reduce((sum, item) => sum + (item.sold || 0) * item.price, 0);

    const chartData = [
        { name: 'Tickets Added', value: totalTicketsAdded },
        { name: 'Tickets Sold', value: totalTicketsSold },
        { name: 'Revenue ($)', value: totalRevenue },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-2xl font-semibold mb-6">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueOverview;

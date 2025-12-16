import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner';

const TransactionHistory = ({ userEmail }) => {
    const axiosSecure = useAxiosSecure();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userEmail) return;

        const fetchTransactions = async () => {
            try {
                console.log("Fetching transactions for:", userEmail);
                const res = await axiosSecure.get(`/transactions?email=${userEmail}`);

                if (!Array.isArray(res.data)) {
                    console.warn("Unexpected transactions data:", res.data);
                    setTransactions([]);
                } else {
                    setTransactions(res.data);
                }
            } catch (err) {
                console.error(err);
                toast.error(err?.response?.data?.message || 'Failed to fetch transactions');
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [axiosSecure, userEmail]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md min-h-[70vh]">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

            {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead className="bg-yellow-400 text-gray-900">
                            <tr>
                                <th className="px-4 py-2 border">Transaction ID</th>
                                <th className="px-4 py-2 border">Amount</th>
                                <th className="px-4 py-2 border">Ticket Title</th>
                                <th className="px-4 py-2 border">Payment Date</th>
                                <th className="px-4 py-2 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-yellow-100">
                                    <td className="px-4 py-2 border">{tx.id || "N/A"}</td>
                                    <td className="px-4 py-2 border">
                                        ৳{tx.amount ? tx.amount.toFixed(2) : 0}
                                    </td>
                                    <td className="px-4 py-2 border">{tx.ticketTitle || "Unknown"}</td>
                                    <td className="px-4 py-2 border">
                                        {tx.paymentDate
                                            ? new Date(tx.paymentDate).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border">{tx.status || "pending"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;

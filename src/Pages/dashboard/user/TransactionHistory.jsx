import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TransactionHistory = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const res = await axiosSecure.get(
          `/transactions?email=${user.email}`
        );

        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch transactions");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [axiosSecure, user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[70vh]">
      <h2 className="text-2xl font-bold mb-4">My Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-yellow-400 text-gray-900">
              <tr>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Ticket</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-2 border">{tx.id}</td>
                  <td className="px-4 py-2 border">৳{tx.amount}</td>
                  <td className="px-4 py-2 border">{tx.ticketTitle}</td>
                  <td className="px-4 py-2 border">
                    {new Date(tx.paymentDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border capitalize">{tx.status}</td>
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

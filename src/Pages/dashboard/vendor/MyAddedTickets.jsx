import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import VendorOrderDataRow from "../../../components/dashboard/tablerows/VendorOrderDataRow";
import { toast } from "react-toastify";

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ["my-added-tickets", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/my-added-tickets/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleStatusChange = async (ticket, newStatus) => {
        try {
            await axiosSecure.patch(`/tickets/${ticket._id}/status`, { status: newStatus });
            toast.success(`Status updated to ${newStatus}`);
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (ticketId) => {
        try {
            await axiosSecure.delete(`/tickets/${ticketId}`);
            toast.success("Ticket deleted successfully");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete ticket");
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
            <h2 className="text-3xl font-bold text-[#5b0809] mb-6">
                My Added Tickets
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#b0bdc0] rounded-2xl shadow-lg overflow-hidden">
                    <thead className="bg-[#ba0c10]">
                        <tr>
                            <th className="px-5 py-3 text-white text-left text-sm uppercase font-semibold">
                                Ticket Name
                            </th>
                            <th className="px-5 py-3 text-white text-left text-sm uppercase font-semibold">
                                Price
                            </th>
                            <th className="px-5 py-3 text-white text-left text-sm uppercase font-semibold">
                                Quantity
                            </th>
                            <th className="px-5 py-3 text-white text-left text-sm uppercase font-semibold">
                                Status
                            </th>
                            <th className="px-5 py-3 text-white text-left text-sm uppercase font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <VendorOrderDataRow
                                    key={ticket._id}
                                    ticket={ticket}
                                    type="ticket"
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-[#240d0b] font-semibold">
                                    You have not added any tickets yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAddedTickets;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();


  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["vendorTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (ticketId) => {
      const id = typeof ticketId === "string" ? ticketId : ticketId.toString();
      const res = await axiosSecure.patch(`/tickets/${id}/approve`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["vendorTickets"]);
      toast.success("Ticket approved!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to approve ticket");
    },
  });


  const rejectMutation = useMutation({
    mutationFn: async (ticketId) => {
      const id = typeof ticketId === "string" ? ticketId : ticketId.toString();
      const res = await axiosSecure.patch(`/tickets/${id}/reject`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["vendorTickets"]);
      toast.success("Ticket rejected!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to reject ticket");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-[#5b0809] mb-6">Manage Tickets</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#b0bdc0] rounded-2xl shadow-lg overflow-hidden">
          <thead className="bg-[#ba0c10]">
            <tr>
              <th className="px-3 sm:px-5 py-2 text-white text-left text-xs sm:text-sm uppercase font-semibold">Title</th>
              <th className="px-3 sm:px-5 py-2 text-white text-left text-xs sm:text-sm uppercase font-semibold">Vendor</th>
              <th className="px-3 sm:px-5 py-2 text-white text-left text-xs sm:text-sm uppercase font-semibold">Price</th>
              <th className="px-3 sm:px-5 py-2 text-white text-left text-xs sm:text-sm uppercase font-semibold">Quantity</th>
              <th className="px-3 sm:px-5 py-2 text-white text-left text-xs sm:text-sm uppercase font-semibold">Status</th>
              <th className="px-3 sm:px-5 py-2 text-white text-left text-xs sm:text-sm uppercase font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                  <td className="px-3 sm:px-5 py-2 text-[#240d0b] font-medium">{ticket.title}</td>
                  <td className="px-3 sm:px-5 py-2 text-[#240d0b]">{ticket.vendorName}</td>
                  <td className="px-3 sm:px-5 py-2 text-[#240d0b]">{ticket.price} BDT</td>
                  <td className="px-3 sm:px-5 py-2 text-[#240d0b]">{ticket.quantity}</td>
                  <td className="px-3 sm:px-5 py-2 text-[#240d0b] font-semibold">{ticket.status}</td>
                  <td className="px-3 sm:px-5 py-2 flex flex-col sm:flex-row gap-2 sm:gap-2">
                    <button
                      onClick={() => approveMutation.mutate(ticket._id)}
                      className="px-3 py-1 bg-[#e9d44c] text-[#240d0b] rounded hover:bg-[#fddb1a] font-semibold cursor-pointer w-full sm:w-auto text-center"
                      disabled={ticket.status === "approved" || approveMutation.isLoading}
                    >
                      {approveMutation.isLoading ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(ticket._id)}
                      className="px-3 py-1 bg-[#5b0809] text-white rounded hover:bg-[#7e0304] font-semibold cursor-pointer w-full sm:w-auto text-center"
                      disabled={ticket.status === "rejected" || rejectMutation.isLoading}
                    >
                      {rejectMutation.isLoading ? "Processing..." : "Reject"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#240d0b] font-semibold">
                  No tickets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageTickets;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const RequestedBookings = ({ ticketId, vendorEmail }) => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["requestedBookings", ticketId],
    enabled: !!ticketId,
    queryFn: async () => {
      const res = await axios.get("https://book-my-seat-server.vercel.app/bookings", {
        params: {
          ticketId,
          vendorEmail,   
          status: "pending",
        },
      });
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const bookingMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axios.patch(`https://book-my-seat-server.vercel.app/bookings/${id}/status`, { status }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["requestedBookings", ticketId],
        (old = []) => old.filter((b) => b._id !== variables.id)
      );
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (bookings.length === 0)
    return (
      <p className="text-center text-gray-500 font-semibold py-6">
        No pending booking requests.
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <thead className="bg-[#e9d44c]">
          <tr>
            <th className="px-3 sm:px-5 py-3 text-left text-xs sm:text-sm font-semibold uppercase">
              User
            </th>
            <th className="px-3 sm:px-5 py-3 text-left text-xs sm:text-sm font-semibold uppercase">
              Ticket
            </th>
            <th className="px-3 sm:px-5 py-3 text-left text-xs sm:text-sm font-semibold uppercase">
              Qty
            </th>
            <th className="px-3 sm:px-5 py-3 text-left text-xs sm:text-sm font-semibold uppercase">
              Total
            </th>
            <th className="px-3 sm:px-5 py-3 text-left text-xs sm:text-sm font-semibold uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b hover:bg-gray-50 transition">
              <td className="px-3 sm:px-5 py-2 text-sm">{booking.userEmail}</td>
              <td className="px-3 sm:px-5 py-2 text-sm">{booking.ticketTitle}</td>
              <td className="px-3 sm:px-5 py-2 text-sm">{booking.quantity}</td>
              <td className="px-3 sm:px-5 py-2 text-sm font-semibold">
                {booking.quantity * booking.unitPrice} BDT
              </td>
              <td className="px-3 sm:px-5 py-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() =>
                    bookingMutation.mutate({ id: booking._id, status: "approved" })
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={bookingMutation.isLoading}
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    bookingMutation.mutate({ id: booking._id, status: "rejected" })
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={bookingMutation.isLoading}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedBookings;

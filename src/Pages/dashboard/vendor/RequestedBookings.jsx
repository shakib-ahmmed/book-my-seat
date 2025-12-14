import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";

const RequestedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["requestedBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?status=pending");
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (bookingId) => {
      const res = await axiosSecure.patch(`/bookings/${bookingId}/accept`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestedBookings"]);
      toast.success("Booking accepted!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to accept booking");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (bookingId) => {
      const res = await axiosSecure.patch(`/bookings/${bookingId}/reject`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requestedBookings"]);
      toast.success("Booking rejected!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to reject booking");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-[#5b0809] mb-6">Requested Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#b0bdc0] rounded-2xl shadow-lg overflow-hidden">
          <thead className="bg-[#ba0c10] text-white">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">User Name</th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">User Email</th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Ticket Title</th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Quantity</th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Total Price</th>
              <th className="px-5 py-3 text-left text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-b bg-white hover:bg-[#fddb1a]/20">
                  <td className="px-5 py-3">{booking.userName}</td>
                  <td className="px-5 py-3">{booking.email}</td>
                  <td className="px-5 py-3">{booking.ticket?.title}</td>
                  <td className="px-5 py-3">{booking.quantity}</td>
                  <td className="px-5 py-3">
                    {booking.quantity * (booking.ticket?.price || 0)}
                  </td>
                  <td className="px-5 py-3 space-x-2">
                    <button
                      onClick={() => acceptMutation.mutate(booking._id)}
                      className="px-4 py-2 bg-[#5b0809] text-[#fddb1a] rounded-md font-semibold hover:bg-[#240d0b] transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(booking._id)}
                      className="px-4 py-2 bg-[#ba0c10] text-white rounded-md font-semibold hover:bg-[#7e0304] transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#240d0b] font-semibold">
                  No pending bookings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;

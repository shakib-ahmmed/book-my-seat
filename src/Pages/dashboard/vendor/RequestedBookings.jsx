import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-hot-toast";

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
      return axiosSecure.patch(`/bookings/${bookingId}/status`, {
        status: "approved",
      });
    },
    onSuccess: () => {
      toast.success("Booking accepted!");
      queryClient.invalidateQueries(["requestedBookings"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to accept booking");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (bookingId) => {
      return axiosSecure.patch(`/bookings/${bookingId}/status`, {
        status: "rejected",
      });
    },
    onSuccess: () => {
      toast.success("Booking rejected!");
      queryClient.invalidateQueries(["requestedBookings"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to reject booking");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-[#5b0809] mb-6">
        Requested Bookings
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#b0bdc0] rounded-2xl shadow-lg overflow-hidden">
          <thead className="bg-[#ba0c10] text-white">
            <tr>
              <th className="px-5 py-3 text-left text-xs sm:text-sm uppercase font-semibold">
                User Email
              </th>
              <th className="px-5 py-3 text-left text-xs sm:text-sm uppercase font-semibold">
                Ticket
              </th>
              <th className="px-5 py-3 text-left text-xs sm:text-sm uppercase font-semibold">
                Quantity
              </th>
              <th className="px-5 py-3 text-left text-xs sm:text-sm uppercase font-semibold">
                Total Price
              </th>
              <th className="px-5 py-3 text-left text-xs sm:text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b bg-white hover:bg-[#fddb1a]/20 transition"
                >
                  <td className="px-5 py-3 text-[#240d0b]">
                    {booking.email}
                  </td>

                  <td className="px-5 py-3 text-[#240d0b] font-medium">
                    {booking.ticket?.title || "Unknown Ticket"}
                  </td>

                  <td className="px-5 py-3 text-[#240d0b]">
                    {booking.quantity}
                  </td>

                  <td className="px-5 py-3 text-[#240d0b] font-semibold">
                    ৳{booking.quantity * (booking.ticket?.price || 0)}
                  </td>

                  <td className="px-5 py-3 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => acceptMutation.mutate(booking._id)}
                      disabled={acceptMutation.isLoading}
                      className="px-4 py-1 bg-[#e9d44c] text-[#240d0b] cursor-pointer rounded
                        hover:bg-[#fddb1a] font-semibold transition
                        disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {acceptMutation.isLoading ? "Processing..." : "Accept"}
                    </button>

                    <button
                      onClick={() => rejectMutation.mutate(booking._id)}
                      disabled={rejectMutation.isLoading}
                      className="px-4 py-1 bg-[#5b0809] text-white cursor-pointer rounded
                        hover:bg-[#7e0304] font-semibold transition
                        disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {rejectMutation.isLoading ? "Processing..." : "Reject"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-[#240d0b] font-semibold"
                >
                  No pending bookings found
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

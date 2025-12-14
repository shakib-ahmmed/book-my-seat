import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const RequestedBookings = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all bookings for the vendor
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ["vendor-bookings"],
        queryFn: async () => {
            const res = await axiosSecure.get("/vendor-bookings"); // endpoint must return vendor-specific booking requests
            return res.data;
        },
    });

    const handleAction = useMutation(
        async ({ bookingId, action }) => {
            // action = 'accepted' or 'rejected'
            return await axiosSecure.patch(`/bookings/${bookingId}/status`, { status: action });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["vendor-bookings"]);
                Swal.fire("Success!", "Booking status updated.", "success");
            },
            onError: (err) => {
                Swal.fire("Error!", err.response?.data?.message || "Action failed", "error");
            },
        }
    );

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <h2 className="text-2xl font-semibold leading-tight mb-4">Requested Bookings</h2>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        User
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Ticket
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Quantity
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Total Price
                                    </th>
                                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{booking.user?.name}</p>
                                            <p className="text-gray-600 whitespace-no-wrap">{booking.user?.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {booking.ticket?.title}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {booking.quantity}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {(booking.quantity * booking.ticket?.price).toFixed(2)}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <button
                                                onClick={() => handleAction.mutate({ bookingId: booking._id, action: "accepted" })}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleAction.mutate({ bookingId: booking._id, action: "rejected" })}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {bookings.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-gray-600">
                                            No booking requests found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestedBookings;

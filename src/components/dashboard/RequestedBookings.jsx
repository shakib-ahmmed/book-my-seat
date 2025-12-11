import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const RequestedBookings = ({ ticketId }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch pending bookings for a ticket
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:3000/bookings?ticketId=${ticketId}&status=pending`
            );
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [ticketId]);

    // Accept or Reject booking
    const handleBooking = async (id, action) => {
        try {
            await axios.patch(`http://localhost:3000/bookings/${id}`, {
                status: action,
            });
            fetchBookings(); // Refresh list
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (bookings.length === 0)
        return <p className="text-center text-gray-500">No pending bookings.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-yellow-400 text-black">
                    <tr>
                        <th className="py-2 px-4">User</th>
                        <th className="py-2 px-4">Ticket</th>
                        <th className="py-2 px-4">Quantity</th>
                        <th className="py-2 px-4">Total Price</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b">
                            <td className="py-2 px-4">{booking.userEmail}</td>
                            <td className="py-2 px-4">{booking.ticketTitle}</td>
                            <td className="py-2 px-4">{booking.quantity}</td>
                            <td className="py-2 px-4">{booking.quantity * booking.unitPrice} BDT</td>
                            <td className="py-2 px-4 flex gap-2">
                                <button
                                    onClick={() => handleBooking(booking._id, "accepted")}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleBooking(booking._id, "rejected")}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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


import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const MyBookedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["userBookings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <LoadingSpinner />;

    const handlePayNow = async (booking) => {
        if (new Date(booking.ticket.departure) < new Date()) {
            toast.error("Cannot pay, departure has passed");
            return;
        }
        toast.info("Open Stripe Payment Interface");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Booked Tickets</h2>

            {bookings.length === 0 && (
                <p className="text-gray-500 text-center">You have no booked tickets.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((b) => (
                    <div
                        key={b._id}
                        className="p-4 rounded-lg shadow bg-white flex flex-col justify-between"
                    >
                        <img
                            src={b.ticket.image}
                            alt={b.ticket.title}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-1">{b.ticket.title}</h3>
                        <p className="text-gray-700">
                            {b.ticket.from} → {b.ticket.to}
                        </p>
                        <p className="text-gray-700">Quantity: {b.quantity}</p>
                        <p className="text-gray-700">
                            Total: {b.quantity * (b.ticket.price || 0)} BDT
                        </p>
                        <p className="text-gray-700">
                            Departure: {new Date(b.ticket.departure).toLocaleString()}
                        </p>
                        <p className={`font-semibold mt-2 ${b.status === 'rejected' ? 'text-red-600' : 'text-green-600'}`}>
                            Status: {b.status}
                        </p>

                        {b.status === "accepted" && new Date(b.ticket.departure) > new Date() && (
                            <>
                                <Countdown
                                    date={new Date(b.ticket.departure)}
                                    className="text-gray-600 mt-2"
                                />
                                <button
                                    onClick={() => handlePayNow(b)}
                                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Pay Now
                                </button>
                            </>
                        )}

                        {b.status === "pending" && (
                            <p className="text-yellow-600 mt-2">Waiting for vendor approval...</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookedTickets;

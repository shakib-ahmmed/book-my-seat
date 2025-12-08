import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const TicketDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [ticket, setTicket] = useState(null);
    const [countdown, setCountdown] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [bookingQty, setBookingQty] = useState(1);

    // 🔹 Fetch ticket details by ID
    useEffect(() => {
        fetch(`http://localhost:5000/tickets/${id}`)
            .then((res) => res.json())
            .then((data) => setTicket(data));
    }, [id]);

    // 🔹 Countdown Timer
    useEffect(() => {
        if (!ticket) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const dep = new Date(ticket.departure).getTime();
            const distance = dep - now;

            if (distance <= 0) {
                setCountdown("Departure time passed");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [ticket]);

    if (!ticket) return <p className="text-center py-10">Loading...</p>;

    const departurePassed = new Date(ticket.departure) < new Date();
    const noTicketsLeft = ticket.quantity === 0;

    // 🔹 Booking Handler
    const handleBooking = (e) => {
        e.preventDefault();

        if (bookingQty < 1) {
            toast.error("Enter a valid quantity");
            return;
        }

        if (bookingQty > ticket.quantity) {
            toast.error("Cannot book more than available quantity");
            return;
        }

        const bookingData = {
            ticketId: ticket._id,
            userEmail: user.email,
            quantity: bookingQty,
            status: "Pending",
            bookedAt: new Date().toISOString(),
        };

        fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Booking successful!");
                setOpenModal(false);
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-5 space-y-5">

            {/* Image */}
            <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-64 object-cover rounded-xl"
            />

            {/* Title */}
            <h1 className="text-2xl font-bold">{ticket.title}</h1>

            {/* Details */}
            <div className="space-y-2 text-gray-700">
                <p><b>From:</b> {ticket.from}</p>
                <p><b>To:</b> {ticket.to}</p>
                <p><b>Transport Type:</b> {ticket.transportType}</p>
                <p><b>Price:</b> ${ticket.price}</p>
                <p><b>Available Quantity:</b> {ticket.quantity}</p>
                <p><b>Departure:</b> {ticket.departure}</p>
                <p><b>Perks:</b> {ticket.perks?.join(", ")}</p>
            </div>

            {/* Countdown */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">
                    ⏳ Countdown: <span className="text-blue-600">{countdown}</span>
                </p>
            </div>

            {/* Book Now Button */}
            <button
                onClick={() => setOpenModal(true)}
                disabled={departurePassed || noTicketsLeft}
                className={`w-full py-3 text-white font-semibold rounded-lg
          ${departurePassed || noTicketsLeft
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"}`}
            >
                Book Now
            </button>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-96 space-y-4">

                        <h2 className="text-xl font-bold">Book Ticket</h2>

                        <form onSubmit={handleBooking} className="space-y-4">

                            <div>
                                <label className="block font-medium">Enter Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={bookingQty}
                                    onChange={(e) => setBookingQty(parseInt(e.target.value))}
                                    className="w-full border px-3 py-2 rounded-lg"
                                />
                                <p className="text-sm text-gray-500">
                                    Available: {ticket.quantity}
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                            >
                                Confirm Booking
                            </button>

                            <button
                                onClick={() => setOpenModal(false)}
                                type="button"
                                className="w-full py-2 bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;

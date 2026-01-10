import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BookingModal from "../model/BookingModal";
import LoadingSpinner from "../LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const TicketDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [timeLeft, setTimeLeft] = useState("");
    const [relatedTickets, setRelatedTickets] = useState([]);

    /* ---------------- FETCH TICKET ---------------- */
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await axios.get(`https://book-my-seat-server.vercel.app/tickets/${id}`);
                setTicket(res.data);
                // Fetch related tickets (same transport type)
                const relatedRes = await axios.get(
                    `https://book-my-seat-server.vercel.app/tickets?transportType=${res.data.transportType}`
                );
                setRelatedTickets(relatedRes.data.filter(t => t._id !== res.data._id));
            } catch {
                toast.error("Failed to load ticket");
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [id]);

    /* ---------------- COUNTDOWN ---------------- */
    useEffect(() => {
        if (!ticket) return;

        const timer = setInterval(() => {
            const now = new Date();
            const departure = new Date(ticket.departure);
            const diff = departure - now;

            if (diff <= 0) {
                setTimeLeft("Departed");
                clearInterval(timer);
            } else {
                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / (1000 * 60)) % 60);
                const s = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [ticket]);

    /* ---------------- BOOKING ---------------- */
    const handleBooking = async () => {
        if (!user?.email) {
            toast.error("Please login to book");
            return;
        }
        if (quantity > ticket.quantity) {
            toast.error("Not enough tickets available");
            return;
        }

        try {
            await axios.post("https://book-my-seat-server.vercel.app/bookings", {
                ticketId: ticket._id,
                quantity,
                email: user.email,
                status: "Pending",
                departure: ticket.departure,
            });

            setTicket(prev => ({
                ...prev,
                quantity: prev.quantity - quantity,
            }));

            toast.success("Booking successful!");
            setModalOpen(false);
            setQuantity(1);
        } catch {
            toast.error("Booking failed");
        }
    };

    if (loading) return <LoadingSpinner fullScreen />;
    if (!ticket) return <p className="text-center mt-10 text-[#E8D351]">Ticket not found</p>;

    const soldOut = ticket.quantity === 0;
    const departed = new Date(ticket.departure) < new Date();

    return (
        <div className="min-h-screen bg-[#240F0F] px-4 py-12 flex flex-col items-center">
            <div className="max-w-6xl w-full bg-[#5C0809]/80 backdrop-blur-xl border border-[#BA0C10] rounded-2xl shadow-2xl p-6 md:p-10 space-y-8">
                {/* TITLE */}
                <h1 className="text-4xl font-extrabold text-[#FDDB1A]">{ticket.title}</h1>

                {/* IMAGES */}
                <div className="flex flex-col md:flex-row gap-4">
                    {ticket.images?.length ? (
                        ticket.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${ticket.title} ${idx + 1}`}
                                className="w-full md:w-1/3 h-60 md:h-72 object-cover rounded-xl border border-[#BA0C10]"
                            />
                        ))
                    ) : (
                        <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-full h-72 object-cover rounded-xl border border-[#BA0C10]"
                        />
                    )}
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#E8D351]">
                    {/* OVERVIEW */}
                    <section>
                        <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">Overview</h2>
                        <p><b>From:</b> {ticket.from}</p>
                        <p><b>To:</b> {ticket.to}</p>
                        <p><b>Transport:</b> {ticket.transportType}</p>
                    </section>

                    {/* SPECS */}
                    <section>
                        <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">Ticket Info</h2>
                        <p><b>Price:</b> ৳{ticket.price}</p>
                        <p><b>Available:</b> {ticket.quantity}</p>
                        <p><b>Perks:</b> {ticket.perks?.join(", ") || "None"}</p>
                    </section>

                    {/* DEPARTURE */}
                    <section>
                        <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">Departure</h2>
                        <p>{new Date(ticket.departure).toLocaleString()}</p>
                        <p className="font-bold text-lg">Countdown: {timeLeft}</p>
                    </section>

                    {/* REVIEWS */}
                    <section>
                        <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">Reviews</h2>
                        {ticket.reviews?.length ? (
                            ticket.reviews.map((r, idx) => (
                                <div key={idx} className="mb-2 border-b border-[#BA0C10] pb-2">
                                    <p><b>{r.user}:</b> {r.comment}</p>
                                    <p>⭐ {r.rating}/5</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet</p>
                        )}
                    </section>
                </div>

                {/* BOOKING BUTTON */}
                <button
                    disabled={soldOut || departed}
                    onClick={() => setModalOpen(true)}
                    className={`mt-4 px-8 py-3 rounded-xl text-lg font-semibold transition
            ${soldOut || departed
                            ? "bg-gray-500 text-black cursor-not-allowed"
                            : "bg-[#FDDB1A] text-black hover:bg-[#E8D351]"
                        }`}
                >
                    {soldOut ? "Sold Out" : departed ? "Departed" : "Book Now"}
                </button>

                {/* RELATED TICKETS */}
                {/* RELATED TICKETS */}
                {relatedTickets.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-2xl font-bold text-[#FDDB1A] mb-4">Related Tickets</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedTickets.slice(0, 3).map(rt => ( // only show first 3
                                <Link key={rt._id} to={`/tickets/${rt._id}`}>
                                    <div className="bg-[#5C0809]/70 border border-[#BA0C10] rounded-xl overflow-hidden hover:scale-105 transition">
                                        <img src={rt.image} alt={rt.title} className="w-full h-40 object-cover" />
                                        <div className="p-2 text-[#E8D351] font-semibold">{rt.title}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            </div>

            {/* BOOKING MODAL */}
            {modalOpen && (
                <BookingModal
                    ticket={ticket}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    onConfirm={handleBooking}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TicketDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    /* ---------------- FETCH TICKET ---------------- */
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await axios.get(
                    `https://book-my-seat-server.vercel.app/tickets/${id}`
                );
                setTicket(res.data);
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
            await axios.post(
                "https://book-my-seat-server.vercel.app/bookings",
                {
                    ticketId: ticket._id,
                    quantity,
                    email: user.email,
                    status: "Pending",
                    departure: ticket.departure,
                }
            );

            setTicket((prev) => ({
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
    if (!ticket) return <p className="text-center mt-10">Ticket not found</p>;

    const soldOut = ticket.quantity === 0;
    const departed = new Date(ticket.departure) < new Date();

    return (
        <div className="min-h-screen bg-[#240F0F] px-4 py-12 flex justify-center">
            <div className="max-w-5xl w-full bg-[#5C0809]/80 backdrop-blur-xl 
                      border border-[#BA0C10] rounded-2xl shadow-2xl p-6 md:p-10">

                <h1 className="text-4xl font-extrabold text-[#FDDB1A] mb-6">
                    {ticket.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* IMAGE */}
                    <img
                        src={ticket.image}
                        alt={ticket.title}
                        className="w-full h-80 md:h-96 object-cover rounded-xl border border-[#BA0C10]"
                    />

                    {/* INFO */}
                    <div className="space-y-4 text-[#E8D351]">

                        {/* OVERVIEW */}
                        <section>
                            <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">
                                Overview
                            </h2>
                            <p><b>From:</b> {ticket.from}</p>
                            <p><b>To:</b> {ticket.to}</p>
                            <p><b>Transport:</b> {ticket.transportType}</p>
                        </section>

                        {/* SPECS */}
                        <section>
                            <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">
                                Ticket Info
                            </h2>
                            <p><b>Price:</b> ৳{ticket.price}</p>
                            <p><b>Available:</b> {ticket.quantity}</p>
                            <p><b>Perks:</b> {ticket.perks?.join(", ") || "None"}</p>
                        </section>

                        {/* TIME */}
                        <section>
                            <h2 className="text-xl font-bold text-[#FDDB1A] mb-2">
                                Departure
                            </h2>
                            <p>{new Date(ticket.departure).toLocaleString()}</p>
                            <p className="font-bold text-lg">
                                Countdown: {timeLeft}
                            </p>
                        </section>

                        {/* CTA */}
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
                    </div>
                </div>
            </div>

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

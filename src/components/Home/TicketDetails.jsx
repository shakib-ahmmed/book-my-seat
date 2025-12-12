import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingModal from "../model/BookingModal";
import LoadingSpinner from "../LoadingSpinner";

import useAuth from '../../hooks/useAuth';



const TicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/tickets/${id}`);
                setTicket(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [id]);

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
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [ticket]);



    const { user } = useAuth();

    const handleBooking = async () => {
        if (quantity > ticket.quantity) {
            alert("Quantity cannot exceed available tickets");
            return;
        }

        if (!user?.email) {
            alert("You must be logged in to book a ticket");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/bookings", {
                ticketId: ticket._id,
                quantity,
                status: "Pending",
                departure: ticket.departure,
                email: user.email,
            });

            setTicket(prev => ({
                ...prev,
                quantity: prev.quantity - quantity
            }));

            alert("Booking successful!");
            setModalOpen(false);
            setQuantity(1);
        } catch (err) {
            console.error("Booking error:", err.response?.data || err);
            alert(err.response?.data?.message || "Failed to book ticket");
        }
    };


    if (loading) return <LoadingSpinner />;
    if (!ticket) return <p className="text-center mt-10">Ticket not found</p>;

    const departurePassed = new Date(ticket.departure) < new Date();
    const soldOut = ticket.quantity === 0;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#240F0F] px-4">

            <div className="bg-[#5C0809]/80 border border-[#BA0C10] shadow-2xl rounded-2xl 
                            backdrop-blur-xl p-6 md:p-10 max-w-4xl w-full text-[#E8D351]">

                {/* Layout */}
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-full h-72 md:h-96 rounded-xl object-cover shadow-xl border border-[#BA0C10]"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-extrabold text-[#FDDB1A]">
                            {ticket.title}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-lg">
                            <p><span className="font-semibold text-[#C8C385]">From:</span> {ticket.from}</p>
                            <p><span className="font-semibold text-[#C8C385]">To:</span> {ticket.to}</p>
                            <p><span className="font-semibold text-[#C8C385]">Transport:</span> {ticket.transportType}</p>
                            <p><span className="font-semibold text-[#C8C385]">Price:</span> {ticket.price} BDT</p>
                            <p><span className="font-semibold text-[#C8C385]">Available:</span> {ticket.quantity}</p>
                            <p><span className="font-semibold text-[#C8C385]">Perks:</span> {ticket.perks?.join(", ")}</p>
                        </div>

                        <p className="text-lg">
                            <span className="font-semibold text-[#FDDB1A]">Departure:</span>{" "}
                            {new Date(ticket.departure).toLocaleString()}
                        </p>

                        <p className="text-xl font-bold text-[#E8D351]">
                            <span className="font-semibold text-[#FDDB1A]">Countdown:</span> {timeLeft}
                        </p>
                        <button
                            onClick={() => setModalOpen(true)}
                            disabled={departurePassed || soldOut}
                            className={`mt-4 px-8 py-3 rounded-xl text-lg font-semibold transition duration-300 
        ${departurePassed || soldOut
                                    ? "bg-gray-500 cursor-not-allowed text-black"
                                    : "bg-[#FDDB1A] text-black hover:bg-[#E8D351] cursor-pointer"
                                }`}
                        >
                            Book Now
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

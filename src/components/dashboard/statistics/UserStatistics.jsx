import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";

const TicketsList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedQuantity, setSelectedQuantity] = useState({});

    const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets?status=approved");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const handleBookTicket = async (ticket) => {
        const quantity = selectedQuantity[ticket._id] || 1;

        if (quantity > ticket.quantity) {
            toast.error("Not enough tickets available");
            return;
        }

        try {
            const res = await axiosSecure.post("/bookings", {
                ticketId: ticket._id,
                quantity,
                email: user.email,
            });

            toast.success("Booking successful!");
            refetch(); 
        } catch (err) {
            console.error(err);
            toast.error("Booking failed");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Available Tickets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="p-4 border rounded shadow">
                        <h3 className="text-lg font-semibold">{ticket.title}</h3>
                        <p>Price: {ticket.price} BDT</p>
                        <p>Available: {ticket.quantity}</p>
                        <p>Departure: {new Date(ticket.departure).toLocaleString()}</p>

                        <input
                            type="number"
                            min="1"
                            max={ticket.quantity}
                            value={selectedQuantity[ticket._id] || 1}
                            onChange={(e) =>
                                setSelectedQuantity({
                                    ...selectedQuantity,
                                    [ticket._id]: Number(e.target.value),
                                })
                            }
                            className="border p-1 w-20 mt-2"
                        />

                        <button
                            onClick={() => handleBookTicket(ticket)}
                            className="mt-2 px-4 py-2 bg-[#ba0c10] text-white rounded hover:bg-[#5c0809]"
                        >
                            Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketsList;

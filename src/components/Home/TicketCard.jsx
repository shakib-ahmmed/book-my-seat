import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img src={ticket.image} alt={ticket.title} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{ticket.title}</h2>
            <p className="text-gray-600">{ticket.from} → {ticket.to}</p>
            <p className="text-sm text-gray-500">Transport: {ticket.transportType}</p>
            <p className="text-green-600 font-bold">Price: ${ticket.price}</p>
            <p className="text-sm text-gray-600">Quantity: {ticket.quantity}</p>
            {ticket.perks && ticket.perks.length > 0 && (
                <ul className="text-sm text-gray-500 mt-1">
                    {ticket.perks.map((perk, idx) => (
                        <li key={idx}>• {perk}</li>
                    ))}
                </ul>
            )}
            <p className="text-sm text-gray-600 mt-1">
                Departure: {new Date(ticket.departure).toLocaleString()}
            </p>
            <Link
                to={`/ticket-details/${ticket._id}`}
                className="block mt-3 bg-[#5C0809] text-white text-center py-1.5 rounded hover:bg-yellow-400 hover:text-black font-bold"
            >
                See Details
            </Link>
        </div>
    );
};

export default TicketCard;

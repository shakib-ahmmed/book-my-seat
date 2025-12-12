import React from "react";
import TicketCard from "../Home/TicketCard";



const LatestTickets = ({ tickets }) => {
    const latest = tickets.slice(0, 8);

    return (
        <div className="my-10">
            <h2 className="text-3xl font-bold text-center mb-6">Availabe Latest Tickets</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {latest.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default LatestTickets;

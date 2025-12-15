import React, { useEffect, useState } from "react";
import TicketCard from "../Home/TicketCard";

const LatestTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await fetch("http://localhost:5000/tickets");
                const data = await res.json();

                if (Array.isArray(data)) setTickets(data);
                else if (Array.isArray(data.result)) setTickets(data.result);
                else setTickets([]);
            } catch (err) {
                console.error(err);
                setError("Failed to load tickets");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const latestTickets = tickets.slice(0, 8);

    if (loading) return <p className="text-center mt-10 text-gray-500">Loading latest tickets...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="my-10 px-4">
            <h2 className="text-4xl font-bold text-[#5C0809] text-center lg:pb-15 mb-6">
                Available Latest Tickets
            </h2>

            {latestTickets.length === 0 && (
                <p className="text-center text-gray-500">No tickets available</p>
            )}

            <div className="grid grid-cols-1 xl:gap-4 justify-cente  lg:m-15" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                {latestTickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </div>

    );
};

export default LatestTickets;

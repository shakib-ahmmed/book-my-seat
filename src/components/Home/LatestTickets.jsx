import React, { useEffect, useState } from "react";
import TicketCard from "../Home/TicketCard";

const LatestTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await fetch("https://book-my-seat-server.vercel.app/tickets");
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

    if (loading)
        return (
            <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
                Loading latest tickets...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-10 text-red-500 dark:text-red-400">{error}</p>
        );

    return (
        <div className="my-10 px-4">
            <h2 className="text-4xl font-bold text-center mb-6 text-black dark:text-white">
                Available Latest Tickets
            </h2>

            {latestTickets.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-300">No tickets available</p>
            )}

            <div
                className="grid gap-6 justify-center"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
            >
                {latestTickets.map((ticket) => (
                    <div
                        key={ticket._id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 transition-colors duration-300"
                    >
                        <TicketCard ticket={ticket} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestTickets;

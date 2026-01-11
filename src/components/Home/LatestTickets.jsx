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
            <div className="p-6 grid gap-6 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="h-80 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
                    />
                ))}
            </div>
        );

    if (error)
        return (
            <p className="text-center mt-10 text-red-500 dark:text-red-400">{error}</p>
        );

    return (
        <div className="p-6 md:p-10 lg:p-16 bg-base-100 dark:bg-base-200 transition-colors duration-300">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-[#FDDB1A]">
                Available Latest Tickets
            </h2>

            {latestTickets.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-300">
                    No tickets available
                </p>
            )}

            <div className="grid gap-6 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {latestTickets.map((ticket) => (
                    <div
                        key={ticket._id}
                        className="bg-white dark:bg-[#3A0E0E] rounded-b-xl border border-gray-200 dark:border-[#BA0C10]
                      shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 p-2"
                    >
                        <TicketCard ticket={ticket} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestTickets;

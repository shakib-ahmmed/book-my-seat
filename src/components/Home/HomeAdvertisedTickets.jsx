import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const HomeAdvertisedTickets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["advertised-tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tickets?advertise=true");
            return res.data.slice(0, 6);
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-[#fddb1a] py-8 relative overflow-hidden">

            {/* 🔥 TOP TEXT */}
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#3d0708] mb-6 tracking-wide">
                BOOK YOUR TICKET NOW AT <span className="text-[#ba0c11]">BOOKMYSEAT</span>
            </h2>

            {/* EMPTY STATE */}
            {tickets.length === 0 && (
                <p className="text-center text-xl font-semibold text-[#2d2424]">
                    No advertised tickets available right now
                </p>
            )}

            {/* 🎡 RUNNING BANNER */}
            {tickets.length > 0 && (
                <div className="overflow-hidden">
                    <div className="flex gap-8 animate-marquee px-6">
                        {tickets.concat(tickets).map((ticket, index) => (
                            <div
                                key={index}
                                className="min-w-[340px] bg-[#afbcbf] rounded-3xl shadow-xl overflow-hidden cursor-pointer
                                           hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-5 bg-[#c7c486]">
                                    <h3 className="text-2xl font-bold text-[#2d2424] mb-2">
                                        {ticket.title}
                                    </h3>

                                    <p className="text-[#2d2424] text-base mb-1">
                                        {ticket.from} → {ticket.to}
                                    </p>

                                    <p className="text-lg font-extrabold text-[#7f0203]">
                                        {ticket.price} BDT
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeAdvertisedTickets;

import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
    const {
        _id,
        image,
        title,
        from,
        to,
        transportType,
        price,
        quantity,
        perks,
        departure,
    } = ticket;

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full max-w-[260px] mx-auto">

            <div className="relative h-36 w-full overflow-hidden rounded-t-xl">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                    {transportType}
                </span>
            </div>

            <div className="p-3 space-y-1.5">
                <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
                    {title}
                </h2>

                <p className="text-xs text-gray-500">
                    {from} → {to}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                    <span>Qty: {quantity}</span>
                    <span className="text-green-600 text-[20px] font-bold"> ৳{price}</span>
                </div>

                {perks?.length > 0 && (
                    <ul className="text-xs text-gray-500 list-disc ml-4 space-y-0.5">
                        {perks.slice(0, 2).map((perk, idx) => (
                            <li key={idx}>{perk}</li>
                        ))}
                    </ul>
                )}

                <p className="text-xs text-gray-400">
                    {new Date(departure).toLocaleString()}
                </p>

                <Link
                    to={`/ticket-details/${_id}`}
                    className="block mt-2 text-center rounded-lg bg-[#5C0809] text-white py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-yellow-400 hover:text-black"
                >
                    See Details
                </Link>
            </div>
        </div>
    );
};

export default TicketCard;

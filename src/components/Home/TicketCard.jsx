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
        <div
            className="group bg-white dark:bg-[#3A0E0E] rounded-xl shadow-md hover:shadow-xl 
                 transition-all duration-300 w-full h-[420px] flex flex-col"
        >
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                    {transportType}
                </span>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1 justify-between">
                <div className="space-y-1">
                    <h2 className="text-md font-semibold text-gray-800 dark:text-[#FDDB1A] line-clamp-2">
                        {title}
                    </h2>

                    <p className="text-xs text-gray-500 dark:text-gray-300">
                        {from} → {to}
                    </p>

                    <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-gray-600 dark:text-gray-300">
                            Qty: {quantity}
                        </span>
                        <span className="text-green-600 dark:text-green-400 text-lg font-bold">
                            ৳{price}
                        </span>
                    </div>

                    {perks?.length > 0 && (
                        <ul className="text-xs text-gray-500 dark:text-gray-300 list-disc ml-4">
                            {perks.slice(0, 2).map((perk, idx) => (
                                <li key={idx}>{perk}</li>
                            ))}
                        </ul>
                    )}

                    <p className="text-xs text-gray-400 dark:text-gray-300">
                        {new Date(departure).toLocaleString()}
                    </p>
                </div>

                {/* Button */}
                <Link
                    to={`/ticket-details/${_id}`}
                    className="mt-3 text-center rounded-lg bg-[#5C0809] text-white py-2 text-sm font-semibold 
                     transition hover:bg-[#FDDB1A] hover:text-black"
                >
                    See Details
                </Link>
            </div>
        </div>
    );
};

export default TicketCard;

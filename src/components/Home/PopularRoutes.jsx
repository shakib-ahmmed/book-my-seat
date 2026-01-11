import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const popularRoutes = [
    { id: 1, from: "Dhaka", to: "Chittagong", image: "/dhaka-chatt.jpg", tickets: 45 },
    { id: 2, from: "Dhaka", to: "Sylhet", image: "/dhaka-sylhet.jpg", tickets: 30 },
    { id: 3, from: "Dhaka", to: "Cox's Bazar", image: "/dhaka-cox.jpg", tickets: 20 },
];

const PopularRoutes = () => {
    return (
        <section className="py-20 px-4 md:px-12 bg-base-100 dark:bg-base-200 transition-colors duration-500 w-full">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-black dark:text-[#FDDB1A]">
                Popular Routes
            </h2>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {popularRoutes.map((route) => (
                    <Link key={route.id} to={`/tickets/${route.id}`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-md dark:shadow-gray-700
              transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer
              bg-white dark:bg-[#2C2C2C]">

                            <div className="overflow-hidden rounded-2xl">
                                <img
                                    src={route.image}
                                    alt={`${route.from} to ${route.to}`}
                                    className="w-full h-60 object-cover transform transition-transform duration-700 ease-out hover:scale-110"
                                />
                            </div>

                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full font-semibold text-sm
                                             bg-green-500 text-white dark:bg-yellow-500 dark:text-black shadow-lg flex items-center justify-center">
                                {route.tickets} Tickets
                            </div>

                            <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center
                                            hover:backdrop-brightness-110 transition-all duration-500">
                                <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                                    <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 bg-clip-text text-transparent">
                                        {route.from}
                                    </span>
                                    <FaArrowRight className="animate-bounce text-yellow-400" />
                                    <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        {route.to}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularRoutes;

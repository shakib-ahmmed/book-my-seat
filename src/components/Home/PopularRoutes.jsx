import React from "react";
import { Link } from "react-router-dom";

const popularRoutes = [
    { id: 1, from: "Dhaka", to: "Chittagong", image: "/images/dhaka-chatt.jpg" },
    { id: 2, from: "Dhaka", to: "Sylhet", image: "/images/dhaka-sylhet.jpg" },
    { id: 3, from: "Dhaka", to: "Cox's Bazar", image: "/images/dhaka-cox.jpg" },
];

const PopularRoutes = () => {
    return (
        <section className="py-16 px-4 md:px-12 bg-[#111] text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularRoutes.map(route => (
                    <Link key={route.id} to={`/tickets/${route.id}`}>
                        <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
                            <img src={route.image} alt={`${route.from} to ${route.to}`} className="w-full h-48 object-cover" />
                            <div className="p-4 bg-[#222] dark:bg-gray-800 font-semibold text-center">
                                {route.from} → {route.to}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularRoutes;

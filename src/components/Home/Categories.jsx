import React from "react";
import { FaBus, FaTrain, FaPlane } from "react-icons/fa";

const categories = [
    { icon: <FaBus size={30} />, title: "Bus" },
    { icon: <FaTrain size={30} />, title: "Train" },
    { icon: <FaPlane size={30} />, title: "Flight" },
];

const Categories = () => {
    return (
        <section className="py-16 px-4 md:px-12 bg-gray-100 dark:bg-[#111] text-center">
            <h2 className="text-3xl font-bold mb-8">Categories</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                {categories.map((c, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-4 p-6 bg-[#2C2C2C] dark:bg-gray-800 rounded-xl shadow hover:scale-105 transition">
                        {c.icon}
                        <p className="text-xl font-semibold text-white">{c.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;

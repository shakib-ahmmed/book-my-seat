import React from "react";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const categories = [
    {
        icon: <FaBus />,
        title: "Bus",
        colorLight: "bg-yellow-400 text-black",
        colorDark: "bg-yellow-500 text-black",
    },
    {
        icon: <FaTrain />,
        title: "Train",
        colorLight: "bg-blue-400 text-white",
        colorDark: "bg-blue-600 text-white",
    },
    {
        icon: <FaPlane />,
        title: "Flight",
        colorLight: "bg-red-400 text-white",
        colorDark: "bg-red-600 text-white",
    },
    {
        icon: <FaShip />,
        title: "Ship",
        colorLight: "bg-green-400 text-black",
        colorDark: "bg-green-600 text-white",
    },
];

const Categories = () => {
    return (
        <section className="py-20 px-4 md:px-12 bg-base-100 dark:bg-base-200 transition-colors duration-500 w-full">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-black dark:text-[#FDDB1A]">
                Travel Categories
            </h2>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                {categories.map((c, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl
                       shadow-md dark:shadow-gray-700 hover:shadow-xl
                       transform hover:-translate-y-2 transition-all duration-500 cursor-pointer
                       bg-white dark:bg-[#2C2C2C]"
                    >
                        {/* Icon wrapper with theme-aware colors */}
                        <div
                            className={`p-4 rounded-full transition-colors duration-500 
              ${c.colorLight} dark:${c.colorDark}`}
                        >
                            {React.cloneElement(c.icon, {
                                size: 40,
                                className: "transition-colors duration-500",
                            })}
                        </div>

                        <p className="text-2xl font-semibold text-black dark:text-white">
                            {c.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;

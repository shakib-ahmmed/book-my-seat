import React from "react";
import { FaSearch, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
    {
        icon: <FaSearch />,
        title: "Search Tickets",
        desc: "Find your perfect route easily.",
        colorLight: "bg-yellow-400 text-black",
        colorDark: "bg-yellow-500 text-black",
    },
    {
        icon: <FaTicketAlt />,
        title: "Select & Book",
        desc: "Choose your preferred ticket and book instantly.",
        colorLight: "bg-blue-400 text-white",
        colorDark: "bg-blue-600 text-white",
    },
    {
        icon: <FaCheckCircle />,
        title: "Confirmation",
        desc: "Get instant confirmation with digital ticket.",
        colorLight: "bg-green-400 text-black",
        colorDark: "bg-green-600 text-white",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-20 px-4 md:px-12 bg-base-100 dark:bg-base-200 transition-colors duration-500 w-full">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-black dark:text-[#FDDB1A]">
                How It Works
            </h2>

            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl
              shadow-md dark:shadow-gray-700 hover:shadow-xl
              transform hover:-translate-y-2 transition-all duration-500
              bg-white dark:bg-[#2C2C2C] cursor-pointer"
                    >
                        {/* Icon wrapper with theme-aware colors */}
                        <div
                            className={`p-4 rounded-full transition-colors duration-500
                ${step.colorLight} dark:${step.colorDark}`}
                        >
                            {React.cloneElement(step.icon, { size: 40, className: "transition-colors duration-500" })}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-semibold text-black dark:text-white">
                            {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-center text-gray-700 dark:text-gray-300">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;

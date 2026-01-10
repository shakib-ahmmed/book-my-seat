import React from "react";
import { FaSearch, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
    { icon: <FaSearch size={30} />, title: "Search Tickets", desc: "Find your perfect route easily." },
    { icon: <FaTicketAlt size={30} />, title: "Select & Book", desc: "Choose your preferred ticket and book instantly." },
    { icon: <FaCheckCircle size={30} />, title: "Confirmation", desc: "Get instant confirmation with digital ticket." },
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-4 md:px-12 text-center">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-[#2C2C2C] dark:bg-gray-800 p-8 rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-2">
                        <div className="text-yellow-400 mb-4">{step.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;

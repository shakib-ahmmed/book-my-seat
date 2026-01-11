import React, { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) return alert("Please enter your email!");
        alert(`Subscribed with ${email}!`);
        setEmail("");
    };

    return (
        <section className="py-16 px-4 md:px-12 w-full bg-base-100 dark:bg-base-200 transition-colors duration-500 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-[#aa9a3c]">
                Subscribe to Our Newsletter
            </h2>

            <p className="mb-8 text-base-content dark:text-green-700 text-lg md:text-xl">
                Get the latest updates and discounts straight to your inbox.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-4 rounded-lg w-full md:flex-1 
                     text-base-content dark:text-black 
                     bg-white dark:bg-[#2C2C2C] 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400 
                     transition"
                />
                <button
                    onClick={handleSubscribe}
                    className="px-6 py-4 font-bold rounded-lg text-black 
                     bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                     hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300
                     shadow-lg hover:shadow-2xl
                     transition-all duration-500
                     relative overflow-hidden"
                >
                    Subscribe
                    {/* Gradient shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-white/30 opacity-0 hover:opacity-50 transition-opacity duration-500 rounded-lg pointer-events-none"></span>
                </button>
            </div>
        </section>
    );
};

export default Newsletter;

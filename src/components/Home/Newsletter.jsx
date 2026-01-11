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
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-[#FDDB1A]">
                Subscribe to Our Newsletter
            </h2>

            <p className="mb-8 text-base-content dark:text-white text-lg md:text-xl">
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
                    className="px-6 py-4 bg-yellow-400 hover:bg-yellow-300 
                     text-black font-bold rounded-lg 
                     transition-all duration-300"
                >
                    Subscribe
                </button>
            </div>
        </section>
    );
};

export default Newsletter;

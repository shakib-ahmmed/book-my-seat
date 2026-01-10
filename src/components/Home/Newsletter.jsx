import React, { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        alert(`Subscribed with ${email}!`);
        setEmail("");
    };

    return (
        <section className="py-16 px-4 md:px-12 bg-[#111] text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Get latest updates and discounts straight to your inbox.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg w-full md:w-auto flex-1 text-black"
                />
                <button
                    onClick={handleSubscribe}
                    className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition"
                >
                    Subscribe
                </button>
            </div>
        </section>
    );
};

export default Newsletter;

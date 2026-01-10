import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className="py-16 px-4 md:px-12 bg-yellow-400 text-black text-center rounded-t-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Tickets?</h2>
            <p className="mb-6">Get started and explore amazing destinations today!</p>
            <Link to="/all-tickets">
                <button className="px-8 py-3 bg-black text-yellow-400 font-bold rounded-xl hover:scale-105 transition transform">
                    Browse Tickets
                </button>
            </Link>
        </section>
    );
};

export default CTA;

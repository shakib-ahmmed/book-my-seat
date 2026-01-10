import React from "react";

const testimonials = [
    { id: 1, user: "Arafat", comment: "Amazing booking experience!", rating: 5 },
    { id: 2, user: "Nadia", comment: "Fast and secure ticket booking.", rating: 4 },
    { id: 3, user: "Rafiq", comment: "Loved the featured deals.", rating: 5 },
];

const Testimonials = () => {
    return (
        <section className="py-16 px-4 md:px-12 bg-[#111] text-white text-center">
            <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map(t => (
                    <div key={t.id} className="bg-[#222] dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
                        <p className="mb-4">"{t.comment}"</p>
                        <p className="font-bold">{t.user}</p>
                        <p>⭐ {t.rating}/5</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;

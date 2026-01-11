import React from "react";

const testimonials = [
    { id: 1, user: "Arafat", comment: "Amazing booking experience!", rating: 5 },
    { id: 2, user: "Nadia", comment: "Fast and secure ticket booking.", rating: 4 },
    { id: 3, user: "Rafiq", comment: "Loved the featured deals.", rating: 5 },
];

const Testimonials = () => {
    return (
        <section className="py-24 px-4 md:px-12 w-full bg-base-100 dark:bg-base-200 transition-colors duration-500">
            <h2 className="text-5xl font-extrabold text-center mb-16 text-black dark:text-[#FDDB1A]">
                What Our Customers Say
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto">
                {testimonials.map((t, idx) => (
                    <div
                        key={t.id}
                        className="relative flex-1 bg-white dark:bg-[#2C2C2C] p-10 rounded-3xl
              shadow-md dark:shadow-gray-700 hover:shadow-xl transition-transform duration-500
              transform hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center"
                    >
                        {/* Quote icon */}
                        <div className="text-yellow-400 text-4xl mb-4">❝</div>

                        {/* Comment */}
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{t.comment}</p>

                        {/* User */}
                        <p className="font-semibold text-black dark:text-white text-xl mb-4">{t.user}</p>

                        {/* Stars with staggered pulse */}
                        <div className="flex gap-1">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <span
                                    key={i}
                                    className="text-yellow-400 text-2xl font-bold animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;

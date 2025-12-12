import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Train, Plane, Ticket } from "lucide-react";

const slides = [
    {
        type: "Bus",
        image: "/bus-banner.jpg.png",
        route: "Dhaka → Chittagong",
        price: "1225 BDT",
        icon: <Bus className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
        type: "Train",
        image: "/train-banner.jpg.png",
        route: "Dhaka → Sylhet",
        price: "675 BDT",
        icon: <Train className="w-8 h-8 md:w-10 md:h-10" />,
    },
    {
        type: "Plane",
        image: "/plane-banner.gif",
        route: "Dhaka → CoxBazar",
        price: "5500 BDT",
        icon: <Plane className="w-8 h-8 md:w-10 md:h-10" />,
    },
];

const HeroSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setIndex((prev) => (prev + 1) % slides.length),
            5000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[80vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden flex justify-center items-center">
            <AnimatePresence>
                {slides.map((slide, i) =>
                    i === index ? (
                        <motion.div
                            key={i}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        >
                            {/* Background image */}
                            <img
                                src={slide.image}
                                alt={slide.type}
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                            {/* Text content */}
                            <div className="absolute bottom-8 left-5 md:bottom-12 md:left-12 text-white max-w-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    {slide.icon}
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
                                        {slide.type} Ticket
                                    </h2>
                                </div>
                                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-md">
                                    {slide.route} • {slide.price}
                                </p>
                                <button className="flex items-center gap-2 bg-[#660103] text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
                                    <Ticket className="w-5 h-5" />
                                    Book Now
                                </button>

                            </div>
                        </motion.div>
                    ) : null
                )}
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="absolute bottom-5 flex gap-3 justify-center w-full">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${i === index ? "bg-[#660103]" : "bg-gray-300"
                            } transition-all`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;

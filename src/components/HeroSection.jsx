import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bus, Train, Plane } from "lucide-react";

const slides = [
    {
        type: "Bus",
        image: "/public/bus-banner.jpg.png",
        route: "Dhaka → Chittagong",
        price: "1225 BDT",
        icon: <Bus className="w-8 h-8" />,
    },
    {
        type: "Train",
        image: "/public/train-banner.jpg.png",
        route: "Dhaka → Sylhet",
        price: "675 BDT",
        icon: <Train className="w-8 h-8" />,
        
    },
    {
        type: "Plane",
        image: "/public/plane-banner.gif",
        route: "Dhaka → CoxBazar",
        price: "5500 BDT",
        icon: <Plane className="w-8 h-8" />,
    },
];

const HeroSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[80vh] pt-10 overflow-hidden flex justify-center items-center">
            {slides.map((slide, i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: i === index ? 2 : 1 }}
                    initial={{ opacity: i === index ? 1 : 0 }}
                    animate={{ opacity: i === index ? 1 : 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                >
                    <img src={slide.image} alt={slide.type} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                        <div className="flex items-center gap-2 mb-2">
                            {slide.icon}
                            <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{slide.type} Ticket</h2>
                        </div>
                        <p className="text-lg md:text-2xl drop-shadow-md">
                            {slide.route} • {slide.price}
                        </p>
                    </div>
                </motion.div>
            ))}

            {/* Slider Dots */}
            <div className="absolute bottom-5 flex gap-3 justify-center w-full">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`w-3 h-3 rounded-full ${i === index ? "bg-[#660103]" : "bg-gray-300"}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;

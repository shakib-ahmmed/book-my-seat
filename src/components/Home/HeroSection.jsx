import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Train, Plane, Ticket, ChevronDown } from "lucide-react";

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
    route: "Dhaka → Cox’s Bazar",
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
    <section className="relative w-full h-[65vh] overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {slides.map(
          (slide, i) =>
            i === index && (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              >
                {/* Background */}
                <img
                  src={slide.image}
                  alt={slide.type}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t` from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-16 left-5 md:left-12 text-white max-w-xl space-y-4">
                  <div className="flex items-center gap-3">
                    {slide.icon}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                      {slide.type} Ticket
                    </h1>
                  </div>

                  <p className="text-sm sm:text-lg md:text-xl opacity-90">
                    {slide.route} • {slide.price}
                  </p>

                  <button
                    className="mt-4 flex items-center gap-2 bg-[#660103] text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  >
                    <Ticket className="w-5 h-5" />
                    Book Now
                  </button>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Slider Dots */}
      <div className="absolute bottom-6 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-[#660103]" : "bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 flex flex-col items-center text-white opacity-70 animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default HeroSection;

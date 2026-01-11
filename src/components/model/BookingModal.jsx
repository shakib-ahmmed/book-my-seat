import { useEffect, useState } from "react";

const BookingModal = ({ ticket, quantity, setQuantity, onConfirm, onClose }) => {
    const [theme, setTheme] = useState("light");

    /* ---------------- ESCAPE KEY ---------------- */
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    /* ---------------- THEME DETECTION ---------------- */
    useEffect(() => {
        const detectTheme = () => {
            const current = document.documentElement.getAttribute("data-theme");
            setTheme(current || "light");
        };

        detectTheme();

        const observer = new MutationObserver(detectTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

        return () => observer.disconnect();
    }, []);

    const isDark = theme === "dark";
    const isInvalidQuantity = quantity < 1 || quantity > ticket.quantity || Number.isNaN(quantity);

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 z-50 flex items-center justify-center
        ${isDark ? "bg-black/60" : "bg-gray-800/50"} backdrop-blur-sm animate-fadeIn`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`rounded-2xl p-6 w-11/12 max-w-md shadow-2xl animate-scaleUp
          ${isDark
                        ? "bg-[#240F0F] border border-[#BA0C10] text-[#E8D351]"
                        : "bg-white border border-gray-300 text-gray-900"
                    }`}
            >
                <h2 className={`text-2xl font-bold mb-4 text-center ${isDark ? "text-[#FDDB1A]" : "text-gray-900"}`}>
                    Book Tickets
                </h2>

                <p className={`text-sm mb-2 text-center ${isDark ? "text-[#C8C385]" : "text-gray-600"}`}>
                    Available: {ticket.quantity}
                </p>

                <input
                    type="number"
                    min={1}
                    max={ticket.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={`rounded-xl px-4 py-2 w-full outline-none transition
            ${isDark
                            ? "border border-[#BA0C10] bg-[#5C0809]/30 text-[#E8D351] focus:border-[#FDDB1A]"
                            : "border border-gray-400 bg-gray-100 text-gray-900 focus:border-blue-500"
                        }`}
                />

                <button
                    onClick={onConfirm}
                    disabled={isInvalidQuantity}
                    className={`w-full mt-5 rounded-xl font-bold transition shadow-lg
            ${isInvalidQuantity ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            ${isDark
                            ? "bg-[#FDDB1A] text-black hover:bg-[#E8D351]"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Confirm Booking
                </button>

                <button
                    onClick={onClose}
                    className={`w-full mt-3 rounded-xl font-semibold transition cursor-pointer
            ${isDark
                            ? "bg-gray-300 text-black hover:bg-gray-400"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BookingModal;

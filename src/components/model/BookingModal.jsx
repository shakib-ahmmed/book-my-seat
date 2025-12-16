import { useEffect } from "react";

const BookingModal = ({ ticket, quantity, setQuantity, onConfirm, onClose }) => {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const isInvalidQuantity =
        quantity < 1 || quantity > ticket.quantity || Number.isNaN(quantity);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm animate-fadeIn"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#240F0F] border border-[#BA0C10] text-[#E8D351]
                   rounded-2xl p-6 w-11/12 max-w-md shadow-2xl
                   animate-scaleUp"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-[#FDDB1A]">
                    Book Tickets
                </h2>

                <p className="text-sm mb-2 text-center text-[#C8C385]">
                    Available: {ticket.quantity}
                </p>

                <input
                    type="number"
                    min={1}
                    max={ticket.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-[#BA0C10] bg-[#5C0809]/30 text-[#E8D351]
                     rounded-xl px-4 py-2 w-full outline-none
                     focus:border-[#FDDB1A] transition"
                />

                <button
                    onClick={onConfirm}
                    disabled={isInvalidQuantity}
                    className="w-full mt-5 bg-[#FDDB1A] text-black py-3 rounded-xl font-bold
                     hover:bg-[#E8D351] transition shadow-lg
                     cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Confirm Booking
                </button>

                <button
                    onClick={onClose}
                    className="w-full mt-3 bg-gray-300 text-black py-3 rounded-xl font-semibold
                     hover:bg-gray-400 transition cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BookingModal;

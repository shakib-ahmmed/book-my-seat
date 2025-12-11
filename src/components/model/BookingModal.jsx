import React from "react";

const BookingModal = ({ ticket, quantity, setQuantity, onConfirm, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">


            <div className="bg-[#240F0F] border border-[#BA0C10] text-[#E8D351] 
                            rounded-2xl p-6 w-11/12 max-w-md shadow-2xl
                            scale-95 animate-[fadeIn_0.25s_ease-out,scaleUp_0.25s_ease-out]">


                <h2 className="text-2xl font-bold mb-4 text-center text-[#FDDB1A]">
                    Book Tickets
                </h2>


                <p className="text-sm mb-2 text-center text-[#C8C385]">
                    Available: {ticket.quantity}
                </p>


                <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={ticket.quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-[#BA0C10] bg-[#5C0809]/30 text-[#E8D351]
                               rounded-xl px-4 py-2 w-full outline-none
                               focus:border-[#FDDB1A] transition"
                />

                <button
                    onClick={onConfirm}
                    className="w-full mt-5 bg-[#FDDB1A] text-black py-3 rounded-xl font-bold
                               hover:bg-[#E8D351] cursor-pointer transition shadow-lg"
                >
                    Confirm Booking
                </button>

                <button
                    onClick={onClose}
                    className="w-full mt-3 bg-gray-300 text-black py-3 rounded-xl font-semibold
                               hover:bg-gray-400 cursor-pointer transition"
                >
                    Cancel
                </button>
            </div>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUp {
                    from { transform: scale(0.9); }
                    to { transform: scale(1); }
                }
                `}
            </style>
        </div>
    );
};

export default BookingModal;

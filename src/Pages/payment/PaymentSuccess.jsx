import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IoBagCheckOutline, IoTicketOutline } from 'react-icons/io5';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId });
        }
    }, [sessionId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#e7d351] p-6">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border-t-8 border-[#fddb1a]">

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 left-0 h-full w-2 border-dashed border-l border-[#b0bdc0]/50"></div>
                    <div className="absolute top-0 right-0 h-full w-2 border-dashed border-r border-[#b0bdc0]/50"></div>
                </div>

                <div className="p-8 text-center">
                    <IoBagCheckOutline className="w-16 h-16 text-[#e7d351] mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-[#230c0b] mb-2">Payment Successful!</h1>
                    <p className="text-[#645d5e] mb-6">
                        Thank you for your purchase. Your ticket has been confirmed.
                    </p>

                    <div className="bg-[#fddb1a]/20 rounded-lg p-4 mb-6 shadow-inner border border-[#fddb1a]/50">
                        <div className="flex items-center justify-center space-x-2 text-[#230c0b]">
                            <IoTicketOutline className="w-6 h-6 text-[#e7d351]" />
                            <span className="font-medium">
                                Your Ticket ID: <span className="font-bold">{sessionId?.slice(-8)}</span>
                            </span>
                        </div>
                    </div>

                    <Link
                        to="/dashboard/my-orders"
                        className="inline-block bg-[#fddb1a] text-[#230c0b] font-semibold py-3 px-6 rounded-xl hover:bg-[#e7d351] transition duration-300 shadow-lg"
                    >
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;

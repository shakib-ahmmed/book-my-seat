import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ ticket, quantity, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post("https://book-my-seat-server.vercel.app/create-payment-intent", {
                amount: ticket.price * quantity * 100,
            });

            const clientSecret = data.clientSecret;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: "Customer Name",
                    },
                },
            });

            if (result.error) {
                alert(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                alert("Payment successful!");
                onPaymentSuccess();
            }
        } catch (err) {
            console.error(err);
            alert("Payment failed!");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-3 border rounded-lg" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="bg-[#FDDB1A] text-black font-bold py-2 px-6 rounded-xl hover:bg-[#E8D351] cursor-pointer"
            >
                {loading ? "Processing..." : `Pay ${ticket.price * quantity} BDT`}
            </button>
        </form>
    );
};

export default CheckoutForm;

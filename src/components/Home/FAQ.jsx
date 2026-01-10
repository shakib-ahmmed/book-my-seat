import React, { useState } from "react";

const faqs = [
    { question: "How can I book tickets?", answer: "Search for your route, select your ticket, and confirm your booking." },
    { question: "Can I cancel my ticket?", answer: "Yes, you can cancel within 24 hours for a full refund." },
    { question: "What payment methods are accepted?", answer: "Credit/debit card, mobile banking, and digital wallets." },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="py-16 px-4 md:px-12 text-center">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-left">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-[#2C2C2C] dark:bg-gray-800 p-4 rounded-lg shadow cursor-pointer" onClick={() => toggle(idx)}>
                        <p className="font-bold">{faq.question}</p>
                        {openIndex === idx && <p className="mt-2">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;

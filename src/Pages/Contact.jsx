import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate backend submission
        setTimeout(() => {
            setLoading(false);
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#240F0F] text-[#E8D351] px-4 py-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-[#FDDB1A]">Contact Us</h1>
                    <p className="text-gray-300">
                        Need help or have questions? Reach out to us using the form below or
                        via our contact details.
                    </p>

                    <div className="space-y-3">
                        <p>
                            <span className="font-semibold text-[#FDDB1A]">Email:</span>{" "}
                            support@bookmyseat.com
                        </p>
                        <p>
                            <span className="font-semibold text-[#FDDB1A]">Phone:</span>{" "}
                            +880 1234 567890
                        </p>
                        <p>
                            <span className="font-semibold text-[#FDDB1A]">Address:</span>{" "}
                            Dhaka, Bangladesh
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#5C0809]/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#BA0C10] bg-[#240F0F] text-[#E8D351] focus:outline-none focus:border-[#FDDB1A]"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#BA0C10] bg-[#240F0F] text-[#E8D351] focus:outline-none focus:border-[#FDDB1A]"
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#BA0C10] bg-[#240F0F] text-[#E8D351] focus:outline-none focus:border-[#FDDB1A]"
                        required
                    />
                    <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#BA0C10] bg-[#240F0F] text-[#E8D351] focus:outline-none focus:border-[#FDDB1A]"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FDDB1A] text-black font-semibold py-3 rounded-xl hover:bg-[#E8D351] transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;

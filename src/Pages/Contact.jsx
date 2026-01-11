import React from "react";

const Contact = () => {
    return (
        <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-500">
            {/* Header */}
            <section className="py-20 px-4 lg:px-[80px] text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Contact <span className="text-[#800f0f] ">Us</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg opacity-80">
                    Have questions or need support? We’d love to hear from you.
                </p>
            </section>

            {/* Content */}
            <section className="py-16 px-4 lg:px-[80px] grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <p className="opacity-80 mb-6">
                        Reach out to us anytime. Our team is always ready to assist you.
                    </p>

                    <div className="space-y-4 opacity-80 text-[#800f0f] ">
                        <p><strong>Email:</strong> support@homenest.com</p>
                        <p><strong>Phone:</strong> +880 1234-567890</p>
                        <p><strong>Address:</strong> Dhaka, Bangladesh</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-base-200 rounded-xl p-8 shadow-sm transition-all duration-500 hover:shadow-md hover:scale-[1.01]">
                    <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full hover:scale-[1.01] transition-transform duration-300"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full hover:scale-[1.01] transition-transform duration-300"
                            required
                        />

                        <textarea
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full h-32 hover:scale-[1.01] transition-transform duration-300"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="btn w-full h-[45px] bg-[#075a12] dark:bg-[#FDDB1A] text-white dark:text-black font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;

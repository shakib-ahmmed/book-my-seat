import React from "react";
import { Link } from "react-router-dom";
import { Bus } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#240c0b] text-white pt-10">
            <div className="max-w-7x1 mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Column 1 */}
                    <div className="flex flex-col  gap-3">
                        <div className="flex  items-center gap-2">
                            <img src="/public/icon.png" alt="icon" />
                        </div>
                        <p className="text-black text-sm m:text-m xl:text-lg">
                            Book bus, train, launch, and flight tickets quickly and easily. Manage your bookings in one place with BOOKMYSEAT.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="font-semibold text-lg pt-25 mb-3">Quick Links</h3>
                        <ul className="flex flex-col gap-2 text-gray-300">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/tickets" className="hover:text-white">All Tickets</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                            <li><Link to="/about" className="hover:text-white">About</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="font-semibold pt-25 text-lg mb-3">Contact Info</h3>
                        <ul className="flex flex-col gap-2 text-gray-300">
                            <li>Email: support@bookmyseat.com</li>
                            <li>Phone: +880 1234 567890</li>
                            <li>
                                <a
                                    href="https://www.facebook.com/bookmyseat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white"
                                >
                                    Facebook Page
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h3 className="font-semibold pt-25 text-lg mb-3">Payment Methods</h3>
                        <div className="flex items-center gap-4">
                            <img
                                src="/public/stripe.jpg"
                                alt="Stripe"
                                className="h-8 w-auto"
                            />
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-600 mt-8 pt-4 pb-4 text-center text-gray-300 text-sm">
                    © 2025 BOOKMYSEAT. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

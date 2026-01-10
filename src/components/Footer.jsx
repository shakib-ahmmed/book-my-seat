import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon.png";

const Footer = () => {
    return (
        <footer className="bg-[#240c0b] text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="logo" className="w-12 h-12" />
                            <span className="font-bold text-[#FDDB1A] text-2xl">BOOKMYSEAT</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Book bus, train, launch, and flight tickets quickly and easily.
                            Manage all your bookings in one place with BOOKMYSEAT.
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <a href="#" className="hover:text-[#FDDB1A] transition-colors">
                                <i className="fab fa-facebook-f"></i> Facebook
                            </a>
                            <a href="#" className="hover:text-[#FDDB1A] transition-colors">
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                            <a href="#" className="hover:text-[#FDDB1A] transition-colors">
                                <i className="fab fa-twitter"></i> Twitter
                            </a>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-4">Quick Links</h3>
                        <ul className="flex flex-col gap-3 text-gray-300">
                            <li><Link to="/" className="hover:text-[#FDDB1A]">Home</Link></li>
                            <li><Link to="/tickets" className="hover:text-[#FDDB1A]">All Tickets</Link></li>
                            <li><Link to="/about" className="hover:text-[#FDDB1A]">About</Link></li>
                            <li><Link to="/contact" className="hover:text-[#FDDB1A]">Contact</Link></li>
                        </ul>
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>Email: <span className="text-[#FDDB1A]">support@bookmyseat.com</span></li>
                            <li>Phone: <span className="text-[#FDDB1A]">+880 1234 567890</span></li>
                            <li>
                                <a
                                    href="https://www.facebook.com/bookmyseat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#FDDB1A]"
                                >
                                    Facebook Page
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* PAYMENT METHODS */}
                    <div>
                        <h3 className="font-semibold text-lg text-white mb-4">Payment Methods</h3>
                        <div className="flex items-center gap-4">
                            <img src="/stripe.jpg" alt="Stripe" className="h-10 w-auto" />
                            <img src="/paypal.png" alt="PayPal" className="h-10 w-auto" />
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© 2025 <span className="text-[#FDDB1A] font-semibold">BOOKMYSEAT</span>. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <Link to="/privacy" className="hover:text-[#FDDB1A]">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-[#FDDB1A]">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

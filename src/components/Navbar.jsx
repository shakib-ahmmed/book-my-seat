import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider.jsx";
import { UserIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout successfully");
                setDropdownOpen(false);
            })
            .catch((error) => toast.error(error.message));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-base-100 shadow-sm">
            <div className="navbar lg:px-20 py-3">
                
                {/* Logo */}
                <div className="navbar-start">
                    <NavLink to="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="w-10 h-10 lg:w-12 lg:h-12"
                        />
                        <span className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#075a12] leading-tight">
                            BOOKMTSEAT
                        </span>
                    </NavLink>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal font-semibold px-1">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/all-properties">All Properties</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/add-property">Add Property</NavLink></li>
                                <li><NavLink to="/my-properties">My Properties</NavLink></li>
                                <li><NavLink to="/my-rating">My Ratings</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end flex items-center gap-3">

                    {/* User / Auth Buttons */}
                    <div className="relative" ref={dropdownRef}>
                        {user ? (
                            <>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition-transform duration-200 ease-in-out"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="User"
                                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-gray-500" />
                                    )}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b">
                                            <p className="font-semibold text-gray-900">{user.displayName || "User"}</p>
                                            <p className="text-sm text-gray-700">{user.email}</p>
                                        </div>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    to="/my-properties"
                                                    className="block px-4 py-2 hover:bg-[#075a12] hover:text-white transition"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    My Properties
                                                </NavLink>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="w-full text-left px-4 py-2 hover:bg-[#075a12] hover:text-white transition"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/auth/login"
                                    className="btn bg-[#075a12] text-white w-[120px] h-[40px] hover:scale-105 transition-transform duration-200 ease-in-out"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/registration"
                                    className="btn bg-gray-200 text-gray-800 w-[120px] h-[40px] hover:scale-105 transition-transform duration-200 ease-in-out"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden ml-2">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/all-properties">All Properties</NavLink></li>
                                {user && (
                                    <>
                                        <li><NavLink to="/add-property">Add Property</NavLink></li>
                                        <li><NavLink to="/my-properties">My Properties</NavLink></li>
                                        <li><NavLink to="/my-rating">My Ratings</NavLink></li>
                                    </>
                                )}
                                {!user && (
                                    <>
                                        <li><NavLink to="/auth/login">Login</NavLink></li>
                                        <li><NavLink to="/auth/registration">Signup</NavLink></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" />
        </div>
    );
};

export default Navbar;

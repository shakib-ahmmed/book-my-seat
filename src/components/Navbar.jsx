import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider.jsx";
import { UserIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully");
                setDropdownOpen(false);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div>
            <div className="navbar bg-white shadow-sm pb-5 lg:px-[80px]">

                {/* MOBILE MENU BUTTON */}
                <div className="navbar-start">
                    <div className="dropdown pb-5">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </div>

                        {/* MOBILE MENU */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies">Movies</NavLink>
                            </li>
                            <li>
                                <NavLink to="/concerts">Concerts</NavLink>
                            </li>
                            {user && (
                                <>
                                    <li>
                                        <NavLink to="/my-tickets">My Tickets</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* LOGO */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center gap-2">
                            <img
                                className="lg:w-12 w-10 lg:h-12 h-10"
                                src="/logo.png"
                                alt="logo"
                            />
                            <span className="font-bold text-3xl text-red-600 leading-tight tracking-wide">
                                BOOK
                            </span>
                            <span className="font-bold text-3xl text-gray-900 leading-tight tracking-wide">
                                MYSEAT
                            </span>
                        </NavLink>
                    </div>
                </div>

                {/* DESKTOP MENU */}
                <div className="navbar-center font-semibold hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-gray-800">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/events">Events</NavLink>
                        </li>
                        <li>
                            <NavLink to="/movies">Movies</NavLink>
                        </li>
                        <li>
                            <NavLink to="/concerts">Concerts</NavLink>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <NavLink to="/my-tickets">My Tickets</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* RIGHT SIDE USER SECTION */}
                <div className="navbar-end relative">
                    <div className="hidden lg:flex relative">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition"
                                >
                                    {user.photoURL ? (
                                        <img
                                            className="w-12 h-12 rounded-full object-cover border"
                                            src={user.photoURL}
                                            alt="User"
                                        />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-gray-500" />
                                    )}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-xl overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b">
                                            <p className="font-semibold text-gray-900">
                                                {user.displayName || "User"}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {user.email}
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white font-medium transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/auth/login"
                                    className="btn bg-red-600 text-white font-semibold w-[145px] h-[45px] hover:bg-red-700 transition flex items-center justify-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/registration"
                                    className="btn bg-gray-200 text-gray-900 font-semibold w-[145px] h-[45px] hover:bg-gray-300 transition flex items-center justify-center"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* MOBILE USER BUTTON */}
                    <div className="lg:hidden relative">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition"
                                >
                                    {user.photoURL ? (
                                        <img
                                            className="w-10 h-10 rounded-full border object-cover"
                                            src={user.photoURL}
                                            alt="User"
                                        />
                                    ) : (
                                        <UserIcon className="w-10 h-10 text-gray-500" />
                                    )}
                                </button>

                                {dropdownOpen && (
                                    <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50 text-gray-800">
                                        <li>
                                            <NavLink
                                                to="/my-tickets"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                {user.displayName || "Profile"}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogOut}
                                                className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="btn bg-red-600 text-white font-semibold w-[120px] h-[40px] hover:bg-red-700 transition flex items-center justify-center"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" />
        </div>
    );
};

export default Navbar;

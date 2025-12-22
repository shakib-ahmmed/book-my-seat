import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";


import { UserIcon, Bus } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthContext";


const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout successfully");
                setDropdownOpen(false);
            })
            .catch((err) => toast.error(err.message));
    };
    if (loading) return null;
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm lg:px-20">
                <div className="navbar-start flex items-center gap-2">
                    <NavLink to="/" className="flex items-center justify-center gap-2">
                        <img className="h-20 w-20" src="/logo.png" alt="BOOKMYSEAT" />
                        <span className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#800f0f] hidden lg:block">
                            BOOKMYSEAT
                        </span>

                    </NavLink>
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content text-2xl sm:text-3xl lg:text-4xl text-black mt-3 p-2 shadow bg-base-100 rounded-box w-52" >

                            <li><NavLink to="/">Home</NavLink></li>
                            {user && <li><NavLink to="/all-tickets">All Tickets</NavLink></li>}
                            {!user && <li><NavLink to="/auth/login">Login</NavLink></li>}
                            {!user && <li><NavLink to="/auth/registration">Register</NavLink></li>}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        <li><NavLink to="/">Home</NavLink></li>
                        {user && <li><NavLink to="/all-tickets">All Tickets</NavLink></li>}
                    </ul>
                </div>
                <div className="navbar-end relative">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition"
                            >
                                {user.photoURL ? (
                                    <img className="w-10 h-10 rounded-full object-cover" src={user.photoURL} alt="User" />
                                ) : (
                                    <UserIcon className="w-10 h-10 text-gray-500" />
                                )}
                                <span className="hidden lg:block font-medium">{user.displayName || "User"}</span>
                            </button>

                            {dropdownOpen && (
                                <ul className="absolute right-0 mt-2 w-48 cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                    <li>
                                        <NavLink
                                            to="/dashboard/profile"
                                            className="block px-4 py-2 hover:bg-[#f2d73c]"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Profile
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className="block px-4 py-2 hover:bg-[#f2d73c]"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 hover:bg-[#f2d73c]"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/auth/login"
                                className="btn bg-[#660103] text-white font-semibold w-[120px] h-[40px] hover:scale-105 transition flex items-center justify-center"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/registration"
                                className="btn bg-gray-200 text-gray-800 font-semibold w-[120px] h-[40px] hover:scale-105 transition flex items-center justify-center"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default Navbar;

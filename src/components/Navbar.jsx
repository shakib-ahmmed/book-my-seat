import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserIcon, Sun, Moon, Menu, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthContext";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (!user) setDropdownOpen(false);
    }, [user]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout successfully");
            })
            .catch((err) => toast.error(err.message));
    };

    if (loading) return null;

    const commonRoutes = (
        <>
            <li>
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-tickets" onClick={() => setMobileMenuOpen(false)}>
                    All Tickets
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                </NavLink>
            </li>
        </>
    );

    const userRoutes = user && (
        <>
            <li>
                <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-tickets" onClick={() => setMobileMenuOpen(false)}>
                    My Tickets
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/profile" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
            <div className="navbar lg:px-20">
                {/* LEFT */}
                <div className="navbar-start flex items-center gap-2">
                    <NavLink to="/" className="flex items-center gap-2">
                        <img className="h-20 w-20" src="/logo.png" alt="BOOKMYSEAT" />
                        <span className="font-bold text-2xl lg:text-4xl text-[#800f0f] hidden lg:block">
                            BOOKMYSEAT
                        </span>
                    </NavLink>
                </div>

                {/* CENTER (Desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold gap-4">
                        {commonRoutes}
                        {userRoutes}
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end flex items-center gap-3 relative">
                    {/* THEME TOGGLE */}
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="btn btn-ghost btn-circle"
                        title="Toggle Theme"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    {/* USER / LOGIN */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition"
                            >
                                {user.photoURL ? (
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={user.photoURL}
                                        alt="User"
                                    />
                                ) : (
                                    <UserIcon className="w-10 h-10 text-gray-500" />
                                )}
                                <span className="hidden lg:block font-medium">{user.displayName || "User"}</span>
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-xl overflow-hidden z-50"
                                    >
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
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="hidden lg:flex gap-2">
                            <Link
                                to="/auth/login"
                                className="btn bg-[#660103] text-white font-semibold w-[120px] h-[40px]"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/registration"
                                className="btn bg-gray-200 text-gray-800 font-semibold w-[120px] h-[40px]"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* MOBILE MENU TOGGLE */}
                    <button
                        className="lg:hidden btn btn-ghost btn-circle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="lg:hidden bg-base-100 shadow-lg w-full absolute top-full left-0 z-40"
                    >
                        <ul className="flex flex-col gap-2 p-4 font-semibold">
                            {commonRoutes}
                            {userRoutes}
                            {!user && (
                                <>
                                    <li>
                                        <Link
                                            to="/auth/login"
                                            className="block bg-[#660103] text-white text-center py-2 rounded"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/auth/registration"
                                            className="block bg-gray-200 text-gray-800 text-center py-2 rounded"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="w-full text-left px-4 py-2 hover:bg-[#f2d73c] rounded"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <ToastContainer position="top-center" />
        </div>
    );
};

export default Navbar;

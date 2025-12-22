import { useState } from "react";
import { Link } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";

import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../LoadingSpinner";


import VendorMenu from "./menu/VendorMenu";
import AdminMenu from "./menu/AdminMenu";
import MenuItem from "./menu/MenuItem";
import UserMenu from "./menu/UserMenu";




const Sidebar = () => {
    const { logOut, role, roleLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (roleLoading) return <LoadingSpinner />;

    return (
        <>

            <div className="md:hidden flex items-center justify-between bg-white shadow-md px-4 py-3">
                <Link to="/">
                    <img src="../../../../public/icon.png" alt="logo" className="w-24 h-auto" />
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 cursor-pointer focus:outline-none"
                >
                    <AiOutlineBars className="w-6 h-6" />
                </button>
            </div>

            <div
                className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            ></div>

            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform
                    md:translate-x-0 transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    flex flex-col justify-between`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-center mt-6 mb-8">
                        <Link to="/">
                            <img
                                src="../../../../public/icon.png"
                                alt="logo"
                                className="lg:w-50 w-40 h-40 lg:h-auto rounded-2xl border-4 bg-black border-yellow-400 shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                    </div>

                    {/* Menu */}
                    <div className="flex-1 flex flex-col space-y-2 px-4">
                        <MenuItem
                            icon={BsGraphUp}
                            label="Statistics"
                            address="/dashboard"
                            className="hover:bg-gray-200 transition rounded-lg"
                        />

                        {role === "user" && <UserMenu />}
                        {role === "vendor" && <VendorMenu />}
                        {role === "admin" && <AdminMenu />}
                    </div>

                    {/* Bottom */}
                    <div className="px-4 mb-6">
                        <hr className="border-gray-300 mb-4" />

                        <MenuItem
                            icon={FcSettings}
                            label="Profile"
                            address="/dashboard/profile"
                            className="hover:bg-gray-200 cursor-pointer rounded-lg transition"
                        />

                        <button
                            onClick={logOut}
                            className="flex items-center w-full px-4 py-3 mt-3 cursor-pointer bg-white text-gray-700 hover:bg-red-600 hover:text-white rounded-lg transition duration-300"
                        >
                            <GrLogout className="w-5 h-5" />
                            <span className="ml-3 cursor-pointer font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

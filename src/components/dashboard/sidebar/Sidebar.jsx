import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import logo from '../../../../public/logo.png'

// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

import LoadingSpinner from '../../LoadingSpinner'
import MenuItem from './menu/MenuItem'
import UserMenu from './menu/UserMenu'
import VendorMenu from './menu/VendorMenu'
import AdminMenu from './menu/AdminMenu'

const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)
    const [role, isRoleLoading] = useRole()

    const handleToggle = () => setActive(!isActive)

    if (isRoleLoading) return <LoadingSpinner />

    return (
        <>
            {/* Small Screen Navbar */}
            <div className="bg-white text-[#3d1816] flex justify-between md:hidden shadow-md">
                <div className="cursor-pointer p-4">
                    <Link to="/">
                        <img src={logo} alt="logo" width="90" height="90" />
                    </Link>
                </div>

                <button
                    onClick={handleToggle}
                    className="mobile-menu-button p-4 focus:outline-none"
                >
                    <AiOutlineBars className="h-6 w-6 text-[#3d1816] " />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-hidden 
                bg-white text-[#3d1816]
                w-64 space-y-6 px-4 py-6 shadow-xl
                absolute inset-y-0 left-0 transform
                ${isActive ? "-translate-x-full" : "md:translate-x-0"}
                transition-all duration-300 ease-in-out`}
            >
                <div className="flex flex-col h-full">

                    {/* Logo Box */}
                    <div className="hidden md:flex justify-center mb-8">
                        <div className="bg-[#341311] p-3 rounded-xl shadow-md">
                            <Link to="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    width="110"
                                    className="rounded-lg"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col flex-1 space-y-2">

                        {/* Dashboard */}
                        <MenuItem
                            icon={BsGraphUp}
                            label="Statistics"
                            address="/dashboard"
                            className="hover:bg-[#4d1d1a] transition rounded-lg"
                        />

                        {/* Role-Based Menus */}
                        {role === "customer" && <UserMenu />}
                        {role === "seller" && <VendorMenu />}
                        {role === "admin" && <AdminMenu />}
                    </div>

                    {/* Bottom Menu */}
                    <div className="mt-4">
                        <hr className="border-[#5e2824]" />

                        {/* Profile */}
                        <MenuItem
                            icon={FcSettings}
                            label="Profile"
                            address="/dashboard/profile"
                            className="hover:bg-[#4d1d1a] rounded-lg"
                        />

                        {/* Logout Button */}
                        <button
                            onClick={logOut}
                            className="flex items-center w-full px-4 py-3 mt-3 
                            text-[#3d1816]  bg-white hover:bg-[#5e2824] hover:text-white  rounded-lg 
                            transition duration-300 shadow-sm"
                        >
                            <GrLogout className="w-5 h-5" />
                            <span className="ml-3 font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;

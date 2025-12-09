import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [sidebarOpen] = useState(true);

    return (
        <div className="flex flex-col min-h-screen">


            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={`bg-gray-100 p-4 w-64 transition-all ${sidebarOpen ? "block" : "hidden"} lg:block`}>
                    <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
                    <ul className="space-y-4">
                        <li>
                            <NavLink
                                to="/dashboard/profile"
                                className={({ isActive }) =>
                                    isActive ? "font-semibold text-[#660103]" : "text-gray-700"
                                }
                            >
                                User Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/booked-tickets"
                                className={({ isActive }) =>
                                    isActive ? "font-semibold text-[#660103]" : "text-gray-700"
                                }
                            >
                                My Booked Tickets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/transactions"
                                className={({ isActive }) =>
                                    isActive ? "font-semibold text-[#660103]" : "text-gray-700"
                                }
                            >
                                Transaction History
                            </NavLink>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

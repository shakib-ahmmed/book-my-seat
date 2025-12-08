import { useState } from "react";
import { Outlet } from "react-router";

import { Menu } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen md:flex bg-gray-50">


      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 bg-white shadow p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>


      {/* Sidebar */}
      <div
        className={`
          fixed z-40 inset-y-0 left-0 w-64 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static bg-white shadow-md
        `}
      >
        <Sidebar />
      </div>


      {/* Right Content */}
      <div className="flex-1 md:ml-64 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { UserIcon, Sun, Moon, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthContext";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  // ------------------ THEME LOGIC ------------------
  const applyTheme = (mode) => {
    let finalTheme = mode;

    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      finalTheme = isDark ? "dark" : "light";
    }

    document.documentElement.setAttribute("data-theme", finalTheme);
    document.documentElement.style.colorScheme = finalTheme;
    localStorage.setItem("theme", mode); // store original choice (light/dark/system)
    setTheme(finalTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    applyTheme(stored);

    // Listen for system theme changes if "system" mode
    if (stored === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => applyTheme("system");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // Sync theme across tabs
  useEffect(() => {
    const syncTheme = (e) => {
      if (e.key === "theme") applyTheme(e.newValue || "light");
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on logout
  useEffect(() => {
    if (!user) setDropdownOpen(false);
  }, [user]);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logout successfully"))
      .catch((err) => toast.error(err.message));
  };

  if (loading) return null;

  const commonRoutes = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  const userRoutes = user && (
    <>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/dashboard/my-tickets">My Tickets</NavLink></li>
      <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
    </>
  );

  // Determine icon for current theme
  const getThemeIcon = () => {
    if (localStorage.getItem("theme") === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? <Moon size={20} /> : <Sun size={20} />;
    }
    return theme === "dark" ? <Moon size={20} /> : <Sun size={20} />;
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100 transition-colors duration-300 shadow-sm">
      <div className="navbar lg:px-20">

        {/* LEFT */}
        <div className="navbar-start gap-2">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="BOOKMYSEAT" className="h-20 w-20" />
            <span className="font-bold text-2xl lg:text-4xl text-[#800f0f] hidden lg:block">
              BOOKMYSEAT
            </span>
          </NavLink>
        </div>

        {/* CENTER DESKTOP */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold gap-4">
            {commonRoutes}
            {userRoutes}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3 relative">

          {/* THEME SWITCH */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle" title="Theme">
              {getThemeIcon()}
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36">
              <li>
                <button onClick={() => applyTheme("light")} className="gap-2">
                  <Sun size={16} /> Light
                </button>
              </li>
              <li>
                <button onClick={() => applyTheme("dark")} className="gap-2">
                  <Moon size={16} /> Dark
                </button>
              </li>
              <li>
                <button onClick={() => applyTheme("system")} className="gap-2">
                  System
                </button>
              </li>
            </ul>
          </div>

          {/* USER */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:scale-105 transition"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-10 h-10 text-gray-500" />
                )}
                <span className="hidden lg:block font-medium">
                  {user.displayName || "User"}
                </span>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-base-100 shadow-lg rounded-xl overflow-hidden">
                  <li>
                    <NavLink to="/dashboard/profile" className="block px-4 py-2 hover:bg-[#f2d73c]">
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-[#f2d73c]">
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
            <div className="hidden lg:flex gap-2">
              <Link to="/auth/login" className="btn bg-[#660103] text-white w-[120px]">
                Login
              </Link>
              <Link to="/auth/registration" className="btn bg-gray-200 text-gray-800 w-[120px]">
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
      {mobileMenuOpen && (
        <div className="lg:hidden bg-base-100 shadow-lg absolute w-full left-0 top-full">
          <ul className="flex flex-col gap-2 p-4 font-semibold">
            {commonRoutes}
            {userRoutes}
            {!user && (
              <>
                <li>
                  <Link to="/auth/login" className="block bg-[#660103] text-white text-center py-2 rounded">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/registration" className="block bg-gray-200 text-gray-800 text-center py-2 rounded">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <button onClick={handleLogOut} className="w-full text-left px-4 py-2 hover:bg-[#f2d73c] rounded">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

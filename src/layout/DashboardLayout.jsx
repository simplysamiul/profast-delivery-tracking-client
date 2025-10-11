import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, Package, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import ProfastLogo from "../pages/Shared/ProfastLogo/ProfastLogo";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { FaCheckCircle, FaHome, FaUserCheck, FaUserClock } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { MdSwitchAccount } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

export default function DashboardLayout() {

  const { userLogOut, setUserDataLoading } = useAuth();


  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <FaHome size={20} />, path: "/" },
    { name: "My Parcels", icon: <Package size={20} />, path: "/dashboard/myParcels" },
    { name: "Delivered Parcels", icon: <FaCheckCircle size={20} />, path: "/dashboard/delivered-parcels" },
    { name: "Track a Parcel", icon: <ImLocation2 size={20} />, path: "/dashboard/trackParcel" },
    { name: "Payment History", icon: <FaCircleDollarToSlot size={20} />, path: "/dashboard/paymentHistory" },
    { name: "All Riders", icon: <PiUserListFill size={20} />, path: "/dashboard/allRiders" },
    { name: "Verified Riders", icon: <FaUserCheck size={20} />, path: "/dashboard/verifiedRiders" },
    { name: "Pending Riders", icon: <FaUserClock size={20} />, path: "/dashboard/pendingRiders" },
    { name: "Profile", icon: <MdSwitchAccount size={20} />, path: "/dashboard/profile" },
    { name: "Make Admin", icon: <IoShieldCheckmarkSharp size={20} />, path: "/dashboard/makeAdmin" },
  ];

  // Color palette
  const colors = {
    sidebarBg: "#03373D",
    sidebarText: "#CAEB66",
    mainBg: "#FFFFFF",
    mainText: "#03373D",
    buttonBg: "#CAEB66",
    buttonText: "#03373D",
  };

  // Simulated logout action
  const handleLogout = () => {
    Swal.fire({
      title: "Log Out",
      text: "Are You sure you want to log out ?",
      showCloseButton: true,
      icon: "warning"
    }).then((res) => {
      if (res.isConfirmed) {
        userLogOut()
          .then(() => {
            Swal.fire({
              text: "User Logout Successfully ....!",
              icon: "success"
            });
            setUserDataLoading(false);
          }).catch(err => {
            Swal.fire({
              text: `${err.message}`,
              icon: "error"
            });
            setUserDataLoading(false);
          })
      }
    });
  };

  return (
    <div
      className="flex h-screen transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: colors.mainBg, color: colors.mainText }}
    >
      {/* Sidebar (Large Screen) */}
      <div
        className={`hidden md:flex flex-col justify-between transition-all duration-500 ${isCollapsed ? "w-20" : "w-64"
          }`}
        style={{ backgroundColor: colors.sidebarBg, color: colors.sidebarText }}
      >
        {/* --- TOP SECTION --- */}
        <div>
          <div
            className="flex items-center justify-between p-4 border-b border-opacity-30 text-white"
            style={{ borderColor: colors.sidebarText }}
          >
            {!isCollapsed && <Link to="/dashboard"><ProfastLogo /></Link>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 mt-6 cursor-pointer transition-colors"
              style={{ color: colors.sidebarText }}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 border-l-4 border-transparent 
                    ${isActive
                    ? "bg-[#CAEB66] text-[#03373D] font-semibold border-l-[#CAEB66]"
                    : "hover:border-l-[#CAEB66] hover:bg-[#CAEB66]/20"}`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.buttonBg : "transparent",
                  color: isActive ? colors.buttonText : colors.sidebarText,
                })}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* --- BOTTOM SECTION: Logout Button --- */}
        <div
          className="p-4 border-t border-opacity-30"
          style={{ borderColor: colors.sidebarText }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
            }}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* --- Mobile Drawer --- */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-50">
        <div
          className="flex items-center justify-between p-4 text-white"
          style={{
            backgroundColor: colors.sidebarBg,
            color: colors.sidebarText,
          }}
        >
          <button onClick={() => setIsDrawerOpen(true)} style={{ color: colors.sidebarText }}>
            <Menu size={26} />
          </button>
          <Link to="/dashboard"><ProfastLogo /></Link>
        </div>

        {/* Drawer Overlay */}
        {isDrawerOpen && (
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          ></div>
        )}

        {/* Drawer Content */}
        <div
          className={`fixed top-0 left-0 h-full w-60 z-50 transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          style={{
            backgroundColor: colors.sidebarBg,
            color: colors.sidebarText,
          }}
        >
          <div
            className="flex items-center justify-between p-4 border-b border-opacity-30"
            style={{ borderColor: colors.sidebarText }}
          >
            <h2 className="text-lg font-semibold" style={{ color: colors.sidebarText }}>
              Dashboard
            </h2>
            <button onClick={() => setIsDrawerOpen(false)}>✕</button>
          </div>

          <nav className="p-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ${isActive ? "font-semibold" : "hover:opacity-80"
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? colors.buttonBg : "transparent",
                  color: isActive ? colors.buttonText : colors.sidebarText,
                })}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* --- Bottom Logout Button for Mobile --- */}
          <div
            className="absolute bottom-0 left-0 w-full p-4 border-t border-opacity-30"
            style={{ borderColor: colors.sidebarText }}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div
        className="flex-1 overflow-y-auto p-6 md:p-8 transition-colors duration-700 ease-in-out"
        style={{
          backgroundColor: colors.mainBg,
          color: colors.mainText,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

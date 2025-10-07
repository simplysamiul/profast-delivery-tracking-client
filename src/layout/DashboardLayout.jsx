import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu,
  Package,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"; // for icons
import ProfastLogo from "../pages/Shared/ProfastLogo/ProfastLogo";

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { name: "My Parcels", icon: <Package size={20} />, path: "/dashboard/my-parcels" },
    { name: "Delivered Parcels", icon: <CheckCircle2 size={20} />, path: "/dashboard/delivered-parcels" },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#03373D]">
      {/* Sidebar (Large Screen) */}
      <div
        className={`hidden md:flex flex-col transition-all duration-300 bg-[#03373D] text-white ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#CAEB66]/40">
          {!isCollapsed && (
            <ProfastLogo />   
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 mt-5 cursor-pointer text-[#CAEB66] hover:text-white"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="flex-1 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#CAEB66] text-[#03373D] font-semibold"
                    : "hover:bg-[#CAEB66]/20"
                }`
              }
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between bg-[#03373D] text-white p-4">
          <button onClick={() => setIsDrawerOpen(true)} className="text-[#CAEB66]">
            <Menu size={26} />
          </button>
          <ProfastLogo />
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
          className={`fixed top-0 left-0 h-full w-60 bg-[#03373D] text-white z-50 transform transition-transform duration-300 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#CAEB66]/40">
            <h2 className="text-lg font-semibold text-[#CAEB66]">Dashboard</h2>
            <button onClick={() => setIsDrawerOpen(false)} className="text-[#CAEB66]">
              ✕
            </button>
          </div>
          <nav className="p-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-[#CAEB66] text-[#03373D] font-semibold"
                      : "hover:bg-[#CAEB66]/20"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}

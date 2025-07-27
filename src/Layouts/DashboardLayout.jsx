import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  Menu,
  X,
  LayoutDashboard,
  UserRound,
  LogOut,
  Droplet,
  Users,
  FileEdit,
  FilePlus,
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'
    }`;

  return (
    <div >
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden p-4 bg-red-50 text-secondary"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 min-h-screen z-40 bg-secondary text-base-100 w-64 p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } md:relative md:translate-x-0 md:flex md:flex-col transition-transform duration-300 ease-in-out`}
          >
            <h2 className="text-2xl font-bold mb-8">RedDrop</h2>
            <nav className="space-y-3">
              <NavLink to="/dashboard" className={linkClasses}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/profile" className={linkClasses}>
                <UserRound size={18} />
                My Profile
              </NavLink>
              <NavLink to="/dashboard/my-donation-requests" className={linkClasses}>
                <Droplet size={18} />
                My Donation Requests
              </NavLink>
              <NavLink to="/dashboard/create-donation-request" className={linkClasses}>
                <FilePlus size={18} />
                Create Donation Request
              </NavLink>
              <NavLink to="/dashboard/all-users" className={linkClasses}>
                <Users size={18} />
                All Users
              </NavLink>
              <NavLink to="/dashboard/all-blood-donation-request" className={linkClasses}>
                <Droplet size={18} />
                All Blood Requests
              </NavLink>
              <NavLink to="/dashboard/content-management" className={linkClasses}>
                <FileEdit size={18} />
                Content Management
              </NavLink>

            </nav>

            <div className="mt-16 pt-6 border-t border-base-300">
              <button className="flex items-center gap-3 text-base-100 hover:text-primary transition">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className=" max-w-screen-xl mx-auto py-7 bg-base-100 px-6 lg:px-0 ">
            <Outlet />
          </main>
        </div>
      </div>


    </div>
  );
};

export default DashboardLayout;

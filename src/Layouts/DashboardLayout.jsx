import React, { use, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
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
import useUserRole from '../Hooks/useUserRole';
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Components/Loader';


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const { role } = useUserRole()
  const { user, signOutUser, loading } = use(AuthContext)
  const navigate = useNavigate()

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${isActive ? 'bg-primary text-white' : 'hover:bg-primary/20'
    }`;

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        console.log(error.message);
      })
  }
  useEffect(() => {
    if (loading) return
    if (!user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (user === undefined || loading) {
    return <Loader />;
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 relative mt-17">
        {/* Toggle button for sidebar (Mobile) */}
        {!sidebarOpen && (
          <button
            className="md:hidden p-4 absolute top-0 left-0 z-50 text-primary"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 bg-secondary text-white w-64 min-h-screen p-6 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:relative md:translate-x-0 md:flex md:flex-col`}
        >
          {/* Close button inside sidebar (mobile only) */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <button onClick={toggleSidebar} aria-label="Close Sidebar">
              <X size={24} className="text-base-100" />
            </button>
          </div>

          {/* Sidebar desktop */}

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
            {
              role === 'admin' && <NavLink to="/dashboard/all-users" className={linkClasses}>
                <Users size={18} />
                All Users
              </NavLink>
            }
            {
              (role === 'admin' || role === 'volunteer') && <NavLink to="/dashboard/all-blood-donation-request" className={linkClasses}>
                <Droplet size={18} />
                All Blood Requests
              </NavLink>
            }
            {
              (role === 'admin' || role === 'volunteer') && <NavLink to="/dashboard/content-management" className={linkClasses}>
                <FileEdit size={18} />
                Content Management
              </NavLink>
            }
          </nav>

          <div className="mt-16 pt-6 border-t border-base-300">
            <button onClick={handleSignOut} className="flex items-center gap-3 text-base-100 hover:text-primary transition">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Backdrop (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 py-10 overflow-x-hidden max-w-screen-xl mx-auto bg-gradient-to-t from-red-50 to-white">
          <div className='mt-5 md:mt-0 px-5'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

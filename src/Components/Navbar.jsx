import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png'
import userProfile from '../../src/assets/userProfile.png'

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext)

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const navItems = <>
    <li className='text-white text-lg'><NavLink to={"/blood-donation-request"} className={({ isActive }) => isActive ? " border-b-2 border-primary text-lg pb-1 font-bold" : "font-normal"
    }>Blood Donation Request</NavLink></li>
    <li className='text-white text-lg'><NavLink to={"/search-donor"} className={({ isActive }) => isActive ? " border-b-2 border-primary text-lg pb-1 font-bold" : "font-normal"
    }>Search Donor</NavLink></li>
    <li className='text-white text-lg'><NavLink to={"/blogs"} className={({ isActive }) => isActive ? " border-b-2 border-primary text-lg pb-1 font-bold" : "font-normal"
    }>Blogs</NavLink ></li>
    <li className='text-white text-lg'><NavLink to={"/fund-details"} className={({ isActive }) => isActive ? " border-b-2 border-primary text-lg pb-1 font-bold" : "font-normal"
    }>Fund Details</NavLink></li>
  </>

  return (
    <div className='bg-secondary z-50 relative'>
      <div className='max-w-screen-xl mx-auto'>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li className='text-black text-lg'><NavLink to={"/blood-donation-request"} className={({ isActive }) => isActive ? " border-b-2 border-primary  pb-1 font-bold" : "font-normal"
                }>Blood Donation Request</NavLink></li>
                <li className='text-black text-lg'><NavLink to={"/search-donor"} className={({ isActive }) => isActive ? " border-b-2 border-primary  pb-1 font-bold" : "font-normal"
                }>Search Donor</NavLink></li>
                <li className='text-black text-lg'><NavLink to={"/blogs"} className={({ isActive }) => isActive ? " border-b-2 border-primary  pb-1 font-bold" : "font-normal"
                }>Blogs</NavLink></li>
                <li className='text-black text-lg'><NavLink to={"/fund-details"} className={({ isActive }) => isActive ? " border-b-2 border-primary  pb-1 font-bold" : "font-normal"
                }>Fund Details</NavLink></li>
              </ul>
            </div>
            <div>
              <NavLink to={'/'}>
                <img
                  className='w-48'
                  src={logo} alt="" />
              </NavLink>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex" >
            <ul className="menu menu-horizontal px-1 flex gap-4">
              {navItems}

            </ul>
          </div>
          {
            user ? <div className='flex items-center gap-3 navbar-end'>
              {/* <button onClick={handleSignOut} className='btn btn-primary text-white mr-2'>Logout</button> */}
              <h3 className='text-white text-lg'>{user.displayName}</h3>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-24 rounded-full">
                    <img
                      alt="User Profile IMG"
                      src={user.photoURL || userProfile} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-3 shadow">
                  <NavLink to={'/dashboard'}><li className='hover:bg-red-100 px-2'>Dashboard</li></NavLink>
                  <li onClick={handleSignOut} className='cursor-pointer hover:bg-red-100 px-2'>Logout</li>
                </ul>
              </div>
            </div> : <div className="navbar-end">
              <NavLink to={'/login'}><button className='btn btn-primary text-white mr-2'>Login</button></NavLink>
              <NavLink to={'/sign-up'}><button className='btn text-white btn-primary'>Sign Up</button></NavLink>
            </div>
          }


        </div>
      </div>
    </div>
  );
};

export default Navbar;
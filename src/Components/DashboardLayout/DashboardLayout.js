import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { ImCross } from 'react-icons/im';


const DashboardLayout = () => {
    return (
        <div>
            <div className='flex items-center gap-3'>
                <Navbar />

                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <MdSpaceDashboard className='w-5 h-5' />
                </label>
            </div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  bg-gray-50">

                    <Toaster></Toaster>
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side w-80">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay lg:hidden"></label>
                    <ul className="menu p-4 w-80 text-base-content flex flex-row justify-between">



                        <div>

                            <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard">Dashboard Home</Link></li>
                            <li><Link className='font-bold bg-gradient-to-r from-blue-300 to-pink-100 my-3' to="/dashboard/allTask">All Task</Link></li>

                        </div>




                        <label htmlFor="dashboard-drawer" tabIndex={1} className="btn btn-sm lg:hidden">
                            <ImCross />
                        </label>

                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
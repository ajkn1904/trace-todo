import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Toaster/>
            <Outlet/>
        </div>
    );
};

export default Main;
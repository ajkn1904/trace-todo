import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { AuthContext } from '../Context/AuthProvider';


const Navbar = () => {

    const { user, userSignOut } = useContext(AuthContext)


    const handleSignOut = () => {
        userSignOut()
            .then(() => { })
            .cath(error => console.log(error))
    }

    const menu = <>
        <li><Link to='/' className='font-bold text-md btn btn-info text-white m-2' >Home</Link></li>
        <li><Link to='/dashboard' className='font-bold text-md btn btn-info text-white m-2' >Dashboard</Link></li>

        {
            user?.uid ?
                <li><Link to='/' className='font-bold text-md btn btn-info text-white m-2'onClick={handleSignOut} >Sign Out</Link></li>
                :
                <>
                    <li><Link to='/signIn' className='font-bold text-md btn btn-info text-white m-2' >Sign In</Link></li>
                    <li><Link to='/signUp' className='font-bold text-md btn btn-info text-white m-2' >Sign Up</Link></li>
                </>
        }

    </>

    return (
        <div className="navbar bg-base-100">

            <div className="navbar-start">
                <Link to='/' className="btn btn-ghost normal-case text-xl"><span className='text-info font-semibold text-3xl'>Trace</span><span className='italic'><span className='text-red-600 font-bold'>T</span>O</span><span className='text-green-600 font-extrabold text-3xl'>D</span>O</Link>
            </div>


            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>



            <div className="dropdown dropdown-end ml-52">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <HiOutlineMenuAlt3 className='h-6 w-6 font-bold' />
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menu}
                </ul>
            </div>



        </div>
    );
};

export default Navbar;
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation()

    if (loading) {
        return <p className='text-red-700 w-52 mx-auto min-h-[80vh] text-center'>Loading</p>
    }




    if (user && user.uid) {
        return children;
    }
    else {
        return (
            <Navigate to="/signIn" state={{from: location}} replace></Navigate>
        );
    };
};

export default PrivateRoute;
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../Context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInError, setSignInError] = useState('');
    const { userSignIn, continueWithProvider, loading, setLoading } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathName || '/';


    if (loading) {
        return <p className='text-red-700 w-52 mx-auto min-h-[80vh] text-center'>Loading</p>
    }


    const handleSignUp = data => {
        userSignIn(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user);
                setSignInError('')
                navigate(from, { replace: true })

            })
            .catch(error => {
                setSignInError(error.message)
                setLoading(false)

            })
    }


    const handleGoogleBtn = () => {
        continueWithProvider(googleProvider)
            .then(res => {
                const user = res;
                console.log(user);
                navigate(from, { replace: true })

            })
            .catch(error => setSignInError(error.message))
    }


    return (
        <>
            <h1 className='text-4xl font-bold text-center my-10'>Sign In</h1>
            <h2 className='mx-auto text-xl w-[40vw] text-center bg-green-600 text-white p-2'>To see dashboard & add task please sign in first</h2>
            <div className='flex justify-center items-center mb-20 p-4 '>

                <div className='card shadow-xl w-[95%] md:w-4/12 p-7 bg-gradient-to-r from-blue-50'>

                    <form onSubmit={handleSubmit(handleSignUp)}>

                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input type="email" className="w-full my-3 input input-bordered"  {...register("email", { required: "Email is required" })} />

                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}



                        <label>
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input type="password" className="w-full my-3 input input-bordered"  {...register("password",
                            {
                                required: "Password is required"
                            })} />

                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                        <small className='text-red-600'>{signInError}</small>



                        <div className="flex flex-col w-full border-opacity-50">

                            <button className="w-full my-3 btn bg-info text-white hover:bg-[#2374d6]" type="submit">Sign In</button>
                            <small>New here? <Link to="/signUp" className='text-primary'>Sign Up</Link></small>

                            <div className="divider">OR</div>

                            <button onClick={handleGoogleBtn} className="w-full my-3 btn btn-outline btn-info" type="submit"><FaGoogle className='mr-2' /> <span>CONTINUE WITH GOOGLE</span></button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default SignIn;
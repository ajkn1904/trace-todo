import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUpError] = useState('');



    const handleSignUp = () => [
        console.log('sign up please')
    ]

    const handleGoogleBtn = () => {
        console.log('google');
    }


    return (
        <>
            <h1 className='text-4xl font-bold text-center my-10'>Sign up</h1>
            <h2 className='mx-auto text-xl w-[40vw] text-center bg-green-600 text-white p-2'>To add task please Sign Up first</h2>
            <div className='flex justify-center items-center mb-20 p-4 '>

                <div className='card shadow-xl w-[95%] md:w-4/12 p-7 bg-gradient-to-r from-blue-50'>

                    <form onSubmit={handleSubmit(handleSignUp)}>

                        <label className="label">
                            <span className="label-text text-lg">Name</span>
                        </label>
                        <input type="text" className="w-full my-3 input input-bordered"  {...register("name")} />




                        <label className="label">
                            <span className="label-text text-lg">Email</span>
                        </label>
                        <input type="email" className="w-full my-3 input input-bordered"  {...register("email", { required: "Email is required" })} />

                        {errors.email && <p className='text-error'>{errors.email?.message}</p>}



                        <label>
                            <span className="label-text text-lg">Password</span>
                        </label>
                        <input type="password" placeholder='Password' className="w-full my-3 input input-bordered"  {...register("password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be at least 6 character long' },

                            })} />

                        {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                        <label>
                            <span className="label-text text-lg">Re-type Password</span>
                        </label>
                        <input type="password" placeholder='Re-type Password' className="w-full my-3 input input-bordered"  {...register("confirmPassword",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be at least 6 character long' }
                            })} />

                        {errors.confirmPassword && <p className='text-error'>{errors.confirmPassword?.message}</p>}


                        <small className='text-red-600'>{signUpError}</small>



                        <div className="flex flex-col w-full border-opacity-50">

                            <button className="w-full my-3 btn bg-info text-white hover:bg-[#2374d6]" type="submit">Sign Up</button>
                            <small>Already have an account? <Link to="/signIn" className='text-primary'>Sign in</Link></small>

                            <div className="divider">OR</div>

                            <button onClick={handleGoogleBtn} className="w-full my-3 btn btn-outline btn-info" type="submit"><FaGoogle className='mr-2' /> <span>CONTINUE WITH GOOGLE</span></button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default SignUp;
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';


const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signUpError, setSignUpError] = useState('');

    const { createUser, userProfileUpdate, continueWithProvider, loading, setLoading } = useContext(AuthContext)
    const goggleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()


    if (loading) {
        return <p className='text-red-700 w-52 mx-auto min-h-[80vh] text-center'>Loading</p>
    }



    const storeUsers = (name, email) => {
        const user = {
            name,
            email
        }

        fetch('http://localhost:5000/users',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLoading(false);
                navigate('/')
            })
    }



    const handleProfile = data => {
        const userInfo = {
            displayName: data.name
        }

        userProfileUpdate(userInfo)
            .then(() => {
                setLoading(false)
                storeUsers(data.name, data.email)
            })
            .catch((error) => {
                setSignUpError(error.message)
                setLoading(false)
            })
    }



    const handleSignUp = data => {
        if (data.password !== data.confirmPassword) {
            return setSignUpError("Password didn't match. Please try again!")
        }

        setSignUpError('');
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user);
                toast.success("SighUo Successful");
                handleProfile(data)
            })
            .catch(error => {
                setSignUpError(error.message);
                setLoading(false)
            })
    }



    const handleGoogleBtn = () => {
        continueWithProvider(goggleProvider)
            .then(res => {
                const user = res.user
                toast.success("Sign up successful")
                setLoading(false)
                storeUsers(user.displayName, user.email)
            })
            .catch(error => {
                setSignUpError(error.message)
                setLoading(false)
            })
    }


    return (
        <>
            <h1 className='text-4xl font-bold text-center my-10'>Sign up</h1>
            <h2 className='mx-auto text-xl w-[40vw] text-center bg-green-600 text-white p-2'>To see dashboard & add task please sign up first</h2>
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
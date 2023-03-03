import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { BiSend } from 'react-icons/bi'
import { toast } from 'react-hot-toast';

const Home = () => {

    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate()
    const [processing, setProcessing] = useState(false)
    const date = new Date()


    const handleTask = data => {
        const task = {
            taskName: data.taskName,
            userName: user.displayName,
            email: user.email,
            date: date.toDateString()
        }
        fetch('http://localhost:5000/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Task added')
                setProcessing(false)
                navigate('/dashboard')
            })
    }

    return (
        <div className='min-h-[90vh] flex flex-col items-center md:flex-row-reverse'>

            <img className="w-full rounded-t-lg h-96 md:w-[50%] md:rounded-none md:rounded-l-lg" src="https://i.ibb.co/jDTZxCd/checklist-01-removebg-preview.png" alt="" />


            <div className="flex flex-col justify-between p-4 leading-normal mx-auto">
                <h5 className="mb-2 text-2xl font-bold">Manage Your Task</h5>
                <form onSubmit={handleSubmit(handleTask)} className='flex justify-between items-center gap-2'>

                    <label className="label">
                        <span className="label-text">TODO</span>
                    </label>


                    <div>
                        <input type="text" className="border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder='Add Task' {...register("taskName", {
                            required: 'taskName is required'
                        })} />
                    </div>

                    {
                        user?.uid ?
                            <button type="submit" disabled={processing} className='hover:text-blue-700'>
                                <BiSend className='w-5 h-5' />
                            </button>
                            :
                            <Link to='/signIn' className='text-center text-xl font-medium'>To add task <span className='text-blue-600 hover:underline'>sign in</span> First</Link>

                    }

                </form>
                {errors.taskName && <small className='text-red-500'>{errors.taskName?.message}</small>}
            </div>

        </div>
    );
};

export default Home;
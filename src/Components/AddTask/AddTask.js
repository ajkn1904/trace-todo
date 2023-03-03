import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiSend } from 'react-icons/bi';

const AddTask = () => {
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
        <div className="flex flex-col items-center p-4 leading-normal mx-auto">
            <h5 className="mb-4 text-2xl font-bold">Manage Your Task</h5>
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
    );
};

export default AddTask;
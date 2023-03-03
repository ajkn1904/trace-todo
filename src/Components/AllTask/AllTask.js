import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';

const AllTask = ({ data }) => {
    const { user } = useContext(AuthContext)
    return (
        <div className='w-[85vw] mx-auto'>
            <h2 className='text-2xl font-bold text-center mb-8'>All Tasks</h2>
            {user?.uid && data &&
                data.map(taskList => <div key={taskList._id}>
                    <div className='flex justify-between items-center gap-2 my-2 border w-full lg:w-[80%] p-5 mx-auto'>
                        <li>{taskList.taskName} </li>
                        <div>
                            <button className='btn btn-xs bg-blue-200 text-black hover:btn-info mr-3'>
                                edit
                            </button>
                            <button className='btn btn-xs bg-green-200 text-black hover:btn-success mr-3'>
                                complete
                            </button>
                            <button className='btn btn-xs bg-red-200 text-black hover:btn-error'>
                                delete
                            </button>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default AllTask;
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { toast } from 'react-hot-toast';

const AllTask = ({ data, refetch, isLoading }) => {
    const { user } = useContext(AuthContext);

    if (isLoading) {
        return <p className='text-red-700 w-52 mx-auto min-h-[80vh] text-center'>Loading</p>
    }


    const isTaskComplete = (url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    refetch();
                    console.log(result)
                }
            })
    }

    const handleComplete = (id) => {
        const url = `http://localhost:5000/task/complete/${id}`
        isTaskComplete(url);
    }

    const handleUncompleted = (id) => {
        const url = `http://localhost:5000/task/notComplete/${id}`
        isTaskComplete(url);
    }



    const handleDelete = id => {
        const doDelete = window.confirm('Do you want to delete this task?');
        if (doDelete) {
            fetch(`http://localhost:5000/task/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount === 1) {
                        toast.error("Deleted Successfully")
                        refetch()
                    }
                })
        }
    }



    return (
        <div className='w-[85vw] mx-auto'>
            <h2 className='text-2xl font-bold text-center mb-8'>All Tasks</h2>
            {user?.uid && data &&
                data.map(taskList => <div key={taskList._id}>
                    <div className='flex justify-between items-center gap-2 my-2 border w-full lg:w-[80%] p-5 mx-auto'>
                        <li className={`${(taskList.isCompleted) ? 'line-through' : ''}`}>{taskList.taskName} </li>
                        <div>
                            <button className='btn btn-xs bg-blue-200 text-black hover:btn-info mr-3'>
                                edit
                            </button>

                            {taskList.isCompleted ?

                                <button className='btn btn-xs bg-green-200 text-black hover:btn-success mr-3' onClick={() => handleUncompleted(taskList._id)}>
                                    Uncompleted
                                </button>
                                :
                                <button className='btn btn-xs bg-green-200 text-black hover:btn-success mr-3' onClick={() => handleComplete(taskList._id)}>
                                    complete
                                </button>
                            }

                            <button className='btn btn-xs bg-red-200 text-black hover:btn-error' onClick={() => handleDelete(taskList._id)}>
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
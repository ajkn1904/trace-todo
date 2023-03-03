import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { BiSend } from 'react-icons/bi'
import { toast } from 'react-hot-toast';
import AddTask from '../AddTask/AddTask';

const Home = () => {



    return (
        <div className='min-h-[90vh] flex flex-col items-center md:flex-row-reverse'>

            <img className="w-full rounded-t-lg h-96 md:w-[50%] md:rounded-none md:rounded-l-lg" src="https://i.ibb.co/jDTZxCd/checklist-01-removebg-preview.png" alt="" />


            <AddTask />

        </div>
    );
};

export default Home;
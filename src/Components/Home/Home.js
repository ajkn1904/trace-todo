import React from 'react';
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
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider';
import Statistics from '../Statistics/Statistics';
import AllTask from '../AllTask/AllTask';
import AddTask from '../AddTask/AddTask';

const Dashboard = () => {

  const { user } = useContext(AuthContext)

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/task?email=${user?.email}`)
      const data = res.json()
      return data
    }
  })

  console.log(data)

  return (
    <div>
      <Statistics />
      
      
      <div className='w-[50%] md:w-[35%] lg:w-[20%] mx-auto my-16'>
        <AddTask refetch={refetch}/>
      </div>

      <AllTask data={data} refetch={refetch}/>
    </div>
  );
};

export default Dashboard;
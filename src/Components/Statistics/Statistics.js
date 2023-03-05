import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Statistics = ({ data }) => {

    return (
        <ResponsiveContainer height={450}>
            <div style={{ width: '100%' }} >
                <AreaChart width={450} height={360} data={data}
                    margin={{
                        top: 50, right: 0, left: 0, bottom:-10,
                    }}
                    className='w-[95%] mx-auto mt-16'
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <Area type="monotone" dataKey="date" stroke="#8884d8" fill="#8884d8" />
                    <XAxis />
                    <YAxis dataKey='data.length' />
                    <Legend />
                    <Tooltip></Tooltip>
                </AreaChart>

            </div>
        </ResponsiveContainer>
    );
}

export default Statistics;
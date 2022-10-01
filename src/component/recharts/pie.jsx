import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer ,Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const CustomTooltip = ({ active, payload, label  }) => {
  if (active) {
     return (
     <div
        className="custom-tooltip"
        style={{
           backgroundColor: "#ffff",
           padding: "5px",
           border: "1px solid #cccc"
        }}
     >
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
     </div>
  );
}
return null;
}
const ChartPie =()=> {
 
 
    return (
      
        <div className='w-full h-96  shadow-2xl bg-white   p-2 rounded-md'>
        <p className="text-2xl font-bold text-violet-600 text-center">Stak</p>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
            <Tooltip content={<CustomTooltip />} />
           
          
      <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      </div>
    );
  }

export default ChartPie;
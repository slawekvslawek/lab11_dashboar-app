import React from 'react';
import { useEffect, useState } from "react";

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);


export const options = {
   responsive: true,
   plugins: {
       legend: {
           position: 'top',
       }
   },
};

export default function LineChart(props) {


   if (!props.data) {
         return null;
     }

     return(
         <div className="radius-box">
            <Line options={options} data={props.data}/>
         </div>
     )
}

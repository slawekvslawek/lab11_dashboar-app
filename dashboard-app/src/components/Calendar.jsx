import React, { useState } from 'react';
import Calendar from 'react-calendar';

export function MyCalendar(props) {
   const [value, onChange] = useState(new Date());


   const getFullDate = () => {
       return value.getDate() + ' ' + (value.getMonth() + 1) + ' ' + value.getFullYear();
   }

   const setDate = (value) => {

   onChange(value);
   const currentDate = new Date(value);
   const month = currentDate.getMonth() + 1;
   const toSend = currentDate.getFullYear() + '-' + (month.toString().length === 1 ? "0" + month : month) + '-' + currentDate.getDate();
   props.getData(toSend)
}


   return (
       <div className="radius-box">
           <Calendar
               onChange={setDate}
               value={value}
           />
           <div>
               Chosen date: {getFullDate()}
               <button type="button" className="btn btn-secondary" onClick={() => {props.getAllData();
                }}>
                Reset
               </button>
           </div>
       </div>
   );
}




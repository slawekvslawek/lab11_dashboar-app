import React, {useState, useEffect} from "react";
import LineChart from "./LineChart";
import {Data} from "./Data";
import {MyCalendar} from "./Calendar";
import io from "socket.io-client";
import 'react-calendar/dist/Calendar.css';

const styles = {
   display: 'flex',
   justifyContent: 'space-between',
   backgroundColor: "#888888"
};

export function Dashboard() {

   const [response, setResponse] = useState({});
   const [tempHumData, tempHumDataSet] = useState(null);
   const [pressData, pressDataSet] = useState(null);
   const [currentData, currentDataSet] = useState(null);

   const getDataOnDate = async (date) => {
          const res = await fetch("http://localhost:3001/api/params/search/" + date)
          const dataRes = await res.json();
          setDatasets(dataRes);

      }

   const getAllData = async () => {
        const res = await fetch("http://localhost:3001/api/params")
        const dataRes = await res.json();
        setDatasets(dataRes);
      }


   const setDatasets = (dataRes) => {
       let tempHum = {
           labels: [],
           datasets: [
               {
                   label: 'Temperature',
                   data: [],
                   borderColor: 'rgb(255, 99, 132)',
                   backgroundColor: 'rgba(255, 99, 132, 0.5)',
               },
               {
                   label: 'Humidity',
                   data: [],
                   borderColor: 'rgb(31,52,217)',
                   backgroundColor: 'rgba(31,52,217, 0.5)',
               }
           ],
       };

       let press = {
           labels: [],
           datasets: [
               {
                   label: 'Pressure',
                   data: [],
                   borderColor: 'rgb(95,220,61)',
                   backgroundColor: 'rgba(95,220,61, 0.5)',
               }
           ],
       };

       tempHum.datasets[0].data = dataRes.map(item => {
           return item.temp;
       })

       tempHum.datasets[1].data = dataRes.map(item => {
           return item.humidity;
       })

       press.datasets[0].data = dataRes.map(item => {
           return item.pressure;
       })

       tempHum.labels = press.labels = dataRes.map(item => {
           return item.date;
       })

       tempHumDataSet(tempHum);
       pressDataSet(press);
   }


   useEffect(() => {

        const socket = io("http://localhost:3001", {
           transports: ['websocket', 'polling', 'flashsocket'],
           });
           socket.on("currentState", data => {
               currentDataSet(data.data);
           });

       const fetchAir = async () => {


           const res = await fetch("http://localhost:3001/api/params")
           const dataRes = await res.json();


           const currentRes = await fetch("http://localhost:3001/api/params/last")
           const currentDataRes = await currentRes.json();

           currentDataSet(currentDataRes);

           setDatasets(dataRes);

       }
       fetchAir();

   }, []);

    if (!tempHumData && !pressData && !currentData) {
           return null;
       }


   return (
       <div style={styles}>
           <div className="col-3">
               <Data data={currentData}/>
               <MyCalendar getData={getDataOnDate} getAllData={getAllData}/>
           </div>
           <div className="col-9">
               <LineChart  title="Temperature & Humidity" data={tempHumData} />
               <LineChart  title="Pressure" data={pressData}/>
           </div>
       </div>
   );
}


import React from 'react';

const styles = {

   float: 'left',
   width: '410px',
   position: 'relative',
   zIndex: '99',
};

export function Data(props) {

   if (!props.data) {
       return null;
   }

   return (<div className="radius-box">
       <div className="row">
           <div className="radius" style={styles}>
               <h6>Current state:</h6>
               Temp {props.data.temp} &#x2103; <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{'width': props.data.temp / 60 * 100 + '%' }} aria-valuenow={props.data.temp / 60 * 100}
                              aria-valuemin="0" aria-valuemax="50"></div>
               </div>
               Humidity {props.data.humidity}%
               <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" style={{'width': props.data.humidity + '%'}} aria-valuenow={props.data.humidity}
                                  aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               Pressure {props.data.pressure} hPa
               <div className="progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{'width': props.data.pressure / 1400 * 100 + '%'}} aria-valuenow={props.data.pressure}
                                  aria-valuemin="0" aria-valuemax="1400"></div>
               </div>

           </div>
       </div>
   </div>);
}


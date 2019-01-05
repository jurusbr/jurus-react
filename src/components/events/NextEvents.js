import React from "react";
import "./NextEvents.css"

const NextEvents =  (props) => {

     
   return (
    <div className="next-events" >
        <h3>indicadores atuais</h3>
        <table >
        <tbody> 
              <tr>
                <td>Inflaçao</td>
                <td>6,2%</td>
              </tr>
              <tr>
                <td>Jurus (Selic)</td>
                <td>6,5%</td>
              </tr>
              <tr>
                <td>CDI</td>
                <td>6,4%</td>
              </tr>
              </tbody> 
         </table>
        
    </div>
    );
    
   }

export default NextEvents;

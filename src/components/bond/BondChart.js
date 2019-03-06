import React, { Component } from "react";

import  {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import "./BondChart.css";

class BondChart extends Component {



    componentWillMount() {

        const data = [
          {name: '2020', uv: 40, pv: 24, amt: 24},
          {name: '2021', uv: 30, pv: 13, amt: 22},
          {name: 'Page C', uv: 20, pv: 98, amt: 22},
          {name: 'Page D', uv: 27, pv: 39, amt: 20},
          {name: 'Page E', uv: 18, pv: 48, amt: 21},
          {name: 'Page F', uv: 23, pv: 38, amt: 25},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
          {name: 'Page G', uv: 34, pv: 43, amt: 21},
    ];
  
          this.setState({
            data:data
          });
          
        }

   

    render() {

        return (            
            <div className="bond-chart-container" >
            <ResponsiveContainer width='100%' height='100%' >
               <LineChart  data={this.state.data}>
                      <XAxis stroke="white" dataKey="name"/>
                      <YAxis axisLine={false} stroke="white"/>
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    </LineChart>
                    </ResponsiveContainer >
            </div>
        );

    }

}

export default BondChart;

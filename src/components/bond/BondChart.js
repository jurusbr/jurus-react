import React, { Component } from "react";

import  {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import "./BondChart.css";

class BondChart extends Component {

    constructor(props) {
		super(props);
	}
    componentWillMount() {

        /*const data = [
          {date: '2020', cdi: 40, pv: 24, amt: 24},
          {date: '2021', cdi: 30, pv: 13, amt: 22},
          {date: 'Page C', cdi: 20, pv: 98, amt: 22},
          {date: 'Page D', cdi: 27, pv: 39, amt: 20},
          {date: 'Page E', cdi: 18, pv: 48, amt: 21},
          {date: 'Page F', cdi: 23, pv: 38, amt: 25},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
          {date: 'Page G', cdi: 34, pv: 43, amt: 21},
    ];*/

    let data = this.props.curve;
  
          this.setState({
            data:data
          });
          
        }

        componentWillReceiveProps(nextProps) {

            console.log(nextProps);

            let data = nextProps.curve;
            this.setState({
                data:data
              });
        }

   

    render() {

        return (            
            <div className="bond-chart-container" >
            <ResponsiveContainer width='100%' height='100%' >
               <LineChart  data={this.state.data}>
                      <XAxis stroke="white" dataKey="maturity"/>
                      <YAxis axisLine={false} stroke="white"/>
                      <Line type="monotone" dataKey="cdi" stroke="#8884d8" />
                      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    </LineChart>
                    </ResponsiveContainer >
            </div>
        );

    }

}

export default BondChart;

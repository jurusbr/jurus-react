import React, { Component } from "react";

import  {LineChart, Line, XAxis, YAxis,  ResponsiveContainer, Tooltip, Legend} from 'recharts';
import "./BondChart.css";

class BondChart extends Component {

    componentWillMount() {


    let data = this.props.curve;
    let index = this.props.index;
  
          this.setState({
            data:data,
            index:index
          });
          
        }

        componentWillReceiveProps(nextProps) {

            console.log(nextProps);

            let data = nextProps.curve;
            let index = this.props.index;
            this.setState({
                data:data,
                index:index
              });
        }

   

    render() {

        const CustomTooltip = ({ active, payload, label }) => {
            if (active) {
              return (
                <div className="custom-tooltip">
                  <p className="chart-main-line">{`${payload[0].value.toFixed(2)} %`}</p>
                  <p className="chart-second-line">{`${payload[1].value.toFixed(2)} %`}</p>
                </div>
              );
            }
          
            return null;
          };

          console.log(this.state.data);

        let indexLabel = "";
        if (this.state.index==="CDI"){
            indexLabel = "juros futuro (di)"
        }else if (this.state.index==="IPCA"){
            indexLabel = "IPCA futuro"
        }
          

        return (            
            <div className="bond-chart-container" >
            <ResponsiveContainer width='100%' height='100%' >
               <LineChart  data={this.state.data}>
                      <XAxis stroke="white" dataKey="date"/>
                      <YAxis axisLine={false} stroke="white"/>
                      <Line type="monotone" dataKey="rate" name="investimento" stroke="yellow" />
                      <Line type="monotone" dataKey="index" name={indexLabel} stroke="#ffffff" strokeDasharray="5 5" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </LineChart>
                    </ResponsiveContainer >
            </div>
        );

    }

}

export default BondChart;

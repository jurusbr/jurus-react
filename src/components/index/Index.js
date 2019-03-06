import React,  { Component } from "react";
import  {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import "./index.css";
import Api from './../../Api';
import moment from 'moment'


class Index extends Component {

    componentWillMount() {

        const data = [
            {date: '2020',   cdi: 24},
            {date: '2021',   cdi: 13},
            {date: 'Page C', cdi: 98},
            {date: 'Page D', cdi: 39},
            {date: 'Page E', cdi: 48},
            {date: 'Page F', cdi: 38},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
            {date: 'Page G', cdi: 43},
      ];

      this.setState(data);

      let api = new Api();
    
        api.loadCDIHistorical( (resp) => {

          console.log(resp);
          this.setState({
            data: resp.historical
          });
        });


    }

    formatXAxis(tickItem) {
    return moment(tickItem).format('YYYY')
    }


    render() {

     
   return (
    <div className="index-container">
        <div className='nav-index'>
          <div className="activate">CDI</div>
        </div>
        <div className="map">
        <ResponsiveContainer width='100%' height='100%' >
               <LineChart  data={this.state.data}>
                      <XAxis dataKey="date" tickFormatter={this.formatXAxis}/>
                      <YAxis axisLine={false} tickFormatter={ (tick) =>  tick+"%"}/>
                      <Line type="monotone" dataKey="cdi"  />
                      <Tooltip formatter={(value) => (Math.round(value * 100)/100)+"%"} labelFormatter={(label) =>  moment(label).format('MM/YYYY')}/>
                    </LineChart>
        </ResponsiveContainer >
        </div>
        <h3 >API</h3>
        <p className="api"><span className="apii">API</span>http://api.jurus.com.br/indice/cdi?date=ddmmyyyyy</p>
    </div>
    );
    
   }

}

export default Index;

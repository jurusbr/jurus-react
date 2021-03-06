import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./PostLineChart.css"

const formatYAxis = (tickItem) => {
    return tickItem + "%";
  }

const PostClickable =  (props) => {
    let series;

    if (props.series) {
      series = props.series.map( (serie,i) => {
        return (
          <Line key={i} type="monotone" dataKey={serie.nome} stroke={serie.color} />
        );
      });
    }

    return (
      <div className="post-linechart">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={props.data}>
            {series}
            <Legend verticalAlign="top" wrapperStyle={{ color: "white" }} />
            <Tooltip />
            <XAxis dataKey="name" stroke="white" />
            <YAxis tickFormatter={formatYAxis} stroke="white" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  export default PostClickable;
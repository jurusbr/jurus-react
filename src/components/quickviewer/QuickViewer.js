import React from "react";
import "./QuickViewer.css";

const QuickViewer =  (props) => {

    let data = props.data;
    let assets = props.data.assets.map( (a,i) => {
        return (
            <div key={i} className="recommend" id="recommend3">
            <h4>{a.tipo}</h4>
            <h5>{a.texto}</h5>
        </div>);
    });

     
   return (
    <div className="quickviwer">
        <h4 className="recommend-title">Melhores <strong>{data.type}</strong> hoje</h4>
        <div className="list-recommend">
            {assets}
        </div>
    </div>
    );
    
   }

export default QuickViewer;

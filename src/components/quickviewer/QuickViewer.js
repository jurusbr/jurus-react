import React, { Component } from "react";
import "./QuickViewer.css";
import Viewer from "./Viewer";

const QuickViewer =  (props) => {

    let data = props.data;
    let assets = props.data.assets.map(a => {
        return (
            <div class="recommend" id="recommend3">
            <h4>{a.tipo}</h4>
            <h5>{a.texto}</h5>
        </div>);
    });

     
   return (
    <div className="quickviwer">
        <h4 class="recommend-title">Melhores <strong>{data.type}</strong> hoje</h4>
        <div class="list-recommend">
            {assets}
        </div>
    </div>
    );
    
   }

export default QuickViewer;

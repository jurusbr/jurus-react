import React, { Component } from "react";
import "./Waiting.css";

const Waiting =  (props) => (
      <div className="timeline">
        <div>
            <img class="photo" src="ir.png" width="45"/>
            <h5>Carregando... :)</h5>
        </div>
      </div>
    );

export default Waiting;

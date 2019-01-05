import React, { Component } from "react";
import "./BondCartoon.css";

class BondCartoon extends Component {

    componentWillMount() {

        this.setState({
          img: this.props.img,
          text: this.props.text
        });
        
      }

   

    render() {

        return (            
            <div className="bond-cartoon">
              <div className="bond-cartoon-img"><img alt="foto" className="photo" src={this.state.img} width={50} /></div>
              <div className="bond-cartoon-text">{this.state.text}</div>
            </div>
        );

    }

}

export default BondCartoon;

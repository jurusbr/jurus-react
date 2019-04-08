import React, { Component } from "react";
import "./Bond.css";
import "./Bonds.css";
import BondChart from './BondChart';

class Bond extends Component {

      constructor(props) {
        super(props);
        this.handleBondClick = this.handleBondClick.bind(this);
      }

    componentWillMount() {

      const data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
  ];

        this.setState({
          bond: this.props.bond,
          status:"bond-close",
          data:data
        });

        /*let api = new Api();
    
        let id = this.props.match.params.bond;
        api.loadBond(id, (resp) => {

          console.log(resp);
          this.setState({
            bond: resp.bond
          });
        });*/
        
      }

      handleBondClick(d) {

        let _this = this;

        if(this.state.status==="bond-close" ){
          this.setState({
            status:"bond-opening"
          });


          setTimeout( function(){ 
            _this.setState({
                status:"bond-opened"
              });
            }, 
           100);
        }else if(this.state.status==="bond-opened" ){

          this.setState({
            status:"bond-opening"
          });


          setTimeout( function(){ 
            _this.setState({
                status:"bond-close"
              });
            }, 
            100);
        }
        
      }

    render() {

        let Chart = this.state.status==='bond-opened' ? <BondChart /> : null;

        return (            
            <div>
              <div className="bond-line" onClick={(e) => this.handleBondClick(e)}> 
                <div>{this.state.bond.category}</div> 
                <div>{this.state.bond.issuer} </div> 
                <div className="text-success">{this.state.bond.interest}% cdi</div> 
                <div>{this.state.bond.maturity} </div>
              </div>
              <div className={"bond-detail " + this.state.status}>

                
                <div className="center bond">
                  <div className="bond-chart">

                    {Chart}

                  </div>
                  <div className="bond-cartoons">
                    <div className="bond-msg">
                       <p>O rendimento inicial <br/>9,31%<br/> ao ano porém
com a possível subida dos juros  (linha cinza), o rendimento
médio deste investimento irá subir e deve ser de 12,5% ao ano (linha branca).</p>
                    </div>
                  </div>
                    </div>
              </div>
            </div>
        );

    }

}

export default Bond;

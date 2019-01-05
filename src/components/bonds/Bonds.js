import React, { Component } from "react";
import "./Bonds.css";
import Api from './../../Api';
import Bond from "./Bond"
//import queryString from 'query-string';

class Bonds extends Component {


    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleBondClick = this.handleBondClick.bind(this);
    }

    componentWillMount() {

        this.setState({
          bonds: [],
          openId:{dealer:"---"}
        });
    
        let api = new Api();
    
        let category = this.props.match.params.category;
        api.loadBonds(category, (resp) => {

          console.log(resp.bonds);

          let dealers = this.extractDealers(resp.bonds);
          let sorted = this.sortDealers(dealers);       

          this.setState({
            bonds: sorted
          });
        });
        
      }

    extractDealers(bonds) {
      let dealers = {};
      for(let i = 0, l = bonds.length; i < l; ++i){

       let bond = bonds[i];

          if(!dealers.hasOwnProperty(bond.dealer)) {

            dealers[bond.dealer] = {dealer:bond.dealer, interest:bond.interest, bonds : [bond]};

          }else{
              let dealer = dealers[bond.dealer];
              if(dealer.interest < bond.interest){
                dealer.interest = bond.interest;
              }
              dealer.bonds.push(bond);

          }
      }
      return dealers;
    }

    sortDealers(dealers){
      let sorted = [];
      for(let key in dealers) {
          sorted.push({dealer:dealers[key].dealer, interest:dealers[key].interest, issuer:dealers[key].issuer, bonds:dealers[key].bonds });
      }
      sorted.sort((a,b) => (a.interest > b.interest) ? -1 : ((b.interest > a.interest) ? 1 : 0)); 
      return sorted;
    }

    handleClick(d) {

      if(this.state.openId.dealer===d.dealer){        
        this.setState({openId:{dealer:''}})
      }else{
        this.setState({openId:d})
      }
      
    }

    handleBondClick(d) {

      console.log(d);
      this.props.history.push('/bond/'+d._id)
      
    }


    /*render() {

        let bonds = this.state.bonds.map((d, index) => {

          let classname = " card hover animated card-bond-container ";
          classname += d.dealer===this.state.openId.dealer ? "card-bond-container-open":"card-bond-container-close";
          

          d.bonds.sort((a,b) => (a.interest > b.interest) ? -1 : ((b.interest > a.interest) ? 1 : 0)); 

          let bs = d.bonds.map( (b) => {
            return ( <div>
                        <div className="bond-line" onClick={(e) => this.handleBondClick(b, e)}> 
                          <div>{b.category} </div> 
                          <div>{b.issuer} </div> 
                          <div className="text-success">{b.interest}% cdi</div> 
                          <div>{b.maturity} </div>
                        </div>
                        <div>xxxx</div>
                      </div> )
          } ).slice(0, 10)

          return (
                    <div className={classname} onClick={(e) => this.handleClick(d, e)}>
                      <div id={index} className="bond-header"> 
                          <div> {d.dealer} <span className="bond-header-interest text-warning">{d.interest}% cdi</span></div>
                      </div>
                      <div>
                        {bs}
                      </div>
                    </div>
                  )
          });


   return (
    <div className="center offset-header dealers">
       {bonds}
    </div>
    );
    
   }*/

   render() {

      let bonds = this.state.bonds.map((d, index) => {

        let classname = " card hover animated card-bond-container ";
        classname += d.dealer===this.state.openId.dealer ? "card-bond-container-open":"card-bond-container-close";
        

        d.bonds.sort((a,b) => (a.interest > b.interest) ? -1 : ((b.interest > a.interest) ? 1 : 0)); 

        let bs = d.bonds.map( (b) => {
          return ( <Bond bond={b}/> )
        } ).slice(0, 10)

        return (
                  <div className={classname} >
                    <div id={index} className="bond-header" onClick={(e) => this.handleClick(d, e)}> 
                        <div> {d.dealer} <span className="bond-header-interest text-warning">{d.interest}% cdi</span></div>
                    </div>
                    <div  >
                      {bs}
                    </div>
                  </div>
                )
        });


  return (
  <div className="center offset-header dealers">
    {bonds}
  </div>
  );

  }

}

export default Bonds;

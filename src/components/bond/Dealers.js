import React, { Component } from "react";
import "./Dealers.css"
import Api from './../../Api'
import DealerBonds from "./DealerBonds"

class Dealers extends Component {

    constructor(props) {
        super(props);
        this.handleDealerClick = this.handleDealerClick.bind(this);
        this.handleCloseDealerBonds = this.handleCloseDealerBonds.bind(this);
      }


    componentWillMount() {

        this.setState({
            maturity: this.props.maturity,
            dealers:[],
            selectedDealer:null,
            selectedDealerRate:null,
            transiction:false,
            selectedY:0,
            selectedX:0
        });

        this._loadData(this.props.maturity);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            maturity: newProps.maturity,
            dealers:[],
            selectedDealer:null,
            selectedDealerRate:null,
            transiction:false,
            selectedY:0,
            selectedX:0
        });

        this._loadData(newProps.maturity);
    }

    _loadData(maturity){
        let api = new Api();    
        api.loadDealersRateByMaturity(maturity,(dealersRate) => {
          this.setState({
            dealers: dealersRate
          });
        });

    }



    handleDealerClick(dealer, rate) {

        let y  =(document.getElementById(dealer).getBoundingClientRect().y);
        let x  =(document.getElementById(dealer).getBoundingClientRect().x);

        if(this.state.selectedDealer===dealer){


            this.setState({
                transiction:true
              });

              setTimeout( () => 
                this.setState({
                    selectedDealer: null,
                    selectedDealerRate:null,
                    transiction:false,
                    selectedY:0,
                    selectedX:0,
                  }),5000); 
        }else{

            document.getElementsByTagName("body")[0].style.overflowY = "hidden";
            
            this.setState({
                selectedDealer: dealer,
                selectedDealerRate:rate,
                transiction:true,
                selectedY:y,
                selectedX:x,
              });

            setTimeout( () => 
                this.setState({
                    transiction:false
                  }),50);            
        }

        
    }

    handleCloseDealerBonds() {


        document.getElementsByTagName("body")[0].style.overflowY = "auto";

        this.setState({
            transiction:true
          });

          setTimeout( () => 
            this.setState({
                selectedDealer: null,
                selectedDealerRate:null,
                transiction:false,
                selectedY:0,
                selectedX:0,
              }),500); 
    }

    _renderDealers(dealers){
        
        let rateDealers = dealers.map(r => {
            let wrapper =<div id={r.dealer} onClick={(e) => this.handleDealerClick(r.dealer, r.bestRate)} className="dealers__dealer">
                                 <h1>{r.dealer}</h1>
                                 <p>{r.bestRate}% CDI</p>
                        </div>;

            return wrapper; 
        });

        rateDealers =   <div className="dealers__container">
                            {rateDealers}
                        </div>

        return rateDealers;

    }

    _renderPopUp(assets){

        let style = null;
        let fix = null;
        let cssnames = "dealers__dealer ";
        let listAssets = null;
        let btnClose = null;
        if (this.state.selectedDealer) {   
            
            if (this.state.transiction) {
                style = {
                    top: this.state.selectedY + 'px',
                    left: this.state.selectedX + 'px'
                };
                cssnames += "dealers__dealer--transaction";
                listAssets = null;  
                btnClose = null;
            }else{
                style = {
                    left: '0vw',
                    top: '0vh',
                };
                cssnames += "dealers__dealer--selected";
                listAssets = assets;
                btnClose = <div className="btn-close hover" onClick={(e) => this.handleCloseDealerBonds()}>x</div>;
            }

            fix = <div className={cssnames} style={style} >
                    {btnClose}
                    <h1>{this.state.selectedDealer}</h1>
                    {listAssets}
                  </div>

        } 

        return fix;

    }

    render() {
       

        let dealersView = this._renderDealers(this.state.dealers);

        let assets = this.state.selectedDealer ? <DealerBonds maturity={this.state.maturity} dealer={this.state.selectedDealer} onClose={this.handleCloseDealerBonds}/> : null;
        let block = this._renderPopUp(assets);

        return (
            <div>
                <div className="dealers">
                    {dealersView}
                </div>

                {block}
            </div>

        );

    }

}

export default Dealers;

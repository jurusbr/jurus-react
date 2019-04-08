import React, { Component } from "react";
import "./DealerBonds.css"
import BondLine from './BondLine';
import Api from './../../Api'

class DealerBonds extends Component {

    constructor(props) {
        super(props);
        this.handleDealerClose = this.handleDealerClose.bind(this);
      }


    componentWillMount() {

        this.setState({
            maturity: this.props.maturity,
            dealer:this.props.dealer,
            blockscreen: false,
            bonds:[]
        });

        this._loadData(this.props.maturity, this.props.dealer);

    }

    componentWillReceiveProps(newProps) {

        this.setState({
            maturity: newProps.maturity,
            dealer:newProps.dealer,
            blockscreen: false,
            bonds:[]
        });

        this._loadData(newProps.maturity, newProps.dealer);

    }

    _loadData(maturity, dealer){
        let api = new Api();    
        api.loadBondsDealer( maturity,dealer, (bonds) => {
          this.setState({
            bonds: bonds
          });
        });

    }

    handleDealerClose() {
        this.props.onClose();
    }


    render() {


        let bonds = this.state.bonds.map( (b, i) => {
            return <BondLine key={i} bond={b}/>
        });


        return (
                <div className="dealers-bond-container">
                    {bonds}            
                </div>

        );

    }

}

export default DealerBonds;

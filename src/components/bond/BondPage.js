import React, { Component } from "react";
import "./BondPage.css"
import Dealers from './Dealers'
import Api from '../../Api';

class Bonds extends Component {

    constructor(props) {
        super(props);
        this._handleBarClick = this._handleBarClick.bind(this);
    }

    componentWillMount() {

        this.setState({
            maturities: [],
            selectedMaturity: null
        });

        this._loadData();
    }

    _loadData(){
        let api = new Api();    
        api.loadBestRatesByMaturity((data) => {
          this.setState({
            maturities: data
          });
        });
    }

    _handleBarClick(maturity) {
        if (this.state.selectedMaturity !== maturity) {
            this.setState({
                selectedMaturity: maturity
            });
        } else {
            this.setState({
                selectedMaturity: null
            });
        }
    }

    _renderBars(maturities){
        const bars = maturities.map(m => {

            const style = {
                height: m.rate + 'px',
            };

            let cssNames = "chart__frame";
            if (this.state.selectedMaturity === m.maturity) {
                cssNames += " chart__frame--active";
            }

            return <div className={cssNames} onClick={(e) => this._handleBarClick(m.maturity)}>
                        <div className="frame__rate">{m.rate}% CDI</div>
                        <div className="frame__bar hover animated" style={style}></div>
                        <div className="frame__maturity">{m.maturity}</div>
                        <div className="arrow-up"></div>
                    </div>
        });

        return bars;
    }

    render() {

        let bars =  this._renderBars(this.state.maturities);

        let dealers = this.state.selectedMaturity ? <Dealers maturity={this.state.selectedMaturity} /> : null;

        let head = <div>
                        <h1>Confira os melhores investimentos</h1>
                            <h2>por período</h2>
                            
                    </div>;

        if (this.state.selectedMaturity) {
            head = null;
        }

        return (
            <div className="bond-page center">
                {head}
                <div className="bond-page__chart">
                    {bars}
                </div>
                {dealers}

            </div>
        );

    }

}

export default Bonds;

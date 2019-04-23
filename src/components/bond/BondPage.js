import React, { Component } from 'react';
import './BondPage.css';
import Dealers from './Dealers';
import Api from '../../Api';

let classNames = require('classnames');

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


	render() {

		let loader = this._buildLoader();
        let barsChart = this._renderBars(this.state.maturities);

		return (
			<div className="bond-page center">
				<div>
                    <h2>por período</h2>
                </div>
				<div className="bond-page__chart">
					{loader}
					{barsChart}
				</div>
				{this._isAnyMaturitySelected() ? <Dealers maturity={this.state.selectedMaturity} /> : null}
			</div>
		);
    }

    _buildLoader(){
        return this._isLoading() ? <div className="chart__loading" ><img alt="loading" className="loading" src={'/loader.svg'} width={45} /> </div>: null;
    }

    _renderBars(maturities) {
		const bars = maturities.map((m, i) => {
			const style = {
				height: 2 * (m.rate - 50) + 'px'
			};
            
            let barsClass = classNames({
                'chart__frame': true,
                'chart__frame--active': this._isMaturitySelected(m.maturity)
            });

			return (
				<div className={barsClass} key={i} onClick={(e) => this._handleBarClick(m.maturity)}>
					<div className="frame__rate">{m.rate}% CDI</div>
					<div className="frame__bar" style={style} />
					<div className="frame__maturity">{m.maturity}</div>
				</div>
			);
		});

		return bars;
    }
    

	_loadData() {
		let api = new Api();
		api.loadBestRatesByMaturity((data) => {
			this.setState({
				maturities: data
			});
		});
    }
   

    _isMaturitySelected(maturity){
        return this.state.selectedMaturity === maturity;
    }
    
    _isAnyMaturitySelected(){
        return this.state.selectedMaturity;
    }

    _isLoading(){
        return this.state.maturities.length === 0;
    }

	_handleBarClick(maturity) {
		if ( this._isMaturitySelected(maturity) === false ) {
			this.setState({
				selectedMaturity: maturity
			});
		} else {
			this.setState({
				selectedMaturity: null
			});
		}
	}

	

}

export default Bonds;

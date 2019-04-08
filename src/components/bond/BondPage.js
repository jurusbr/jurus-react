import React, { Component } from 'react';
import './BondPage.css';
import Dealers from './Dealers';
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

	_loadData() {
		let api = new Api();
		api.loadBestRatesByMaturity((data) => {
			this.setState({
				maturities: data
			});
		});
    }

	render() {

		let head = (
			<div>
				<h2>por período</h2>
			</div>
        );
        
        let barsView = this._renderBars(this.state.maturities);
		let dealersView = this._isAnyMaturitySelected() ? <Dealers maturity={this.state.selectedMaturity} /> : null;

		let loader = null;
		if (this._isLoading()) {
			loader = <img alt="loading" className="loading" src={'/loader.svg'} width={45} />;
		}

		return (
			<div className="bond-page center">
				{head}
				<div className="bond-page__chart">
					{loader}
					{barsView}
				</div>
				{dealersView}
			</div>
		);
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

	_renderBars(maturities) {
		const bars = maturities.map((m, i) => {
			const style = {
				height: 2 * (m.rate - 50) + 'px'
			};

			let cssNames = 'chart__frame';
			if (this.state.selectedMaturity === m.maturity) {
				cssNames += ' chart__frame--active';
			}

			return (
				<div className={cssNames} key={i} onClick={(e) => this._handleBarClick(m.maturity)}>
					<div className="frame__rate">{m.rate}% CDI</div>
					<div className="frame__bar" style={style} />
					<div className="frame__maturity">{m.maturity}</div>
				</div>
			);
		});

		return bars;
    }

}

export default Bonds;

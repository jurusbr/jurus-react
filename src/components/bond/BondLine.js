import React, { Component } from 'react';
import './BondLine.css';
import Api from './../../Api';
import DateHelper from './../../infra/DateHelper'
import BondChart from './BondChart';
import moment from 'moment';

class BondLine extends Component {

	constructor(props) {
		super(props);
        this.handleBondClick = this.handleBondClick.bind(this);
        this.state = 
        {
            bond: {},
            status: 'bond-close',
            issuer: this.props.issuer,
            rate: this.props.rate,
            category: this.props.category,
            maturity: this.props.maturityDays,
            cdiCurve:[]
        } ;
	}
    
    _loadCDIFuturoAtMaturity(d, maturity, rate){

        let cdiFutureDate = moment(maturity).format('DD/MM/YYYY');

		console.log(cdiFutureDate);

        console.log("BondLine - load CDI Future maturity");
		let api = new Api();
		api.loadCDIFuturoAt(cdiFutureDate, (resp) => {
			var firstDate = moment(); //Create date using string-format constructor
			var secondDate = moment(this.state.maturity);
			var duration = moment.duration(secondDate.diff(firstDate));
			var years = duration.asYears();
			let yearRate = 1 + resp[0].cdi / 100;
            let total = Math.pow(yearRate, years);  

            console.log("BondLine - load CDI Future curve");
                      
            this._loadCDIFuturoCurve(this.state.maturity, resp[0].cdi);

		});


        //TODO deve ser um callback no handleclick
		let _this = this;

		if (this.state.status === 'bond-close') {
			this.setState({
				status: 'bond-opening'
			});

			setTimeout(function() {
				_this.setState({
					status: 'bond-opened'
				});
			}, 100);
		} else if (this.state.status === 'bond-opened') {
			this.setState({
				status: 'bond-opening'
			});

			setTimeout(function() {
				_this.setState({
					status: 'bond-close'
				});
			}, 100);
		}

    }


    _filterCurve(curve, maturity, cdi){
        let days = DateHelper.diffDays(maturity);
        let limitedCurve = curve.filter( i => i.maturityDays < days);     
        limitedCurve.push({"cdi": cdi+"", "maturity": moment(maturity).format('DD/MM/YYYY')})   
        return limitedCurve;
    }


    _loadCDIFuturoCurve(maturity, cdi){

        let api = new Api();
		api.loadCDIFuturo( (resp) => {

            let curve = this._filterCurve(resp, maturity, cdi);

            console.log("BondLine - update CDI curve state");
			this.setState({cdiCurve:curve})
		});

    }

	handleBondClick(d, maturity, rate) {
        this._loadCDIFuturoAtMaturity(d, maturity, rate);
        this._loadCDIFuturoCurve();
	}

	render() {
		let Chart = this.state.status === 'bond-opened' ? <BondChart curve={this.state.cdiCurve} /> : null;

		var firstDate = moment(); //Create date using string-format constructor
		var secondDate = moment(this.state.maturity);
		var duration = moment.duration(secondDate.diff(firstDate));
		var years = duration.asYears();

		return (
			<div className="bond-line-wrapper">
				<div
					className="bond-line"
					onClick={(e) => this.handleBondClick(e, this.state.maturity, this.state.rate)}
				>
					<div>{this.state.category}</div>
					<div>{this.state.issuer} </div>
					<div className="text-success">{this.state.rate}% cdi</div>
					<div>
						{secondDate.format('DD/MM/YYYY')}{' '}
						<span className="bag bag--default-margin">{years.toFixed(2)} anos</span>
					</div>
				</div>
				<div className={'bond-detail ' + this.state.status}>
					<div className="center bond">
						<div className="bond-chart">
							{this.state.cdiFuturo} - {this.state.cdiFuturoDate}
							{Chart}
						</div>
						<div className="bond-cartoons">
							<div className="bond-msg">
								<p>
									O rendimento inicial <br />9,31%<br /> ao ano porém com a possível subida dos juros
									(linha cinza), o rendimento médio deste investimento irá subir e deve ser de 12,5%
									ao ano (linha branca).
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BondLine;

import React, { Component } from 'react';
import './BondLine.css';
import Api from './../../Api';
import DateHelper from './../../infra/DateHelper'
import RateCalculator from '../../business/RateCalculator'
import BondChart from './BondChart';
import moment from 'moment';

class BondLine extends Component {

	constructor(props) {
		super(props);
        this.handleBondClick = this.handleBondClick.bind(this);

        this.state = 
        {
            status: 'bond-close',
            bond: this.props.bond,
            profit:null,
            curve:[]
        } ;
	}
    
	render() {

        const bond =  this.state.bond;
        const profit = bond.getProfit()
        const future = bond.getFuture()

        var maturity = moment().add(bond.maturityDays, 'days');
        var years = DateHelper.daysToYears(bond.maturityDays);

        let Chart = this.state.status === 'bond-opened' ? <BondChart index={bond.index} curve={this.state.curve} /> : null;

        
        
        let cssCose = this.state.status === 'bond-opened' ? '' : 'bond-line--close';

        let content = null;        
        if(this._isLoading()){
            content = <img alt="loading" className="loading" src={"/loader.svg"} width={45} />;
        } else{
            content = Chart;
        }

        let index = "";
        let indexBkClass = "";
        let prefix = "";
        let proj = "";
        if (this.state.bond.index === "CDI"){
            index = "CDI"
            prefix = ""
            proj = "~ " + future.grossAnualProjectionAtMaturity.toFixed(2) + "%" ;
        }else if (this.state.bond.index === "IPCA"){
            index = "IPCA";
            prefix = " +";
            indexBkClass = "IPCA--bkcolor";
            proj = "~ " + future.grossAnualProjectionAtMaturity.toFixed(2) + "%" ;
        } else {
            index = "PRÉ"
            indexBkClass = "PRE--bkcolor";
            proj = "= " + future.grossAnualProjectionAtMaturity.toFixed(2) + "%" ;
        }

		return (
			<div className="bond-line-wrapper">
				<div
					className={"bond-line " + cssCose}
					onClick={(e) => this.handleBondClick(e, bond.maturity, bond.maturityDays, bond.rate)}
				>
					<div className="column--black">{bond.category}</div>
					<div>{bond.issuer} </div>
					<div >{bond.rate}% {prefix}<span className={"bondline__linerate " + indexBkClass} >{index}</span></div>
                    <div >{proj} </div>
					<div>
						{maturity.format('DD/MM/YYYY')}{' '}
						<span className="bag bag--default-margin">{years.toFixed(2)} anos</span>
					</div>
				</div>
				<div className={'bond-detail ' + this.state.status}>
					<div className="center bond">
                        
						<div className="bond-chart">
                            <h5>rentabilidade anual esperada</h5>
                            {content}
						</div>
						<div className="bond-cartoons">
							<div className="bond-msg">
								<div>
                                    <h5>lucro bruto</h5>
                                    <p>{ this._toPerc(profit.grossProfit)} %</p>
                                </div>
                                <div>
                                    <h5>I.R.</h5>
                                    <p>{ 100*profit.ir} %</p>
                                </div>
                                <div>
                                    <h5>lucro líquido</h5>
                                    <p>{ this._toPerc(profit.netProfit)} %</p>
                                </div>
                                <div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
    }
    


    _loadFuturoAtMaturity(d, maturity, rate){

        let cdiFutureDate = moment(maturity).format('DD/MM/YYYY');

		let api = new Api();
		api.loadFuturoAt(this.state.bond.index, cdiFutureDate, (resp) => {
            
            var years = DateHelper.diffYears(maturity);

            let calculator = new RateCalculator()
            const accumRate = calculator.calculateRate(resp.rate, years, this.state.bond.rate);

            this.setState({profit:accumRate});
                      
            this._loadFuturoCurve(this.state.bond.maturityDays);

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


    _loadFuturoCurve(days){

        let api = new Api();
        console.log("days");
        api.loadCurveFuturo(this.state.bond.index, days, (resp) => {

            let curve = resp.map( (cdi) => {
                
                cdi.index = cdi.rate;

                if(this.state.bond.index==='IPCA'){
                    let perc = this.state.bond.rate;
                    cdi.rate = cdi.rate+perc;
                }else{
                    let perc = this.state.bond.rate/100.0;
                    cdi.rate = cdi.rate*perc;
                }
                
                return cdi;
            } )

            console.log("BondLine - update CDI curve state");
			this.setState({curve:curve})
		});

    }

    _isLoading(){
        return this.state.curve.length <= 1;
    }

	handleBondClick(d, maturity, maturityDays, rate) {
        this._loadFuturoAtMaturity(d, maturity, rate);
        this._loadFuturoCurve(maturityDays);
    }
    
    _toPerc(value){
        return ((value-1)*100).toFixed(2)
    }

    
}

export default BondLine;

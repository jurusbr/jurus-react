import React, { Component } from 'react';
import './BondLine.css';
import Api from './../../Api';
import DateHelper from './../../infra/DateHelper'
import RateCalculator from '../../business/RateCalculator'
import BondChart from './BondChart';
import moment from 'moment';

const STATUS = {
    CLOSE: 0,
    OPENNING : 1,
    OPENED : 2
}

class BondLine extends Component {

    

	constructor(props) {
		super(props);
        this.handleBondClick = this.handleBondClick.bind(this);       

        this.state = {
            status: STATUS.CLOSE,
            bond: this.props.bond,
            curve:[]
        } ;        
	}
    
	render() {

        const bond =  this.state.bond;
        const profit = bond.getProfit()
        const future = bond.getFuture()

        var maturity = moment().add(bond.maturityDays, 'days');
        var years = DateHelper.daysToYears(bond.maturityDays);

        let ChartContent = this._drawChart(bond);
        

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


        let cssCose = this._isOpen() ? '' : 'bond-line--close';
		return (
			<div className="bond-line-wrapper">
				<div
					className={"bond-line " + cssCose}
					onClick={(e) => this.handleBondClick(e, bond.maturity, bond.maturityDays, bond.rate)}
				>
					<div className="column--black">{bond.category}</div>
					<div>{bond.issuer} </div>
					<div >{bond.rate}% {prefix}<span className={"bondline__linerate " + indexBkClass} >{index}</span></div>
                    {/* <div >{proj} </div> */}
					<div>
						{/*maturity.format('DD/MM/YYYY')}*/} 
						<span className="bag bag--default-margin">{years.toFixed(2)} anos</span>
					</div>
				</div>
				<div className={'bond-detail ' + this._getStatusCss()}>
					<div className="center bond">
                        
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


						<div className="bond-chart">
                            <h5>rentabilidade anual esperada</h5>
                            {ChartContent}
						</div>
					</div>
				</div>
			</div>
		);
    }

    _drawChart(bond){

        if(this._isLoading()){
            return <img alt="loading" className="loading" src={"/loader.svg"} width={45} />;
        }else{
            return this._isOpen() ? <BondChart index={bond.index} curve={this.state.curve} /> : null;
        }        
    }

    _getStatusCss(){
        if(this._isOpen()){
            return "bond-opened"
        }else if(this._isOpenning()){
            return "bond-opening"
        }else{
            return "bond-close"
        }
    }

    _loadPreAtMaturity(){

        let rate = this.state.bond.rate;
        let maturity = moment(this.state.bond.maturity);
        this.setState({curve:[{date:moment().format('DD/MM/YYYY'), index:rate, rate:rate},{date:maturity.format('DD/MM/YYYY'), index:rate, rate:rate}]})

        //TODO deve ser um callback no handleclick
		let _this = this;

		if (this._isClose()) {
			this.setState({
				status: STATUS.OPENNING
			});

			setTimeout(function() {
				_this.setState({
					status: STATUS.OPENED
				});
			}, 100);
		} else if (this._isOpen()) {
			this.setState({
				status: STATUS.OPENNING
			});

			setTimeout(function() {
				_this.setState({
					status: STATUS.CLOSE
				});
			}, 100);
		}

    }    


    _loadFuturoAtMaturity(d, maturity, rate){

        
        this._loadFuturoCurve(this.state.bond.maturityDays);


        //TODO deve ser um callback no handleclick
		let _this = this;

		if (this._isClose()) {
			this.setState({
				status: STATUS.OPENNING
			});

			setTimeout(function() {
				_this.setState({
					status: STATUS.OPENED
				});
			}, 100);
		} else if (this._isOpen()) {
			this.setState({
				status: STATUS.OPENNING
			});

			setTimeout(function() {
				_this.setState({
					status: STATUS.CLOSE
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

    _isOpen(){
        return this.state.status===STATUS.OPENED;
    }

    _isOpenning(){
        return this.state.status===STATUS.OPENNING;
    }

    _isClose(){
        return this.state.status===STATUS.CLOSE;
    }

    _isLoading(){
        return this.state.curve.length <= 1;
    }

	handleBondClick(d, maturity, maturityDays, rate) {
        if(this.state.bond.index=="PRÉ")
        {
            this._loadPreAtMaturity();
        }else{
            this._loadFuturoAtMaturity(d, maturity, rate);
        }
        
    }

    
    _toPerc(value){
        return ((value-1)*100).toFixed(2)
    }

    
}

export default BondLine;

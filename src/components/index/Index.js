import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis,  ResponsiveContainer, Tooltip } from 'recharts';
import './index.css';
import Api from './../../Api';
import moment from 'moment';

class Index extends Component {
	constructor(props) {
		super(props);
		this._handleIndexClick = this._handleIndexClick.bind(this);
	}

	componentWillMount() {
		this.setState({
			type: 'CDI',
            data: []
		});

		this._loadData('CDI');
	}

	_loadData(type) {
		let api = new Api();

		if (type === 'CDI') {
			console.log("loading CDI");
			api.loadCDIHistorical((resp) => {
				this.setState({
                    data: resp
				});
			});
		} else if (type === 'CDI Futuro') {
			console.log("loading CDI Futuro");
      api.loadCDIFuturo((resp) => {
				this.setState({
                    data: resp
				});
			});
		} else if (type === 'IPCA Futuro') {
			console.log("loading IPCA Futuro");
      api.loadDAP((resp) => {
				this.setState({
                    data: resp
				});
			});
		}
	}

	_handleIndexClick(type, e) {
		this.setState({
			type: type
		});
		this._loadData(type)
	}

	formatXAxis(tickItem) {
		return moment(tickItem).format('YYYY');
	}

	render() {
		return (
			<div className="index-container">
				<div className="nav-index">
					<div
						className={this.state.type === 'CDI' ? 'activate' : ''}
						onClick={(e) => this._handleIndexClick('CDI')}
					>
						CDI
					</div>
					<div
						className={this.state.type === 'CDI Futuro' ? 'activate' : ''}
						onClick={(e) => this._handleIndexClick('CDI Futuro')}
					>
						CDI Futuro
					</div>
                    <div
						className={this.state.type === 'IPCA Futuro' ? 'activate' : ''}
						onClick={(e) => this._handleIndexClick('IPCA Futuro')}
					>
						Ipca futuro
					</div>
				</div>
				<div className="map">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={this.state.data}>
							<XAxis dataKey="date" tickFormatter={this.formatXAxis} />
							<YAxis axisLine={false} tickFormatter={(tick) => tick + '%'} />
							<Line type="monotone" dataKey="rate" />
							<Tooltip
								formatter={(value) => Math.round(value * 100) / 100 + '%'}
								labelFormatter={(label) => moment(label).format('MM/YYYY')}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	}
}

export default Index;

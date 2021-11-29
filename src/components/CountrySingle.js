import React, { Component } from "react";
import axios from "axios";

function getCountry(capital) {
	return axios.get(`https://restcountries.com/v2/capital/${capital}`);
}

class CountrySingle extends Component {
	state = {
		country: [],
		weather: [],
	};

	componentDidMount() {}

	render() {
		return (
			<div className="country-single">
				<h1>{this.props.params.capital}</h1>
				<p>Weather in {this.props.params.capital} is probably freezing</p>
			</div>
		);
	}
}

export default CountrySingle;

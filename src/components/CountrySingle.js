import React, { Component } from "react";

class CountrySingle extends Component {
	render() {
		return (
			<div className="country-single">
				<h1>{this.props.params.capital}</h1>
				<p>Weather in capital of country</p>
			</div>
		);
	}
}

export default CountrySingle;

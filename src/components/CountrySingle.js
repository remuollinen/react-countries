import React, { Component } from "react";
import axios from "axios";

function getCountry(capital) {
	return axios.get(`https://restcountries.com/v2/capital/${capital}`);
}

function getWeather(capital) {
	return axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_ACCESS_KEY}`
	);
}

class CountrySingle extends Component {
	state = {
		country: [],
		weather: {},
	};

	componentDidMount() {
		Promise.all([
			getCountry(this.props.params.capital),
			getWeather(this.props.params.capital),
		]).then((res) => {
			console.log(res[1].data);
			this.setState({
				country: res[0].data,
				weather: res[1].data,
			});
		});
	}

	render() {
		return (
			<div className="country-single">
				<h1>{this.props.params.capital}</h1>
				<p>The temperature in {this.props.params.capital} is degrees.</p>
				{/* <img
					className="weather-icon"
					src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`}
					alt={`${this.state.weather.weather.description} weather icon`}
				/> */}
			</div>
		);
	}
}

export default CountrySingle;

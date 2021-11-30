import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
		country: {},
		weather: {},
		isLoading: true,
	};

	componentDidMount() {
		Promise.all([
			getCountry(this.props.params.capital),
			getWeather(this.props.params.capital),
		]).then((res) => {
			this.setState({
				country: res[0].data,
				weather: res[1].data,
				isLoading: false,
			});
			console.log(this.state.weather);
			// console.log(this.state.weather.main);
			// console.log(this.state.weather.main.temp);
		});
	}

	render() {
		return (
			<div className="country-single-wrapper">
				{this.state.isLoading ? (
					<div className="loader-wrapper">
						<FontAwesomeIcon
							className="fas fa-spinner fa-spin loader"
							icon={faSpinner}
						/>
					</div>
				) : (
					<div className="country-single">
						<h1>{this.props.params.capital}</h1>
						<p>
							Current temperature: <span>{this.state.weather.main.temp}°</span>
						</p>
						<p>
							Description:{" "}
							<span>{this.state.weather.weather[0].description}</span>
						</p>
						<img
							className="weather-icon"
							src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`}
							alt={`${this.state.weather.weather[0].description} weather icon`}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default CountrySingle;

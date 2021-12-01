import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Numeral from "react-numeral";

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
						<h1>{this.state.country[0].name}</h1>
						<h2>{this.props.params.capital}</h2>
						<p>
							Region: <span>{this.state.country[0].region}</span>
						</p>
						<p>
							Population:{" "}
							<span>
								{
									<Numeral
										value={this.state.country[0].population}
										format={"0.0a"}
									/>
								}
							</span>
						</p>
						<p>
							Language(s):{" "}
							{this.state.country[0].languages.map((lang, i) => (
								<span key={i}> {lang.name} </span>
							))}
						</p>
						<p>
							Currencies:{" "}
							{this.state.country[0].currencies.map((currency, i) => (
								<span key={i}>
									{" "}
									{`${currency.name} (${currency.symbol}) ${currency.code}`}{" "}
								</span>
							))}
						</p>
						<p>
							Phone number prefix:{" "}
							{this.state.country[0].callingCodes.map((code, i) => (
								<span key={i}> +{code} </span>
							))}
						</p>
						<div className="weather-wrapper">
							<h2>Weather</h2>
							<p>
								Current temperature in {this.props.params.capital}:{" "}
								<span>
									{
										<Numeral
											value={this.state.weather.main.temp}
											format={"0"}
										/>
									}
									°
								</span>
							</p>
							<p>
								Description:{" "}
								<span>{this.state.weather.weather[0].description}</span>
							</p>
							<img
								className="weather-icon"
								src={`http://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`}
								alt={`${this.state.weather.weather[0].description} weather icon`}
							/>
						</div>
						<img
							src={this.state.country[0].flag}
							alt={`flag of ${this.state.country[0].name}`}
						/>
					</div>
				)}
				<button className="back-btn" onClick={() => this.props.navigate(-1)}>
					Go back to countries list
				</button>
			</div>
		);
	}
}

export default CountrySingle;

import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Numeral from "react-numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
	state = {
		data: [],
		search: "",
		isLoading: true,
	};

	componentDidMount() {
		axios
			.get(
				"https://restcountries.com/v2/all?fields=name,capital,flags,population,languages,callingCodes"
			)
			.then((response) => {
				this.setState({ data: response.data, isLoading: false });
				console.log(this.state.data);
			});
	}

	searchHandler = (e) => {
		this.setState({
			search: e.target.value,
		});
	};

	render() {
		const filteredCountries = this.state.data.filter((c) => {
			return c.name.toLowerCase().includes(this.state.search.toLowerCase());
		});

		return (
			<div className="app">
				<header>
					<h1>Countries App</h1>
					<input
						type="text"
						placeholder="Search for a country"
						onChange={this.searchHandler}
					/>
				</header>
				<main>
					{this.state.isLoading ? (
						<FontAwesomeIcon
							className="fas fa-spinner fa-spin loader"
							icon={faSpinner}
						/>
					) : (
						filteredCountries.map((country) => {
							return (
								<div key={country.name} className="country-card">
									<div className="card-header">
										<h2>{country.name}</h2>
										<p>
											<span>{country.capital}</span>
										</p>
									</div>
									<img
										src={`${country.flags.svg}`}
										alt={`flag of ${country.name}`}
									/>
									<p>
										Population:{" "}
										<span>
											{<Numeral value={country.population} format={"0.0a"} />}
										</span>
									</p>
									<p>
										Language(s):{" "}
										{country.languages.map((lang, i) => (
											<span key={i}> {lang.name} </span>
										))}
									</p>
									<p>
										Phone number prefix:{" "}
										{country.callingCodes.map((code, i) => (
											<span key={i}> +{code} </span>
										))}
									</p>
								</div>
							);
						})
					)}
				</main>
			</div>
		);
	}
}

export default App;

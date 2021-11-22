import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			this.setState({ data: response.data });
		});
	}

	render() {
		return (
			<main>
				{this.state.data.map((country) => {
					return (
						<div key={country.name.common} className="country-card">
							<h2>{country.name.common}</h2>
							<img
								src={`${country.flags.svg}`}
								alt={`flag of ${country.name.common}`}
							/>
							<p>
								Capital: <span>{country.capital}</span>
							</p>
							<p>
								They drive on the <span>{country.car.side}</span> side of the
								road.
							</p>
						</div>
					);
				})}
			</main>
		);
	}
}

export default App;

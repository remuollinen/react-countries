import React, { Component } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

class CountryList extends Component {
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
				// console.log(this.state.data);
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
			<>
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
								<CountryCard
									key={country.name}
									name={country.name}
									capital={country.capital}
									flags={country.flags}
									population={country.population}
									languages={country.languages}
									callingCodes={country.callingCodes}
								/>
							);
						})
					)}
				</main>
			</>
		);
	}
}

export default CountryList;

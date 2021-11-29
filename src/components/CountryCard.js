import React from "react";
import Numeral from "react-numeral";
import { Link } from "react-router-dom";

const CountryCard = ({
	name,
	capital,
	flags,
	population,
	languages,
	callingCodes,
}) => {
	return (
		<Link to={capital} className="country-card">
			<div className="card-header">
				<h2>{name}</h2>
				<p>
					<span>{capital}</span>
				</p>
			</div>
			<img src={`${flags.svg}`} alt={`flag of ${name}`} />
			<p>
				Population:{" "}
				<span>{<Numeral value={population} format={"0.0a"} />}</span>
			</p>
			<p>
				Language(s):{" "}
				{languages.map((lang, i) => (
					<span key={i}> {lang.name} </span>
				))}
			</p>
			<p>
				Phone number prefix:{" "}
				{callingCodes.map((code, i) => (
					<span key={i}> +{code} </span>
				))}
			</p>
		</Link>
	);
};

export default CountryCard;

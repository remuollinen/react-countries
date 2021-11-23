import React from "react";
import Numeral from "react-numeral";

const CountryCard = ({
	name,
	capital,
	flags,
	population,
	languages,
	callingCodes,
}) => {
	return (
		<div key={name} className="country-card">
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
		</div>
	);
};

export default CountryCard;

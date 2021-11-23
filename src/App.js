import React, { Component } from "react";
import "./App.css";
import CountryList from "./components/CountryList";

class App extends Component {
	render() {
		return (
			<div className="app">
				<CountryList />
			</div>
		);
	}
}

export default App;

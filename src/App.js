import React from "react";
import "./App.css";
import CountryList from "./components/CountryList";
import Home from "./components/Home";
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import CountrySingle from "./components/CountrySingle";

const RouteWrapper = (props) => {
	const params = useParams();
	return <CountrySingle params={params} {...props} />;
};

const App = () => {
	return (
		<BrowserRouter className="app">
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/countries">Countries</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/countries" element={<CountryList />} />
				<Route path="countries/:capital" element={<RouteWrapper />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

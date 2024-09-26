import React from "react";
import SearchBar from "../../components/search-bar/search-bar.component";
import SearchResults from "../../components/search-results/search-results.component";
import logo from '../../assets/logo.svg';
import './homepage.styles.scss'

const Hompage = () => {
	return (
		<>
			<div className="homePageContainer">
				<img src={logo} alt="DuckDuckProxy" width={100} height={100} />
				<h1>DuckDuckProxy</h1>
				<SearchBar />
                <SearchResults />
			</div>
		</>
	);
};

export default Hompage;

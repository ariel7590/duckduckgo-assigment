import React from "react";
import SearchBar from "../../components/search-bar/search-bar.component";
import SearchResults from "../../components/search-results/search-results.component";
import './homepage.styles.scss'

const Hompage = () => {
	return (
		<>
			<div className="homePageContainer">
				<h1>QuakQuakGo</h1>
				<SearchBar />
                <SearchResults />
			</div>
		</>
	);
};

export default Hompage;

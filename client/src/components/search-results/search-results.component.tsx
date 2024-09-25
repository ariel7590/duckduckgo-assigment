import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PageSelector from "../page-selector/page-selector.component";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const highlightText = (text: string, query: string) => {
	if (!query) return text;
	const regex = new RegExp(`(${query})`, "gi"); // case insensitive
	const parts = text.split(regex);

	return parts.map((part, index) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<span key={index} style={{ backgroundColor: "yellow" }}>
				{part}
			</span>
		) : (
			part
		)
	);
};

const SearchResults = () => {
	const { results, error, loading, query } = useSelector(
		(state: RootState) => state.search
	);

	if (loading) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	// Count occurrences of the query in the titles
	const countOccurrences = (title: string) => {
		const regex = new RegExp(query, "gi"); // case insensitive
		return (title.match(regex) || []).length;
	};

	const totalOccurrences = results.reduce(
		(acc, result) => acc + countOccurrences(result.title),
		0
	);

	return (
		<>
			<Stack spacing={2}>
                <br />
				{query !== "" ? (
					<h3>
						Total occurrences of "{query}" on this page: {totalOccurrences}
					</h3>
				) : null}

				{results.map((result, index) => (
					<div key={index} style={{textAlign: 'center', fontSize: '18px'}}>
						<a href={result.url} target='_blank' rel='noopener noreferrer'>
							{highlightText(result.title, query)}
						</a>
					</div>
				))}
				{query 
                ? 
                <div style={{alignSelf:'center'}}>
                    <PageSelector />
                </div> 
                : 
                null}
			</Stack>
		</>
	);
};

export default SearchResults;

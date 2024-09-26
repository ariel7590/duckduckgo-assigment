import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PageSelector from "../page-selector/page-selector.component";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { highlightText } from "../../utils/highlight-text";

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

	const countOccurrences = (query: string) => {
		const regex = new RegExp(query, "gi"); // case insensitive
		return (query.match(regex) || []).length;
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

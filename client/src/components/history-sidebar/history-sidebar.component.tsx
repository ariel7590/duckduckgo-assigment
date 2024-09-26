import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getSearchHistory } from "../../redux/search/search.thunks";
import { setQuery, addToHistory, turnOnHistoryMode } from '../../redux/search/search.slice';
import { getSearchResultsByGET } from '../../redux/search/search.thunks';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import "./history-sidebar.styles.scss";

const HistorySideBar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const history = useSelector((state: RootState) => state.search.history);
    const currentPage = useSelector((state: RootState) => state.search.currentPage);

	useEffect(() => {
		dispatch(getSearchHistory({}));
	}, []);

    const handleClick = (search:string) => {
        dispatch(setQuery(search));
        dispatch(addToHistory(search));
        dispatch(getSearchResultsByGET({ query: search, page: currentPage }));
        dispatch(turnOnHistoryMode());
    };

	return (
		<>
			<div className='historyContainer'>
				<h2>Your last searches</h2>
				<Stack spacing={2}>
					{history.map((search) => (
						<Paper key={search} className='historyItem' onClick={()=>handleClick(search)}>{search}</Paper>
					))}
				</Stack>
			</div>
		</>
	);
};

export default HistorySideBar;

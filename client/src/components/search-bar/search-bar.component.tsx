import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setQuery, addToHistory, turnOffHistoryMode } from '../../redux/search/search.slice';
import { getSearchResults } from '../../redux/search/search.thunks';
import SearchIcon from '@mui/icons-material/Search';
import "./search-bar.styles.scss";

const SearchBar = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const currentPage = useSelector((state: RootState) => state.search.currentPage);
    const query = useSelector((state: RootState) => state.search.query);
    const historyMode=useSelector((state: RootState) => state.search.historyMode);

    const handleSearch = () => {
        setInput("");
        dispatch(setQuery(input));
        dispatch(addToHistory(input));
        dispatch(getSearchResults({ query: input, page: currentPage }));
    };


    return (
        <div className='searchBarContainer'>
            <input
                type="text"
                value={historyMode ? query : input}
                className='searchInput'
                onChange={(e) => setInput(e.target.value)}
                onClick={()=>dispatch(turnOffHistoryMode())}
                placeholder="Search QuakQuakGo..."
            />
            <button
            className='searchButton'
            onClick={handleSearch}
            >
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBar;

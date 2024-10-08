import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setQueryAndHistory, turnOffHistoryMode } from '../../redux/search/search.slice';
import { getSearchResultsByGET } from '../../redux/search/search.thunks';
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
        dispatch(setQueryAndHistory(input));
        dispatch(getSearchResultsByGET({ query: input, page: currentPage }));
    };


    return (
        <div className='searchBarContainer'>
            <input
                type="text"
                value={historyMode ? query : input}
                className='searchInput'
                onChange={(e) => setInput(e.target.value)}
                onClick={()=>dispatch(turnOffHistoryMode())}
                placeholder="Search DuckDuckGo..."
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

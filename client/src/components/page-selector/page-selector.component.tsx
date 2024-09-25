import React from 'react';
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setPage } from '../../redux/search/search.slice';
import { getSearchResults } from '../../redux/search/search.thunks';


const PageSelector = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { query, currentPage, totalPages } = useSelector((state: RootState) => state.search);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        dispatch(getSearchResults({ query, page }));
    };

    return (
        <Pagination color='primary' page={currentPage} count={totalPages} onChange={(e,page)=>handlePageChange(page)}/>
    );
};

export default PageSelector;

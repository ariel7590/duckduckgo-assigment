import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "./search.types";
import { getSearchHistory, getSearchResults } from "./search.thunks";

const initialState: SearchState = {
	query: "",
	history: [],
	historyMode: false,
	results: [],
	error: null,
	loading: false,
	currentPage: 1,
	totalPages: 1,
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setQuery(state, action) {
			state.query = action.payload;
		},
		addToHistory(state, action) {
			if (!state.history.includes(action.payload)) {
				state.history.push(action.payload);
			}
		},
		setPage(state, action) {
			state.currentPage = action.payload;
		},
		turnOnHistoryMode(state) {
			state.historyMode = true
		},
		turnOffHistoryMode(state) {
			state.historyMode = false
		},
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSearchResults.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSearchResults.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.results = (action.payload as SearchState).results;
				state.totalPages = (action.payload as SearchState).totalPages;
			})
			.addCase(getSearchResults.rejected, (state, action) => {
				state.loading = false;
				state.query = "";
				state.error = action.payload as string;
			})
			.addCase(getSearchHistory.pending, (state) => {
				state.loading = true;
			})
			.addCase(getSearchHistory.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.history = (action.payload as SearchState).history;
			})
			.addCase(getSearchHistory.rejected, (state, action) => {
				state.loading = false;
				state.history = [];
				state.error = action.payload as string;
			});
	},
});

export const { setQuery, addToHistory, setPage, turnOnHistoryMode, turnOffHistoryMode } = searchSlice.actions;

export default searchSlice.reducer;

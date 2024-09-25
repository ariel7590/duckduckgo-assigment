import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResultsAPI } from "../../API-calls/searchAPI";
import { AxiosError } from "axios";
import { getHistoryAPI } from "../../API-calls/historyAPI";

export const getSearchResults = createAsyncThunk<
	unknown,
	{query: string, page: number},
	{ rejectValue: SerializedError }
>("search/getResults", async (data, thunkAPI) => {
	try {
        const {query, page}=data;
		const response = await getSearchResultsAPI(query, page);
		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
        if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const getSearchHistory = createAsyncThunk<
	unknown,
	object,
	{ rejectValue: SerializedError }
>("search/getHistory", async (data, thunkAPI) => {
	try {
		const response = await getHistoryAPI();
		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
        if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});
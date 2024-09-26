import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResultsByGETAPI, getSearchResultsByPOSTAPI } from "../../API-calls/searchAPI";
import { AxiosError } from "axios";
import { getHistoryAPI } from "../../API-calls/historyAPI";

export const getSearchResultsByGET = createAsyncThunk<
	unknown,
	{query: string, page: number},
	{ rejectValue: SerializedError }
>("search/getResultsGET", async (data, thunkAPI) => {
	try {
        const {query, page}=data;
		const response = await getSearchResultsByGETAPI(query, page);
		return thunkAPI.fulfillWithValue(response.data);
	} catch (err) {
        if (err instanceof AxiosError && err.response !== undefined) {
			return thunkAPI.rejectWithValue(err.response.data.error);
		} else {
			throw err;
		}
	}
});

export const getSearchResultsByPOST = createAsyncThunk<
	unknown,
	{query: string, page: number},
	{ rejectValue: SerializedError }
>("search/getResultsPOST", async (data, thunkAPI) => {
	try {
        const {query, page}=data;
		const response = await getSearchResultsByPOSTAPI(query, page);
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
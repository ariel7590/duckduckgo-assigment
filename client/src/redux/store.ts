import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/search.slice";
import logger from 'redux-logger';

const store = configureStore({
	reducer: {
		search: searchReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

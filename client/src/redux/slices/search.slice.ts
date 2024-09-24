import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SearchState = {
 query: string;
 history: string[];
 results: Topic[];
}

type Topic = {
    url: string,
    title: string
}

const initialState: SearchState={
    query: '',
    history: [],
    results: []
};

const searchSlice=createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>)=>{
            state.query=action.payload;
        },
        setResults: (state, action: PayloadAction<Topic[]>)=>{
            state.results=action.payload;
        },
        addToHistory: (state, action: PayloadAction<string>) => {
            if(!state.history.includes(action.payload)) {
                state.history.push(action.payload);
            }
        },
        loadHistory: (state, action: PayloadAction<string[]>) => {
            state.history=action.payload;
        }
    }
});

export const {setQuery, setResults, addToHistory, loadHistory}=searchSlice.actions;
export default searchSlice.reducer;
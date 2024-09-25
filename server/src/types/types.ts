export type DuckDuckGoTopic = {  // The data of each result that is returned from the DDG API
    FirstURL: string;
    Result: string;
    Topics?: DuckDuckGoSubTopic[];
}

export type DuckDuckGoSubTopic = {  // The structure of each subtopic inside the Topics array from the DDG response
    FirstURL: string;
    Result: string;
}

export type SearchResult = {  // The simplified version of the data that is returned to the client.
    url: string;
    title: string;
}
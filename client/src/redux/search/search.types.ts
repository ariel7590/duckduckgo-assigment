export type SearchState = {
    query: string;
    history: string[];
    historyMode: boolean;
    results: Topic[];
    error: string | null;
    loading: boolean;
    currentPage: number;
    totalPages: number;
}

export type Topic = {
    url: string,
    title: string
}

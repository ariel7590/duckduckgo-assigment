import axiosInstance from "../config/axios.config";
import { searchRoute } from "../config/routeUrls";

export const getSearchResultsAPI = async (query: string, page: number) => {
    const response = await axiosInstance({
        method: 'get',
        url: searchRoute,
        params: {
            q: query,
            page
        }
    })
    if (!response) {
        throw new Error('Error: Something went wrong with the network response');
    }
    return response;
};

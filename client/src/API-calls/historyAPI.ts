import axiosInstance from "../config/axios.config";
import { historyRoute } from "../config/routeUrls";

export const getHistoryAPI = async () => {
    const response = await axiosInstance({
        method: 'get',
        url: historyRoute
    })
    if (!response) {
        throw new Error('Error: Something went wrong with the network response');
    }
    return response;
};

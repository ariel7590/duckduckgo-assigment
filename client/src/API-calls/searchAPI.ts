import axiosInstance from "../config/axios.config";
import { searchRoute } from "../config/routeUrls";

export const getSearchResultsByGETAPI = async (query: string, page: number) => {
	const response = await axiosInstance({
		method: "get",
		url: searchRoute,
		params: {
			q: query,
			page,
		},
	});
	if (!response) {
		throw new Error("Error: Something went wrong with the network response");
	}
	return response;
};

export const getSearchResultsByPOSTAPI = async (
	query: string,
	page?: number
) => {
	const pageNumber = page || 1;
	const response = await axiosInstance({
		method: "post",
		url: searchRoute,
		data: {
			query,
			page: pageNumber,
		},
	});
	if (!response) {
		throw new Error("Error: Something went wrong with the network response");
	}
	return response;
};

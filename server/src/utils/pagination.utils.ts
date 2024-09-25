import { SearchResult } from "../types/types";

export const paginate = (
	result: SearchResult[],
	pageNumber: number,
	itemsPerPage?: number
) => {
	/**
	 * Slices the result array accordingly to the items per page or 10 by default
	 */
	const perPage = itemsPerPage || 10;
	const page = pageNumber || 1;
	const skip = perPage * page - perPage;
	const paginatedResult = result.slice(skip, skip + perPage);
	return paginatedResult;
};

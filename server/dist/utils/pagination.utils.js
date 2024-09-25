"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (result, pageNumber, itemsPerPage) => {
    /**
     * Slices the result array accordingly to the items per page or 10 by default
     */
    const perPage = itemsPerPage || 10;
    const page = pageNumber || 1;
    const skip = perPage * page - perPage;
    const paginatedResult = result.slice(skip, skip + perPage);
    return paginatedResult;
};
exports.paginate = paginate;

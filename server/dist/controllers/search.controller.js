"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetSearchByBody = exports.httpGetSearchByQuery = void 0;
const axios_1 = __importDefault(require("axios"));
const response_utils_1 = require("../utils/response.utils");
const pagination_utils_1 = require("../utils/pagination.utils");
const history_utils_1 = require("../utils/history.utils");
const httpGetSearchByQuery = async (req, res) => {
    /**
     * Getting a query parameter and searching through DDG
     */
    const { q, page } = req.query;
    if (!q || !page) {
        return res.status(400).json({
            error: "One the query parameters q or page is missing!",
        });
    }
    try {
        const response = await axios_1.default.get("http://api.duckduckgo.com/", {
            params: { q, format: "json" },
        });
        const results = (0, response_utils_1.mapDuckDuckGoResponse)(response.data.RelatedTopics);
        const pageNumber = parseInt(page) || 1;
        const totalPages = Math.ceil(results.length / 10);
        const paginatedResults = (0, pagination_utils_1.paginate)(results, pageNumber);
        const history = (0, history_utils_1.loadQueryHistory)();
        if (!history.includes(q)) {
            history.push(q);
            (0, history_utils_1.saveQueryHistory)(history);
        }
        res.status(200).json({ results: paginatedResults, totalPages });
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
};
exports.httpGetSearchByQuery = httpGetSearchByQuery;
const httpGetSearchByBody = async (req, res) => {
    /**
     * Getting info from the body through a post request and searching through DDG
     */
    const query = req.body.query;
    if (!query) {
        return res.status(400).json({
            error: "Query field is missing!",
        });
    }
    try {
        const response = await axios_1.default.get("http://api.duckduckgo.com/", {
            params: { q: query, format: "json" },
        });
        const results = (0, response_utils_1.mapDuckDuckGoResponse)(response.data.RelatedTopics);
        const history = (0, history_utils_1.loadQueryHistory)();
        if (!history.includes(query)) {
            history.push(query);
            (0, history_utils_1.saveQueryHistory)(history);
        }
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({
            error: "Can't fetch results from DuckDuckGo",
        });
    }
};
exports.httpGetSearchByBody = httpGetSearchByBody;

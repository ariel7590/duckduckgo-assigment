import { RequestHandler } from "express";
import axios from "axios";
import { mapDuckDuckGoResponse } from "../utils/response.utils";
import { paginate } from "../utils/pagination.utils";
import { loadQueryHistory, saveQueryHistory } from "../utils/history.utils";

export const httpGetSearchByQuery:RequestHandler=async (req,res)=>{
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
		const response = await axios.get("http://api.duckduckgo.com/", {
			params: { q, format: "json" },
		});
		const results = mapDuckDuckGoResponse(response.data.RelatedTopics);
		const pageNumber = parseInt(page as string) || 1;
		const totalPages=Math.ceil(results.length/10);
		const paginatedResults=paginate(results,pageNumber);
		const history = loadQueryHistory();
		if (!history.includes(q as string)) {
			history.push(q as string);
			saveQueryHistory(history);
		}
		res.status(200).json({results: paginatedResults, totalPages});
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}
}

export const httpGetSearchByBody:RequestHandler=async (req, res)=>{
    /**
     * Getting info from the body through a post request and searching through DDG
     */
    const query: string = req.body.query;
	const page: number = req.body.page;

	if (!query || !page) {
		return res.status(400).json({
			error: "One the query parameters q or page is missing!",
		});
	}

	try {
		const response = await axios.get("http://api.duckduckgo.com/", {
			params: { q: query, format: "json" },
		});

		const results = mapDuckDuckGoResponse(response.data.RelatedTopics);
		const totalPages=Math.ceil(results.length/10);
		const paginatedResults=paginate(results,page);

		const history = loadQueryHistory();
		if (!history.includes(query)) {
			history.push(query);
			saveQueryHistory(history);
		}

		res.status(200).json({results: paginatedResults, totalPages});
	} catch (error) {
		res.status(500).json({
			error: "Can't fetch results from DuckDuckGo",
		});
	}
}
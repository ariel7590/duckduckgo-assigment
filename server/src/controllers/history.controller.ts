import { RequestHandler } from "express";
import { loadQueryHistory } from "../utils/history.utils";

export const httpGetQueryHistory: RequestHandler=async (req, res)=>{
    /**
     * Returns the history to the client
     */
    const history = loadQueryHistory();
	res.status(200).json({history});
}
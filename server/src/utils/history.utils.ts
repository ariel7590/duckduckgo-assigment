import path, { format } from "path";
import fs from "fs";
import { historyFilePath } from "../app";


export const loadQueryHistory = (): string[] => {
	/**
	 *  Loads the query history from queryHistory.json, which contains a list of past search queries in JSON format.
	 */
	if (fs.existsSync(historyFilePath)) {
		const data = fs.readFileSync(historyFilePath, "utf-8");
        return JSON.parse(data);
	}
	console.log(historyFilePath);
	console.log(fs.existsSync(historyFilePath));
	return [];
};

export const saveQueryHistory = (history: string[]): void => {
	/**
	 *  Saves query history to queryHistory.json
	 */
	fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};
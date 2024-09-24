import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import fs from "fs";
import path, { format } from "path";
import { DuckDuckGoTopic, SearchResult } from "./types";
import { title } from "process";
import { error } from "console";

const app = express();
const port = 8000;

const historyFilePath = path.join(__dirname, "../queryHistory.json");

app.use(express.json());
app.use(cors());

const loadQueryHistory = (): string[] => {
	/**
	 *  Loads the query history from queryHistory.json, which contains a list of past search queries in JSON format.
	 */
	if (fs.existsSync(historyFilePath)) {
		const data = fs.readFileSync(historyFilePath, "utf-8");
		return JSON.parse(data);
	}
	return [];
};

const saveQueryHistory = (history: string[]): void => {
	/**
	 *  Saves query history to queryHistory.json
	 */
	fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};

const mapDuckDuckGoResponse = (data: DuckDuckGoTopic[]): SearchResult[] => {
	/**
	 * Takes the API response and returns it in a simplified format
	 */
	return data
		.map((topic) => {
			if (topic.FirstURL && topic.Text) {
				return { url: topic.FirstURL, title: topic.Text };
			} else if (topic.Topics) {
				return topic.Topics.map((subTopic) => ({
					url: subTopic.FirstURL,
					title: subTopic.Text,
				}));
			}
		})
		.flat()
		.filter(Boolean) as SearchResult[];
};

app.get("/api/search", async (req: Request, res: Response) => {
	const query = req.query.q as string;
	if (!query) {
		return res.status(400).json({
			error: "Query parameter q is missing!",
		});
	}

	try {
		const response = await axios.get("http://api.duckduckgo.com/", {
			params: { q: query, format: "json" },
		});

		const results = mapDuckDuckGoResponse(response.data.RelatedTopics);
		res.json(results);
	} catch (error) {
		res.status(500).json({
			error: "Can't fetch results from DuckDuckGo",
		});
	}
});

app.post("/api/search", async (req: Request, res: Response) => {
	const query = req.body.query;

    if(!query){
        return res.status(400).json({
            error: "Query field is missing!"
        })
    }

    try{
        const response=await axios.get("http://api.duckduckgo.com/",{
            params: {q:query, format: 'json'}
        });

        const results=mapDuckDuckGoResponse(response.data.RelatedTopics);

        const history=loadQueryHistory();
        if(!history.includes(query)){
            history.push(query);
            saveQueryHistory(history);
        }

        res.json(results);
    }catch (error){
        res.status(500).json({
            error: "Can't fetch results from DuckDuckGo"
        })
    }
});

app.get('/api/history',(req: Request, res: Response)=>{
    const history = loadQueryHistory();
    res.json(history);
})

app.listen(port, () => {
	console.log("The server is running on port " + port);
});

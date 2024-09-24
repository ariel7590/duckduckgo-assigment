"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 8000;
const historyFilePath = path_1.default.join(__dirname, "../queryHistory.json");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const loadQueryHistory = () => {
    /**
     *  Loads the query history from queryHistory.json, which contains a list of past search queries in JSON format.
     */
    if (fs_1.default.existsSync(historyFilePath)) {
        const data = fs_1.default.readFileSync(historyFilePath, "utf-8");
        return JSON.parse(data);
    }
    return [];
};
const saveQueryHistory = (history) => {
    /**
     *  Saves query history to queryHistory.json
     */
    fs_1.default.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
};
const mapDuckDuckGoResponse = (data) => {
    /**
     * Takes the API response and returns it in a simplified format
     */
    return data
        .map((topic) => {
        if (topic.FirstURL && topic.Text) {
            return { url: topic.FirstURL, title: topic.Text };
        }
        else if (topic.Topics) {
            return topic.Topics.map((subTopic) => ({
                url: subTopic.FirstURL,
                title: subTopic.Text,
            }));
        }
    })
        .flat()
        .filter(Boolean);
};
app.get("/api/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({
            error: "Query parameter q is missing!",
        });
    }
    try {
        const response = await axios_1.default.get("http://api.duckduckgo.com/", {
            params: { q: query, format: "json" },
        });
        const results = mapDuckDuckGoResponse(response.data.RelatedTopics);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({
            error: "Can't fetch results from DuckDuckGo",
        });
    }
});
app.post("/api/search", async (req, res) => {
    const query = req.body.query;
    if (!query) {
        return res.status(400).json({
            error: "Query field is missing!"
        });
    }
    try {
        const response = await axios_1.default.get("http://api.duckduckgo.com/", {
            params: { q: query, format: 'json' }
        });
        const results = mapDuckDuckGoResponse(response.data.RelatedTopics);
        const history = loadQueryHistory();
        if (!history.includes(query)) {
            history.push(query);
            saveQueryHistory(history);
        }
        res.json(results);
    }
    catch (error) {
        res.status(500).json({
            error: "Can't fetch results from DuckDuckGo"
        });
    }
});
app.get('/api/history', (req, res) => {
    const history = loadQueryHistory();
    res.json(history);
});
app.listen(port, () => {
    console.log("The server is running on port " + port);
});

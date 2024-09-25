"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveQueryHistory = exports.loadQueryHistory = void 0;
const fs_1 = __importDefault(require("fs"));
const app_1 = require("../app");
const loadQueryHistory = () => {
    /**
     *  Loads the query history from queryHistory.json, which contains a list of past search queries in JSON format.
     */
    if (fs_1.default.existsSync(app_1.historyFilePath)) {
        const data = fs_1.default.readFileSync(app_1.historyFilePath, "utf-8");
        return JSON.parse(data);
    }
    console.log(app_1.historyFilePath);
    console.log(fs_1.default.existsSync(app_1.historyFilePath));
    return [];
};
exports.loadQueryHistory = loadQueryHistory;
const saveQueryHistory = (history) => {
    /**
     *  Saves query history to queryHistory.json
     */
    fs_1.default.writeFileSync(app_1.historyFilePath, JSON.stringify(history, null, 2));
};
exports.saveQueryHistory = saveQueryHistory;

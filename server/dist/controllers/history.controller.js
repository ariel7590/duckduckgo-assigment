"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetQueryHistory = void 0;
const history_utils_1 = require("../utils/history.utils");
const httpGetQueryHistory = async (req, res) => {
    /**
     * Returns the history to the client
     */
    const history = (0, history_utils_1.loadQueryHistory)();
    res.status(200).json({ history });
};
exports.httpGetQueryHistory = httpGetQueryHistory;

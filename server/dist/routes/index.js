"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_router_1 = __importDefault(require("./search.router"));
const history_router_1 = __importDefault(require("./history.router"));
const routers = express_1.default.Router();
routers.use("/search", search_router_1.default);
routers.use("/history", history_router_1.default);
routers.get("/", (req, res) => {
    res.send("Works!");
});
exports.default = routers;

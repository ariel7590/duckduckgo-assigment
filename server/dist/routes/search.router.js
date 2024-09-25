"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_controller_1 = require("../controllers/search.controller");
const searchRouter = express_1.default.Router();
searchRouter.get("/", search_controller_1.httpGetSearchByQuery);
searchRouter.post("/", search_controller_1.httpGetSearchByBody);
exports.default = searchRouter;

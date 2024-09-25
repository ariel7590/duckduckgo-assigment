"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyFilePath = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
exports.historyFilePath = path_1.default.join(__dirname, "../queryHistory.json");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(routes_1.default);
exports.default = app;

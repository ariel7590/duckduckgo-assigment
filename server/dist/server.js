"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("config"));
const app_1 = __importDefault(require("./app"));
const PORT = config_1.default.get('port');
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log("The server is running on port " + PORT);
});

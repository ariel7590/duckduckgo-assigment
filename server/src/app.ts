import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import routers from "./routes";

const app = express();
export const historyFilePath = path.join(__dirname, "../queryHistory.json");



app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routers);


export default app;
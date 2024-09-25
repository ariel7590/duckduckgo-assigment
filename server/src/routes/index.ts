import express from 'express';
import searchRouter from './search.router';
import historyRouter from './history.router';
const routers=express.Router();

routers.use("/search", searchRouter);
routers.use("/history", historyRouter);
routers.get("/", (req, res) => {
	res.send("Works!");
});

export default routers;
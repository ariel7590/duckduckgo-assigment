import express from 'express';
import { httpGetQueryHistory } from '../controllers/history.controller';


const historyRouter=express.Router();
historyRouter.get("/", httpGetQueryHistory);

export default historyRouter;
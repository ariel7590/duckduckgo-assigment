import express from 'express';
import { httpGetSearchByQuery, httpGetSearchByBody } from '../controllers/search.controller';


const searchRouter=express.Router();
searchRouter.get("/", httpGetSearchByQuery);
searchRouter.post("/", httpGetSearchByBody);

export default searchRouter;
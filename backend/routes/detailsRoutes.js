import {Router} from "express";
import { addDetails } from "../controllers/addDetails.js";

const detailRouter =Router();
detailRouter.post("/add", addDetails)

export default detailRouter;
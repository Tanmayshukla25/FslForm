import { Router } from "express";
import { addDetails } from "../controllers/addDetails.js";
import Middleware from "../middleware/middleware.js";

const detailRouter = Router();


detailRouter.post("/add", Middleware, addDetails);

export default detailRouter;

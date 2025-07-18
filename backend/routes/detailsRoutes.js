
import { Router } from "express";
import upload from "../middleware/middleware.js"
import {addDetails} from "../controllers/addDetails.js"
const detailRouter = Router();


// detailRouter.post("/add", upload.fields([
//     { name: "aadhaarFront", maxCount: 1 },
//     { name: "aadhaarBack", maxCount: 1 }
//   ]),addDetails) ;

detailRouter.post("/add",addDetails);

export default detailRouter;
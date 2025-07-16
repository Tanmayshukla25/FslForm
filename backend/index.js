import express from "express";

import "dotenv/config";
import cors from "cors";
import connectToDb from "./config/db.js";
import detailRouter from "./routes/detailsRoutes.js";


const app = express();
const port = 4000;

await connectToDb()

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());



app.use("/api/details", detailRouter);


app.listen(port, () => console.log(`Server started at port ${port}`));
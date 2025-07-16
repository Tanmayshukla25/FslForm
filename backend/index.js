import express from "express";

import "dotenv/config";
import cors from "cors";
import connectToDb from "./config/db.js";
import detailRouter from "./routes/detailsRoutes.js";

const app = express();
const port = process.env.PORT;

await connectToDb();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/details", detailRouter);

app.listen(port, () => console.log(`Server started at port ${port}`));

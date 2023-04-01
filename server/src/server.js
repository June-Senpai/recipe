import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "../routes/usersRoute.js";
import { recipesRouter } from "../routes/recipesRoute.js";
const port = process.env.PORT || 4001;
const app = express();
try {
  dotenv.config();
} catch (err) {
  console.error(err);
}

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
const DB = `mongodb+srv://kj123:${process.env.DB_PASSWORD}@cluster0.mqwqpua.mongodb.net/Cluster0?retryWrites=true&w=majority`;
console.log({ DB });
mongoose.connect(DB);

app.listen(port, () => console.log(`server started on ${port} `));

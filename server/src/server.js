import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "../routes/usersRoute.js";
import { recipesRouter } from "../routes/recipesRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://kj123:kj123@cluster0.mqwqpua.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log(`server started on port `));

import express from "express";
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import articlesRoutes from "./routes/articles";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const port = process.env.PORT || 8080;

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to DB!");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(cors());

    // Define your routes
    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/articles", articlesRoutes);

    // Default route
    app.get("/", (req, res) => {
      res.json("Hello");
    });

    app.listen(port, () => {
      console.log(`Now listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });

export default app;

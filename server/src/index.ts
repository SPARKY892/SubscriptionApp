import express from "express";
import authRoutes from "./routes/auth";
import subsRoutes from "./routes/subs";
import articlesRoutes from "./routes/articles";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser = require("body-parser");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to DB!");

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
      res.json("Hello");
    });

    app.use("/", (req, res) => {
      res.send("Server is running.");
    });

    app.listen(8080, () => {
      console.log("Now listening to port 8080");
    });

    app.use(express.json());
    app.use(
      cors({
        origin: ["https://subscription-app-eight.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true,
      })
    );
    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/articles", articlesRoutes);
  })
  .catch((error) => {
    console.log({ error });
    throw new Error(error);
  });

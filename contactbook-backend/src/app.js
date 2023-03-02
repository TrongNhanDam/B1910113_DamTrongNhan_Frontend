import express, { Router } from "express";

import cors from "cors";

import initContactRouter from "./app/router/contact.router";
import apiError from "./app/api-error";

import bodyParser from "body-parser";

const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Khoi tao contact Router
initContactRouter(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcomte to project's nhan" });
});

app.use((req, res, next) => {
  return next(new apiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});
export default app;

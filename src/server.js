// Modules
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import https from "https";

import { corsMiddleware, sessionMiddleware } from "./middlewares";
import indexRouter from "./routers/indexRouter";
import authRouter from "./routers/authRouter";

const key = fs.readFileSync(process.cwd() + "/server.key");
const cert = fs.readFileSync(process.cwd() + "/server.crt");

const app = express();
const server = https.createServer({ key, cert }, app);

// Settings
app.set("trust proxy", 1);

// Middlewares
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(corsMiddleware);
app.use(sessionMiddleware);

// Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

export default server;

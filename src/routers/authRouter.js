import express from "express";
import { publicOnlyMiddleware } from "../middlewares";
import {
  checkLoggedIn,
  finishSlackLogin,
  postSurvey,
  startSlackLogin,
} from "../controllers/authController";

const authRouter = express.Router();

authRouter.get("/", checkLoggedIn);
authRouter.post("/survey", postSurvey);
authRouter.get("/slack/start", publicOnlyMiddleware, startSlackLogin);
authRouter.get("/slack/finish", publicOnlyMiddleware, finishSlackLogin);

export default authRouter;

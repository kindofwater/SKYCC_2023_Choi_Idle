import express from "express";
import { postTeam } from "../controllers/indexController";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  return res.json(req.session.id);
});
indexRouter.post("/team", postTeam);

export default indexRouter;

import express from "express";

import { createUserTrophies, getSinglePlayerLeaderBoard, getMultiPlayerLeaderBoard } from "../controllers/usertrophies.js";

const router = express.Router();

router.get('/single', getSinglePlayerLeaderBoard);
router.get('/multi', getMultiPlayerLeaderBoard);
router.post('/create', createUserTrophies)

export default router;
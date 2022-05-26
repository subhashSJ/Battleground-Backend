import express from "express";
import { hasBattleStarted } from "../controllers/multiplayergames.js";
import { startBattle } from "../controllers/multiplayergames.js";
import { deleteConnectionPool } from "../controllers/multiplayergames.js";
import { getBattleData, submitBattle } from "../controllers/multiplayergames.js";



const router = express.Router();
router.get('/check', hasBattleStarted);
router.get('/start', startBattle);
router.get('/delete', deleteConnectionPool);
router.get('/data', getBattleData);
router.get('/submit', submitBattle)

export default router;
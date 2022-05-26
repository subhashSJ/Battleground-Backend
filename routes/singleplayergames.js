import express from "express";
import { getBestScore, getBestCode, getUserBattles, createGame, updateGame } from "../controllers/singleplayergames.js";

const router = express.Router();
router.get('/userBattles', getUserBattles)
router.get('/bestCode', getBestCode)
router.get('/bestScore', getBestScore)
router.post('/create', createGame)
router.post('/update', updateGame)


export default router;
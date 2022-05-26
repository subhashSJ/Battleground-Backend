import express from "express";
import { generateCode, hasBattleStarted, getBattleData, findGame, startBattle, getWinner, deleteBattle } from "../controllers/friend.js";

const router = express.Router();
router.get('/generate', generateCode);
router.get('/check', hasBattleStarted);
router.get('/battleData', getBattleData);
router.get('/find', findGame);
router.get('/start', startBattle)
router.get('/winner', getWinner)
router.get('/delete', deleteBattle)

export default router;